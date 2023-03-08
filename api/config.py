from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from datetime import timedelta
import os


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:root@localhost/job_prospects'
# os.environ.get('DATABASE_URL')
# 'mysql://root:root@localhost/job_prospects'
# mysql+pymysql://root:56465646@localhost/job_prospects
app.config['SQLALCHEMY_DATABASE_TRACK_MODIFICATIONS'] = False
app.config['FLASK_DEBUG'] = True
app.config["JWT_SECRET_KEY"] = "jobprospects"
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=1)
app.config["JWT_COOKIE_SECURE"] = False
app.config["JWT_TOKEN_LOCATION"] = ["headers"]
app.config['CLOUDINARY_URL'] = 'cloudinary://273368127559497:Ypg4Y3dB94Edyc2DYXKYjqnlNAw@brayohmurithi'

db = SQLAlchemy(app)
