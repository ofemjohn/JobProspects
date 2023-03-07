from config import app, db
from flask import jsonify, request
from models.application_m import Application
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
                alreadyApplied = Application.query.filter(
                    and_(user_id == user_id, job_id == job_id))
                if alreadyApplied is not None:
                    return jsonify({
                        "message": "You already applied to this job"
                    }), 409
                newJobApplication = Application(user_id=user_id, job_id=job_id,
                                                application_cover_letter=application_cover_letter, application_status="pending", application_resume_url=resume_url)
                try:
                    db.session.add(newJobApplication)
                    db.session.commit()
                    return jsonify({"message": "Your application has been submitted successfully, You will be hearing from us soon"}), 200
                except:
                    db.session.rollback()
                    return {"message": "An error occurred while creating the job application"}, 500
