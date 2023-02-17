from config import db, app
from flask import request, jsonify
from models import Job
from sqlalchemy import or_



'''job search routes'''


@app.route('/jobs/search', methods=['GET'])
def job_search():
    '''
    searches the jobs with the inputed parameters 
    below and displays only jobs with active status
    '''
    location = request.args.get('location')
    job_type = request.args.get('type')
    job_title = request.args.get('title')
    job_salary = request.args.get('salary')

    '''query the job database for all active jobs'''
    query = Job.query.filter(Job.job_status == 'Active')

    '''
    check if location, job_type, job_title and job_salary
    are in the database based on the inputed args by the user
    using the "ilike()" function and a wildcat "%%" to search for 
    the desired inputes
    '''
    if location:
        query = query.filter(or_(Job.job_city.ilike(
            f'%{location}%'), Job.job_country.ilike(f'%{location}%')))
    if job_type:
        query = query.filter(Job.employment_type.ilike(f'%{job_type}%'))
    if job_title:
        query = query.filter(Job.job_title.ilike(f'%{job_title}%'))
    if job_salary:
        query = query.filter(Job.job_salary >= job_salary)

    jobs = query.all()

    return jsonify([job.to_dict() for job in jobs])
