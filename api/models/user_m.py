from config import db, app
from datetime import datetime


class User(db.Model):
    user_id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(50), nullable=False, unique=True)
    phone = db.Column(db.String(15), nullable=False)
    user_type = db.Column(db.String(255), nullable=False, default="job_seeker")
    gender = db.Column(db.String(10), nullable=False)
    country = db.Column(db.String(50), nullable=False)
    state = db.Column(db.String(50))
    address = db.Column(db.String(50), nullable=False)
    password = db.Column(db.String(512), nullable=False)
    date_created = db.Column(db.DateTime(), default=datetime.utcnow)
    last_login = db.Column(db.DateTime, default=datetime.utcnow)

    # Relationships
    education = db.relationship('Education', backref='user', lazy=True)
    profile = db.relationship('Profile', backref='user', lazy=True)
    employment_history = db.relationship(
        'EmploymentHistory', backref='user', lazy=True)

    # RETURN A DICTONARY
    def to_dict(self):
        return {'user_id': self.user_id, 'first_name': self.first_name, 'last_name': self.last_name, 'email': self.email, 'phone': self.phone, 'gender': self.gender, 'country': self.country, 'state': self.state, 'address': self.address, 'date_created': self.date_created, 'last_login': self.last_login}



# PROFILE MODEL
class Education(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    award = db.Column(db.String(255), nullable=False)
    level = db.Column(db.String(255), nullable=False)
    grade = db.Column(db.String(255), nullable=False)
    school = db.Column(db.String(255), nullable=False)
    course = db.Column(db.String(255))
    yearFrom = db.Column(db.DateTime(), nullable=False)
    YearCompleted = db.Column(db.DateTime())
    user_id = db.Column(db.Integer, db.ForeignKey(
        'user.user_id'), nullable=False)

    # RETURN A DICTIONARY
    def to_dict(self):
        return {'id': self.id, 'award': self.award, 'grade': self.grade, 'level': self.level, 'school': self.school, 'course': self.course, 'yearFrom': self.yearFrom, 'yearCompleted': self.YearCompleted, 'user_id': self.user_id}


class Profile(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    headline = db.Column(db.String(255), nullable=False)
    summary = db.Column(db.Text())
    website = db.Column(db.String(255))
    linkedinUrl = db.Column(db.String(255))
    githubUrl = db.Column(db.String(255))
    user_id = db.Column(db.Integer, db.ForeignKey(
        'user.user_id'), nullable=False)

    # RETURN A DICTIONARY
    def to_dict(self):
        return {'id': self.id, "linkedinUrl": self.linkedinUrl, "githubUrl": self.githubUrl, 'headline': self.headline, 'summary': self.summary, 'website': self.website, 'user_id': self.user_id}


class EmploymentHistory(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    position = db.Column(db.String(255), nullable=False)
    name = db.Column(db.String(255), nullable=False)
    startDate = db.Column(db.DateTime(), nullable=False)
    endDate = db.Column(db.DateTime())
    roles = db.Column(db.Text())
    user_id = db.Column(db.Integer, db.ForeignKey(
        'user.user_id'), nullable=False)

    # RETURN A DICTIONARY
    def to_dict(self):
        return {'id': self.id, 'position': self.position, 'name': self.name, 'startDate': self.startDate, 'endDate': self.endDate, 'roles': self.roles, 'user_id': self.user_id}

