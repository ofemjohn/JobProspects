from config import db
from datetime import datetime


class User(db.Model):
    user_id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(), nullable=False)
    last_name = db.Column(db.String(), nullable=False)
    email = db.Column(db.String(), nullable=False, unique=True)
    phone = db.Column(db.String(), nullable=False)
    gender = db.Column(db.String(), nullable=False)
    country = db.Column(db.String(), nullable=False)
    state = db.Column(db.String())
    address = db.Column(db.String(), nullable=False)
    password = db.Column(db.String(), nullable=False)
    date_created = db.Column(db.DateTime(), default=datetime.utcnow)
    last_login = db.Column(db.DateTime, default=datetime.utcnow)

    # RETURN A DICTONARY
    def to_dict(self):
        return {'user_id': self.user_id, 'first_name': self.first_name, 'last_name': self.last_name, 'email': self.email, 'phone': self.phone, 'gender': self.gender, 'country': self.country, 'state': self.state, 'address': self.address, 'date_created': self.date_created, 'last_login': self.last_login}
