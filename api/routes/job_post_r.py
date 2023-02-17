from models import Job
from config import db, app
from flask import jsonify, request
import requests
from datetime import datetime


''' job posting routes '''
@app.route('/job', methods=['POST'])
def create_job():
    job_data = request.form
    job_title = job_data.get('job_title')
    employmet_type =job_data.get('emplyment_type')
    job_description = job_data.get('job_description')
    job_apply_link = job_data.get('job_apply_link')
    job_is_remote = job_data.get('job_is_remote')
    company_id = job_data.get('company_id')
    job_salary = job_data.get('job_salary')
    job_salary_period = job_data.get('job_salary_period')
    job_benefits = job_data.get('job_benefits')
    job_required_experience = job_data.get('job_required_experience')
    job_required_education = job_data.get('job_required_education')
    job_required_skills = job_data.get('job_required_skills')
    job_salary_currency = job_data.get('job_salary_currency')
    job_city = job_data.get('job_city')
    job_country = job_data.get('job_country')
    job_status = job_data.get('job_status')
    apply_by = job_data.get('apply_by')
    external_apply_links = job_data.get('external_apply_links')
    job_posted_date = job_data.get('job_posted_date')


    job = Job(job_title=job_title,
    employmet_type=employmet_type,
    job_description=job_description,
    job_apply_link= job_apply_link,
    job_is_remote=job_is_remote,
    company_id=company_id,
    job_salary=job_salary,
    job_salary_period=job_salary_period,
    job_benefits=job_benefits,
    job_required_experience=job_required_experience,
    job_required_education=job_required_education,
    job_required_skills=job_required_skills,
    job_salary_currency=job_salary_currency,
    job_city=job_city,
    job_country=job_country,
    job_status=job_status,
    apply_by=apply_by,
    external_apply_links=external_apply_links,
    job_posted_date=job_posted_date
    )


    db.session.add(job)
    db.session.commit()

    return jsonify({"message": "Job post added succesfully"}), 201