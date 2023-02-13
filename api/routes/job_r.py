from config import app, db
from flask import jsonify
from models.job_m import Job


@app.route('/jobs', methods=['GET'])
def get_jobs():
    jobs = Job.query.all()
    # return jsonify({'user': users})
    return jsonify([job.to_dict() for job in jobs])
