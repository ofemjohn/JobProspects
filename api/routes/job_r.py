# from config import app, db
# from flask import jsonify
# from models.job_m import Job
# import requests
# from datetime import datetime
# import json
# import logging


# @app.route('/jobs_table', methods=['GET'])
# def get_jobs():
#     jobs = Job.query.all()
#    # return jsonify({'user': users})
#     return jsonify([job.to_dict() for job in jobs])
#    # return 'Jobs route'


# # FETCH NEW JOBS
# logging.basicConfig(level=logging.DEBUG)


# @app.route("/jobs", methods=['POST'])
# def fetch_jobs():
#     queries = ['react', 'python']
#     api_url = 'https://jsearch.p.rapidapi.com/search'

#     headers = {
#         'X-RapidAPI-Key': '38cb56ea24msh169644f57fd741ep14e3e8jsnbf5eb11b063e',
#         'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
#     }

#     jobs = []
#     for query in queries:
#         params = {"query": query, "num_pages": "1"}
#         # try:
#         response = requests.get(api_url, headers=headers, params=params)
#         data = response.json()
#         jobs.append(data['data'])
#         # res = jsonify({'dat': jobs})
#         # return data

#         for outer_list in jobs:
#             for job_data in outer_list:
#                 job = Job(
#                     job_title=job_data['job_title'],
#                     employment_type=job_data['job_employment_type'],
#                     job_description=job_data['job_description'],
#                     job_apply_link=job_data['job_apply_link'],
#                     employer_website=job_data['employer_website'],
#                     employer_name=job_data['employer_name'],
#                     employer_logo=job_data['employer_logo'],
#                     job_is_remote=job_data['job_is_remote'],
#                     job_posted_at_timestamp=job_data['job_posted_at_timestamp'],
#                     job_posted_at_datetime_utc=datetime.fromtimestamp(
#                         job_data['job_posted_at_timestamp']).strftime('%Y-%m-%d %H:%M:%S'),
#                     job_city=job_data['job_city'],
#                     job_state=job_data['job_state'],
#                     job_country=job_data['job_country'],
#                     job_benefits=job_data['job_benefits'],
#                     job_google_link=job_data['job_google_link'],
#                     job_offer_expiration_datetime_utc=job_data['job_offer_expiration_datetime_utc'],
#                     job_required_experience=job_data['job_required_experience'],
#                     job_required_education=job_data['job_required_education'],
#                     job_required_skills=job_data['job_required_skills'],
#                     job_highlights=job_data['job_highlights']
#                 )
#             db.session.add(job)
#     db.session.commit()
#     return jsonify({"message": "Job added successfully"}), 201
#     # except Exception as e:
#     # db.session.rollback()
#     # logging.error(e)
#     # return jsonify({"message": "Error adding job"})

#     #
#     # UPDATE JOBS
#     # SINGLE JOB
#     # ALL JOBS
#     # FILTER BY JOB TITLE
#     # FILTER BY CITY
#     # FILTER BY COUNTRY
#     # SALARY RANG
#     # JOB  TYPE
