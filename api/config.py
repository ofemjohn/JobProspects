from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from datetime import timedelta
from dotenv import load_dotenv
import os


load_dotenv()


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')
app.config['SQLALCHEMY_DATABASE_TRACK_MODIFICATIONS'] = False
app.config['FLASK_DEBUG'] = True
app.config["JWT_SECRET_KEY"] = os.environ.get('SECRET_KEY')
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=1)
app.config["JWT_COOKIE_SECURE"] = False
app.config["JWT_TOKEN_LOCATION"] = ["headers"]
app.config['CLOUDINARY_URL'] = os.environ.get('CLOUDINARY_URL')
db = SQLAlchemy(app)
