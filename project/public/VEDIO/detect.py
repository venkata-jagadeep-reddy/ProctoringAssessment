from flask import Flask, jsonify
import cv2
import numpy as np
from flask_cors import CORS
from mtcnn import MTCNN
import time
from tensorflow.keras.preprocessing.image import img_to_array
from tensorflow.keras.applications.imagenet_utils import preprocess_input
import threading

app = Flask(__name__)
CORS(app)

class OnlineAssessmentProctor:
    def __init__(self, authorized_face_encodings):
        self.known_face_encodings = authorized_face_encodings
        self.anomaly_count = 0
        self.start_time = time.time()
        self.face_detector = MTCNN()

    def detect_faces(self, frame):
        faces = self.face_detector.detect_faces(frame)
        face_locations = []
        for face in faces:
            x, y, width, height = face['box']
            x = max(0, x)
            y = max(0, y)
            face_locations.append((y, x + width, y + height, x))
        return face_locations

    def recognize_face(self, frame, face_locations):
        face_encodings = []
        for (top, right, bottom, left) in face_locations:
            face_roi = frame[top:bottom, left:right]
            if face_roi.size == 0:
                continue
            face_roi = cv2.resize(face_roi, (160, 160))
            face_roi = img_to_array(face_roi)
            face_roi = preprocess_input(face_roi)
            face_roi = np.expand_dims(face_roi, axis=0)
            face_encoding = np.mean(face_roi, axis=(0, 1, 2))  # Simulated face encoding
            face_encodings.append(face_encoding)
        return face_encodings

    def compute_risk_score(self, unauthorized_faces, head_movement):
        risk_score = (unauthorized_faces * 5) + (head_movement * 2)
        return min(risk_score, 100)

    def detect_malpractice(self, frame):
        face_locations = self.detect_faces(frame)
        face_encodings = self.recognize_face(frame, face_locations)
        authorized_present = any(self._compare_faces(enc) for enc in face_encodings)
        unauthorized_faces = len(face_encodings) - int(authorized_present)
        head_movement = len(face_locations) > 1

        if unauthorized_faces or head_movement:
            self.anomaly_count += 1

        risk_score = self.compute_risk_score(unauthorized_faces, head_movement)
        return risk_score, unauthorized_faces, head_movement

    def _compare_faces(self, face_encoding):
        for known_encoding in self.known_face_encodings:
            distance = np.linalg.norm(known_encoding - face_encoding)
            if distance < 0.6:
                return True
        return False

# Dummy authorized encodings
authorized_face_encodings = [np.random.rand(3) for _ in range(5)]
proctor = OnlineAssessmentProctor(authorized_face_encodings)

def webcam_loop():
    cap = cv2.VideoCapture(0)

    while True:
        ret, frame = cap.read()
        if not ret:
            continue

        risk_score, unauthorized_faces, head_movement = proctor.detect_malpractice(frame)
        
        # Display risk score on frame
        cv2.putText(frame, f"Risk Score: {risk_score}", (10, 30),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 0, 255), 2)

        cv2.imshow("Proctoring Live", frame)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()

@app.route('/start-proctoring', methods=['GET'])
def start_proctoring():
    threading.Thread(target=webcam_loop).start()
    return jsonify({"message": "Proctoring session started. Check webcam window."})

if __name__ == '__main__':
    app.run(debug=True)
