from config import app
from routes import user_r, job_r, application_r


@app.route('/')
def index():
    return 'test'


if __name__ == '__main__':
    app.run(debug=True)
