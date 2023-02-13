from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from datetime import timedelta


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:56465646@localhost/job_prospects'
app.config['SQLALCHEMY_DATABASE_TRACK_MODIFICATIONS'] = False
app.config["JWT_SECRET_KEY"] = "jobprospects"
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=1)
app.config["JWT_COOKIE_SECURE"] = False
app.config["JWT_TOKEN_LOCATION"] = ["cookies"]

db = SQLAlchemy(app)