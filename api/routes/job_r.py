from config import app, db
from flask import jsonify
from models.job_m import Job
import requests
import json


# @app.route('/jobs', methods=['GET'])
# def get_jobs():
#     jobs = Job.query.all()
#     # return jsonify({'user': users})
#     return jsonify([job.to_dict() for job in jobs])

# FETCH NEW JOBS

@app.route("/jobs")
def fetch_jobs():
    url = "https://api.indeed.com/ads/apisearch?"

    querystring = {
        "v": 2, "publisher": "123412341234123&q=java+developer&l=austin%2C+tx&sort=&radius=&st=&jt=&start=&limit=&fromage=&filter=&latlong=1&co=us&chnl=&userip=1.2.3.4&useragent=Mozilla/%2F4.0%28Firefox%29&v=2", "format": "json"}
    # headers = {
    #     "X-RapidAPI-Key": "81642307femsh9bd16e2b99fa3bep1714cbjsn0f83ab3a0b8d",
    #     "X-RapidAPI-Host": "jsearch.p.rapidapi.com"
    # }
    data = requests.request("GET", url, params=querystring)
    return data.json()
    # UPDATE JOBS
    # SINGLE JOB
    # ALL JOBS
    # FILTER BY JOB TITLE
    # FILTER BY CITY
    # FILTER BY COUNTRY
    # SALARY RANGE
    # JOB  TYPE
