from config import app, db
from routes import user_r, job_r, application_r, auth

with app.app_context():
    db.create_all()


@app.route('/')
def index():
    return 'test'


if __name__ == '__main__':
    app.run(debug=True, port=5003)
