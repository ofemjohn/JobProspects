from config import app, db
from flask_cors import CORS
from dotenv import load_dotenv
from routes import user_r, job_r, job_application_r, auth

load_dotenv()

with app.app_context():
    db.create_all()

CORS(app, resources={r"/*": {"origins": "*"}})


@app.route('/')
def index():
    return 'test'


if __name__ == '__main__':
    app.run(debug=True)
