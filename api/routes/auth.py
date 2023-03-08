from models.user_m import User
from models.companies_m import Companies
from werkzeug.utils import secure_filename
from flask import request, jsonify
from config import db, app
from flask_bcrypt import Bcrypt
from datetime import datetime
import os
from flask_jwt_extended import JWTManager, create_access_token, set_access_cookies, unset_jwt_cookies
import logging
from flask_cors import cross_origin

bcrypt = Bcrypt()
jwt = JWTManager(app)
logging.basicConfig(level=logging.DEBUG)

# Register new user


@app.route('/auth/register', methods=['POST'])
def register_user():
    user_data = request.json
    first_name = user_data.get('first_name')
    last_name = user_data.get('last_name')
    email = user_data.get('email')
    phone = user_data.get('phone')
    gender = user_data.get('gender')
    country = user_data.get('country')
    state = user_data.get('state')
    address = user_data.get('address')
    password = user_data.get('password')

    if not first_name or not last_name or not email or not phone or not gender or not country or not state or not address or not password:
        return jsonify({"message": "All fields should be filled"}), 400
    # encode the password
    pwd_hash = bcrypt.generate_password_hash(password, 5).decode('utf-8')

    newUser = User(first_name=first_name, last_name=last_name, email=email, phone=phone,
                   gender=gender, country=country, state=state, address=address, password=pwd_hash)
    try:
        db.session.add(newUser)
        db.session.commit()
        return jsonify({"message": "User created successfully"}), 200
    except Exception as e:
        db.session.rollback()
        logging.error(e)
        existing_user = db.session.query(
            User).filter(User.email == email).first()
    if existing_user is not None:
        return jsonify({"message": f'User with email: {email} already exists'}), 409
    else:
        return jsonify({"message": "An error occurred while creating the user"}), 500


# LOGIN ROUTE
@app.route('/auth/login', methods=['POST'])
@cross_origin()
def login():
    login_data = request.json
    email = login_data.get('email')
    password = login_data.get('password')

    # Check if fields not empty
    if not email or not password:
        return jsonify({"message": "Email or Password is required"}), 400
    # CHECK IF USER EXISTS
    user = User.query.filter(User.email == email).first()
    if not user:
        return jsonify({"message": "Invalid username or password"}), 401

    # CHECK THE PASSWORD
    if bcrypt.check_password_hash(user.password, password):
        user.last_login = datetime.utcnow()
        db.session.commit()
        token = create_access_token(
            identity=user.email)
        response = jsonify({"message": "Successfull Login", "user": {
                           "userId": user.user_id, "userType": user.user_type, "name": user.first_name + " " + user.last_name, "email": user.email, "phone": user.phone}, "token": token})

        set_access_cookies(response, token, max_age=3600)

        return response, 200

    return jsonify({"message": "Invalid Password"}), 401

# LOGOUT ROUTE


@app.route("/auth/logout", methods=["POST"])
def logout_with_cookies():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response


# COMPANIES AUTH
@app.route("/companies/auth/register", methods=["POST"])
def register_company():
    company_data = request.form
    company_name = company_data.get("company_name")
    company_email = company_data.get("company_email")
    company_country = company_data.get("company_country")
    company_website = company_data.get("company_website")
    password = company_data.get("password")
    # file

    # CHECK IF FIELDS NOT EMPTY
    if not company_name or not company_email or not company_country or not company_website or 'file' not in request.files or not password:
        return jsonify({"message": "Fields cannot be empty"}), 404
    # Extract filename and check if its allowed
    else:
        componay_logo = request.files.get('file')
        # Define allowed extensions
        ALLOWED_EXTENSIONS = {'jpeg', 'jpg', 'png'}

        # check if file meets the extension requirements

        def allowed_file(filename):
            return '.' in filename and \
                filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS
        filename = secure_filename(componay_logo.filename)
        if not allowed_file(filename):
            return jsonify({"Message": "File is not allowed, can oly be png, jpeg or jpg"}), 403
        else:
            if not os.path.exists('file_upload'):
                os.makedirs('file_upload')
            componay_logo.save(os.path.join('/api/file_upload', filename))
            logo_url = os.path.join("/api/file_upload", filename)
            if logo_url:
                pwd_hash = bcrypt.generate_password_hash(
                    password, 5).decode('utf-8')
                newCompany = Companies(company_name=company_name, company_email=company_email,
                                       company_country=company_country, company_website=company_website, company_logo_url=logo_url, password=pwd_hash)
                try:
                    db.session.add(newCompany)
                    db.session.commit()
                    return jsonify({"message": "Company Created Successfully"}), 200
                except:
                    db.session.rollback()
                    existingCompany = Companies.query.filter(
                        company_email == company_email).first()
                    if existingCompany is not None:
                        return {"message": f'Company with email: {company_email} already exists'}, 409
                    else:
                        return {"message": "An error occurred while creating the user"}, 500


# COMPANY LOGIN
@app.route('/companies/auth/login', methods=['POST'])
def company_login():
    login_data = request.json
    email = login_data.get('email')
    password = login_data.get('password')

    # Check if fields not empty
    if not email or not password:
        return jsonify({"message": "Email or Password is required"}), 404
    # CHECK IF USER EXISTS
    company = Companies.query.filter(Companies.company_email == email).first()
    if not company:
        return jsonify({"message": "Invalid username or password"}), 401

    # CHECK THE PASSWORD
    if bcrypt.check_password_hash(company.password, password):
        company.last_login = datetime.utcnow()
        db.session.commit()
        token = create_access_token(
            identity=company.company_email)
        response = jsonify({"message": "Successfull Login", "company": {
                           "companyId": company.company_id, "userType": company.user_type, "name": company.company_name}, "token": token})

        set_access_cookies(response, token, max_age=3600)

        return response, 200

    return jsonify({"message": "Invalid Password"}), 401
