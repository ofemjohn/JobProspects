from config import app, db
from flask import jsonify, request
import requests
from models import User, Job
from models import Application

'''job application route'''

app.route('/applictions/application_id/status', methods=['POST'])
def job_application(application_id):
    '''applies for a job with the inputed parameters below'''
    job_app = request.form
    user_id = job_app.get('user_id')
    application_cover_letter = job_app.get('application_cover_letter')
    application_resume_url = job_app.get('application_resume_url')
    application_status = 'Pending'

    # check if the job exists
    job = Job.query.get(Job.job_id)
    if not job:
        return jsonify({'message': 'Job not found'}), 404

    # check if the user exists
    user = User.query.get(User.user_id)
    if not user:
        return jsonify({'message': 'User not found'}), 404

    # create a new job application
    application = Application(user_id=User.user_id, job_id=Job.job_id, application_cover_letter=application_cover_letter,
                              application_resume_url=application_resume_url, application_status=application_status)

    # add the job application to the database
    db.session.add(application)
    db.session.commit()

    return jsonify({'message': 'Job application submitted successfully'})