from config import app, db
from flask import jsonify, request
from models.application_m import Application
from models.job_m import Job
from models.user_m import User
from models.companies_m import Companies
from werkzeug.utils import secure_filename
import os
from sqlalchemy import and_


# Define allowed extensions
ALLOWED_EXTENSIONS = {'pdf', 'docx', 'doc'}

# check if file meets the extension requirements


def allowed_file(filename):
    return '.' in filename and \
        filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# CREATE JOB APPLICATION


@app.route('/jobs/apply', methods=['POST'])
def create_jobApplication():
    user_id = request.form['user_id']
    job_id = request.form['job_id']
    application_cover_letter = request.form['cover_letter']
    file = request.files['file']
    print(file.filename)

    # CHECK IF FIELDS NOT EMPTY
    if not application_cover_letter or not file:
        return jsonify({"message": "Fields cannot be empty"}), 404
    # Extract filename and check if its allowed
    else:

        # print(file)
        if not allowed_file(file.filename):
            return jsonify({"Message": "File is not allowed, can only be pdf, docx or doc"}), 403
        else:
            filename = secure_filename(file.filename)
            if not os.path.exists('file_upload'):
                os.makedirs('file_upload')
            file.save(os.path.join('file_upload', filename))
            resume_url = os.path.join("/api/file_upload", filename)
            if resume_url:
                # alreadyApplied = Application.query.filter(
                #     and_(user_id == user_id, job_id == job_id))
                # if alreadyApplied is not None:
                #     return jsonify({
                #         "message": "You already applied to this job"
                #     }), 409
                newJobApplication = Application(user_id=user_id, job_id=job_id,
                                                application_cover_letter=application_cover_letter, application_status="pending", application_resume_url=resume_url)
                try:
                    db.session.add(newJobApplication)
                    db.session.commit()
                    return jsonify({"message": "Your application has been submitted successfully, You will be hearing from us soon"}), 200
                except:
                    db.session.rollback()
                    return {"message": "An error occurred while creating the job application"}, 500

# GET ALL APPLICATIONS


@app.route('/jobs/applications', methods=['GET'])
def applications():
    applications = Application.query.all()
    if not applications:
        return jsonify({"message": "You have applied no jobs"})
    return jsonify([application.to_dict() for application in applications])


# GET USER JOB APPLICATIONS
@app.route('/user/jobs/<int:id>', methods=['GET'])
def user_applications(id):
    applications = Application.query.filter(
        Application.user_id == id).join(Job).all()
    if not applications:
        return jsonify({"message": "You have applied no jobs"}), 404
    else:
        application_list = []
        for application in applications:
            job = Job.query.filter(application.job_id == Job.job_id).first()
            if (job):
                company = Companies.query.filter(
                    job.company_id == Companies.company_id).first()
            apps = {
                "application": application.to_dict(),
                "job": job.to_dict(),
                "company": company.to_dict(),
            }
            application_list.append(apps)
    return jsonify(application_list), 200

# FETCH  APPLICATIONS RELATED TO A COMPANY


@app.route("/company/applications/<int:id>", methods=["GET"])
def company_applications(id):
    applications = Application.query.all()
    company_apps = []
    for application in applications:
        if (application):
            job = Job.query.filter(
                Job.job_id == application.job_id).first()
            if job is None:
                return jsonify({"message": "No job found for application"})
            elif job.company_id == id:
                user = User.query.filter(
                    User.user_id == application.user_id).first()
                my_job = {
                    "user": user.to_dict(),
                    "application": application.to_dict(),
                    "job": job.to_dict()
                }
                company_apps.append(my_job)

    return jsonify(company_apps)


# SINGLE APPLICATION BY APPLICATION ID
@app.route('/applications/<int:id>', methods=['GET'])
def get_application(id):
    application = Application.query.filter(
        Application.application_id == id).first()
    print({"application": application.to_dict()})
    if (application):
        user = User.query.filter(
            User.user_id == application.user_id).first()
        print({"user": user.to_dict()})
        job = Job.query.filter(Job.job_id == application.job_id).first()
        print({"job": job.to_dict()})
        return jsonify({"application": application.to_dict(), "job": job.to_dict(), "user": user.to_dict()})
