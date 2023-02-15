from config import db, app


class Job(db.Model):
    job_id = db.Column(db.Integer, primary_key=True)
    job_title = db.Column(db.String(100), nullable=False)
    employment_type = db.Column(db.String(50))
    job_description = db.Column(db.Text, nullable=False)
    job_apply_link = db.Column(db.String(255), nullable=False)
    employer_website = db.Column(db.String(100))
    employer_name = db.Column(db.String(50), nullable=False)
    employer_logo = db.Column(db.String(255))
    job_is_remote = db.Column(db.Boolean, nullable=False)
    job_posted_at_timestamp = db.Column(db.String(50))
    job_posted_at_datetime_utc = db.Column(db.String(100))
    job_city = db.Column(db.String(100))
    job_state = db.Column(db.String(100))
    job_country = db.Column(db.String(100))
    job_benefits = db.Column(db.Text)
    job_google_link = db.Column(db.String(512))
    job_offer_expiration_datetime_utc = db.Column(db.String(100))
    job_required_experience = db.Column(db.PickleType)
    job_required_education = db.Column(db.PickleType)
    job_required_skills = db.Column(db.PickleType)
    job_highlights = db.Column(db.PickleType)
    # job_salary = db.Column(db.String(10))
    # job_salary_period = db.Column(db.String(10))
    # job_salary_currency = db.Column(db.String(10))

    # TO STORE THE PICKLETYPE
    # data = {'key1': [1,3,4,6], 'key2': ['a', 'b', 'c]}
    #job_highlights = data

    def to_dict(self):
        return {
            "job_id": self.job_id,
            "job_title": self.job_title,
            "employment_type": self.employment_type,
            "job_description": self.job_description,
            "job_apply_link": self.job_apply_link,
            "employer_website": self.employer_website,
            "employer_name": self.employer_name,
            "employer_logo": self.employer_logo,
            "job_is_remote": self.job_is_remote,
            "job_posted_at_timestamp": self.job_posted_at_timestamp,
            "job_posted_at_datetime_utc": self.job_posted_at_datetime_utc,
            "job_city": self.job_city,
            "job_state": self.job_state,
            "job_country": self.job_country,
            "job_benefits": self.job_benefits,
            "job_google_link": self.job_google_link,
            "job_offer_expiration_datetime_utc": self.job_offer_expiration_datetime_utc,
            "job_required_experience": self.job_required_experience,
            "job_required_education": self.job_required_education,
            "job_highlights": self.job_highlights,
            "job_required_skills": self.job_required_skills,
            # "job_salary": self.job_salary,
            # "job_salary_period": self.job_salary_period,
            # "job_salary_currency": self.job_salary_currency,
        }


with app.app_context():
    db.create_all()
