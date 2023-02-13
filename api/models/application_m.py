from config import db, app
from models.user_m import User
from models.job_m import Job
from datetime import datetime


class Application(db.Model):
    app_id = db.Column(db.Integer, primary_key=True, nullable=False)
    # FOREIGN KEY AND TABLE RELATIONSHIPS
    user_id = db.Column(db.Integer, db.ForeignKey(
        'user.user_id'), nullable=False)
    job_id = db.Column(db.Integer, db.ForeignKey('job.job_id'), nullable=False)
    app_date = db.Column(db.DateTime(), default=datetime.utcnow)
    app_status = db.Column(db.String(50))

    user = db.relationship("User", back_populates="application")
    job = db.relationship("Job", back_populates="application")

    User.application = db.relationship(
        "Application", back_populates="user")
    Job.application = db.relationship(
        "Application", back_populates="job")


with app.app_context():
    db.create_all()
