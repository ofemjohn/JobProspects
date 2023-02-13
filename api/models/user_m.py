from config import db, app
from datetime import datetime


class User(db.Model):
    user_id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(50), nullable=False, unique=True)
    phone = db.Column(db.String(15), nullable=False)
    gender = db.Column(db.String(10), nullable=False)
    country = db.Column(db.String(50), nullable=False)
    state = db.Column(db.String(50))
    address = db.Column(db.String(50), nullable=False)
    password = db.Column(db.String(512), nullable=False)
    date_created = db.Column(db.DateTime(), default=datetime.utcnow)
    last_login = db.Column(db.DateTime, default=datetime.utcnow)

    # RETURN A DICTONARY
    def to_dict(self):
        return {'user_id': self.user_id, 'first_name': self.first_name, 'last_name': self.last_name, 'email': self.email, 'phone': self.phone, 'gender': self.gender, 'country': self.country, 'state': self.state, 'address': self.address, 'date_created': self.date_created, 'last_login': self.last_login}


with app.app_context():
    db.create_all()
