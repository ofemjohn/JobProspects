from config import app


@app.route('/')
def index():
    return 'test'


if __name__ == '__main__':
    app.run()
