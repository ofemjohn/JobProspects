from config import app, db
from flask import jsonify, request
from models.job_m import Job, Companies
from datetime import datetime
import logging
from sqlalchemy import or_, and_


@app.route('/api/jobs', methods=['GET'])
def get_jobs():
    jobs = Job.query.join(Companies).all()
   # return jsonify({'user': users})
    # return jsonify([job.to_dict() for job in jobs]), 200
    return jsonify([{
        "job_id": job.job_id,
        "job_title": job.job_title,
        "company_id": job.companies.company_id,
        "company_name": job.companies.company_name,
        "company_email": job.companies.company_email,
        "company_website": job.companies.company_website,
        "employment_type": job.employment_type,
        "job_description": job.job_description,
        "job_apply_link": job.job_apply_link,
        "job_is_remote": job.job_is_remote,
        "company_id": job.company_id,
        "job_salary": job.job_salary,
        "job_salary_period": job.job_salary_period,
        "job_benefits": job.job_benefits,
        "job_required_experience": job.job_required_experience,
        "job_required_education": job.job_required_education,
        "job_required_skills": job.job_required_skills,
        "job_salary_currency": job.job_salary_currency,
        "job_city": job.job_city,
        "job_country": job.job_country,
        "job_status": job.job_status,
        "apply_by": job.apply_by,
        "external_apply_links": job.external_apply_links,
        "job_posted_date": job.job_posted_date,
    } for job in jobs])


# POST NEW JOBS
@app.route('/api/jobs/post', methods=['POST'])
def create_job():
    job_data = request.json
    job_title = job_data.get('job_title')
    employment_type = job_data.get('employment_type')
    job_description = job_data.get('job_description')
    job_apply_link = job_data.get('job_apply_link')
    job_is_remote = True
    # job_data.get('job_is_remote')
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
    # job_status = job_data.get('job_status')
    apply_by = job_data.get('apply_by')
    external_apply_links = job_data.get('external_apply_links')

    job = Job(job_title=job_title,
              employment_type=employment_type,
              job_description=job_description,
              job_apply_link=job_apply_link,
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
              #   job_status=job_status,
              apply_by=apply_by,
              external_apply_links=external_apply_links,
              )

    db.session.add(job)
    db.session.commit()

    return jsonify({"message": "Job post added succesfully"}), 200


# FILTER JOBS BY TITL, CITY, COUNTRY, SALARY, ALL JOBS

@app.route('/api/jobs/search', methods=['GET'])
def job_search():

    # searches the jobs with the inputed parameters
    # below and displays only jobs with active status

    location = request.args.get('location')
    job_type = request.args.get('type')
    job_title = request.args.get('title')
    # job_salary = request.args.get('salary')
    min_salary = request.args.get('min_salary')
    max_salary = request.args.get('max_salary')

    # if not location:
    #     return jsonify({"message": "No location"})

    # query the job database for all active jobs
    query = Job.query.filter(
        Job.job_status == 'active')

    # check if location, job_type, job_title and job_salary
    # are in the database based on the inputed args by the user
    # using the "ilike()" function and a wildcat "%%" to search for
    # the desired inputes

    if location:
        query = query.filter(or_(Job.job_city.ilike(
            f'%{location}%'), Job.job_country.ilike(f'%{location}%')))
    if job_type:
        query = query.filter(Job.employment_type.ilike(f'%{job_type}%'))
    if job_title:
        query = query.filter(Job.job_title.ilike(f'%{job_title}%'))
    # if max_salary and not min_salary:
    #     query = query.filter(Job.job_salary >= max_salary)
    # elif min_salary and not max_salary:
    #     query = query.filter(Job.job_salary <= min_salary)
    # elif min_salary and max_salary:
    #     query = query.filter(
    #         and_(Job.job_salary >= min_salary, Job.job_salary <= max_salary))
    jobs = query.all()
    if not jobs:
        return jsonify({"message": "Job not found"})

    return jsonify([job.to_dict() for job in jobs])

# GET JOBS BY COMPANY ID


@app.route('/api/jobs/company/<int:id>')
def company_jobs(id):
    jobs = Job.query.filter(Job.company_id == id).all()
    if not jobs:
        return jsonify({"message": "You Company has no jobs currently"})
    return jsonify([job.to_dict() for job in jobs])
#     # UPDATE JOBS
#     # SINGLE JOB BY ID


@app.route('/api/jobs/<int:id>')
def single_job_by_id(id):
    # Job.query.join(Companies).all()
    job = Job.query.filter(Job.job_id == id).join(Companies).first()
    if job:
        company = Companies.query.filter_by(company_id=job.company_id).first()
        return jsonify({
            'job_id': job.job_id,
            'job_title': job.job_title,
            'employment_type': job.employment_type,
            'job_description': job.job_description,
            'job_is_remote': job.job_is_remote,
            'job_apply_link': job.job_apply_link,
            'company_id': company.company_id,
            'company_name': company.company_name,
            'company_logo_url': company.company_logo_url,
            'job_salary': job.job_salary,
            'job_salary_currency': job.job_salary_currency,
            'job_salary_period': job.job_salary_period,
            'job_city': job.job_city,
            'job_country': job.job_country,
            'job_status': job.job_status,
            'apply_by': job.apply_by.isoformat() if job.apply_by else None,
            'external_apply_links': job.external_apply_links,
            'job_posted_date': job.job_posted_date.isoformat(),
            'job_required_experience': job.job_required_experience,
            'job_required_education': job.job_required_education,
            'job_required_skills': job.job_required_skills,
            'job_benefits': job.job_benefits
        })
    else:
        return jsonify({"message": "Job Not Found"}), 404
#     # ALL JOBS
#     # FILTER BY JOB TITLE
#     # FILTER BY CITY
#     # FILTER BY COUNTRY
#     # SALARY RANG
#     # JOB  TYPE
