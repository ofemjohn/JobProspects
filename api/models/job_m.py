from config import db, app
from models.companies_m import Companies
from datetime import datetime


class Job(db.Model):

    job_id = db.Column(db.Integer, primary_key=True)
    job_title = db.Column(db.String(100), nullable=False)
    employment_type = db.Column(db.String(50))
    job_description = db.Column(db.Text, nullable=False)
    job_is_remote = db.Column(db.Boolean)
    job_apply_link = db.Column(db.String(255))
    company_id = db.Column(db.Integer, db.ForeignKey(
        'companies.company_id'), nullable=False)
    job_salary = db.Column(db.String(255))
    job_salary_currency = db.Column(db.String(100), nullable=False)
    job_salary_period = db.Column(db.String(100))
    job_city = db.Column(db.String(255))
    job_country = db.Column(db.String(255))
    job_status = db.Column(db.String(255), nullable=False, default="active")
    apply_by = db.Column(db.DateTime())
    external_apply_links = db.Column(db.String(512))
    job_posted_date = db.Column(db.DateTime(), default=datetime.utcnow)
    job_required_experience = db.Column(db.PickleType)
    job_required_education = db.Column(db.PickleType)
    job_required_skills = db.Column(db.PickleType)
    job_benefits = db.Column(db.Text)

    # # TO STORE THE PICKLETYPE
    # # data = {'key1': [1,3,4,6], 'key2': ['a', 'b', 'c]}
    # #job_highlights = data

    def to_dict(self):
        return {
            "job_id": self.job_id,
            "job_title": self.job_title,
            "employment_type": self.employment_type,
            "job_description": self.job_description,
            "job_apply_link": self.job_apply_link,
            "job_is_remote": self.job_is_remote,
            "company_id": self.company_id,
            "job_salary": self.job_salary,
            "job_salary_period": self.job_salary_period,
            "job_benefits": self.job_benefits,
            "job_required_experience": self.job_required_experience,
            "job_required_education": self.job_required_education,
            "job_required_skills": self.job_required_skills,
            "job_salary_currency": self.job_salary_currency,
            "job_city": self.job_city,
            "job_country": self.job_country,
            "job_status": self.job_status,
            "apply_by": self.apply_by,
            "external_apply_links": self.external_apply_links,
            "job_posted_date": self.job_posted_date,

        }
