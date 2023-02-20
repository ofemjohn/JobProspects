from config import db, app
from models.user_m import User
from models.job_m import Job
from datetime import datetime


class Application(db.Model):
    application_id = db.Column(db.Integer, primary_key=True, nullable=False)
    # FOREIGN KEY AND TABLE RELATIONSHIPS
    user_id = db.Column(db.Integer, db.ForeignKey(
        'user.user_id'), nullable=False)
    job_id = db.Column(db.Integer, db.ForeignKey('job.job_id'), nullable=False)
    application_cover_letter = db.Column(db.Text)
    application_resume_url = db.Column(db.String(512), nullable=False)
    application_status = db.Column(db.String(50))
    application_date = db.Column(db.DateTime(), default=datetime.utcnow)

    '''
    backref is used to establish a one-way relationship between two models, 
    back_populates is used to create a two-way relationship where each model 
    has a reference to the other.
    '''

    user = db.relationship("User", back_populates="application")
    job = db.relationship("Job", back_populates="application")

    User.application = db.relationship(
        "Application", back_populates="user")
    Job.application = db.relationship(
        "Application", back_populates="job")

    def to_dict(self):
        return {
            "application_id": self.application_id,
            "job_id": self.job_id,
            "user_id": self.user_id,
            "application_cover_letter": self.application_cover_letter,
            "application_resume_url": self.application_resume_url,
            "application_status": self.application_status,
            "application_date": self.application_date,
        }


with app.app_context():
    db.create_all()
