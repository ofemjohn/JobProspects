from config import db, app
from datetime import datetime


class Companies(db.Model):
    company_id = db.Column(db.Integer, primary_key=True)
    company_name = db.Column(db.String(255), nullable=False)
    company_email = db.Column(db.String(255), nullable=False, unique=True)
    company_country = db.Column(db.String(255), nullable=False)
    company_website = db.Column(db.String(255), nullable=False)
    company_logo_url = db.Column(db.String(512))
    password = db.Column(db.String(512), nullable=False)
    date_created = db.Column(db.DateTime(), default=datetime.utcnow)
    last_login = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            "company_id": self.company_id,
            "company_name": self.company_name,
            "company_email": self.company_email,
            "company_country": self.company_country,
            "company_website": self.company_website,
            "company_logo_url": self.company_logo_url,
            "last_login": self.last_login,
            "date_created": self.date_created
        }
