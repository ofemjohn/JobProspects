from flask import Flask
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:56465646@localhost/job_prospects'
app.config['SQLALCHEMY_DATABASE_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)