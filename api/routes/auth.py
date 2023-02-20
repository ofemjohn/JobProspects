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

bcrypt = Bcrypt()
jwt = JWTManager(app)
logging.basicConfig(level=logging.DEBUG)

# Register new user


@app.route('/auth/register', methods=['POST'])
def register_user():
    user_data = request.form
    first_name = user_data.get('first_name')
    last_name = user_data.get('last_name')
    email = user_data.get('email')
    phone = user_data.get('phone')
    gender = user_data.get('gender')
    country = user_data.get('country')
    state = user_data.get('state')
    address = user_data.get('address')
    password = user_data.get('password')

    # encode the password
    pwd_hash = bcrypt.generate_password_hash(password, 5).decode('utf-8')

    newUser = User(first_name=first_name, last_name=last_name, email=email, phone=phone,
                   gender=gender, country=country, state=state, address=address, password=pwd_hash)
    try:
        db.session.add(newUser)
        db.session.commit()
        return {"message": "User created successfully"}, 201
    except Exception as e:
        db.session.rollback()
        logging.error(e)
        existing_user = db.session.query(
            User).filter(User.email == email).first()
    if existing_user is not None:
        return {"message": f'User with email: {email} already exists'}, 409
    else:
        return {"message": "An error occurred while creating the user"}, 500


# LOGIN ROUTE
@app.route('/auth/login', methods=['POST'])
def login():
    login_data = request.form
    email = login_data.get('email')
    password = login_data.get('password')

    # Check if fields not empty
    if not email or not password:
        return {"message": "Email or Password is required"}, 204
    # CHECK IF USER EXISTS
    user = User.query.filter(User.email == email).first()
    if not user:
        return {"message": "Invalid username or password"}, 401

    # CHECK THE PASSWORD
    if bcrypt.check_password_hash(user.password, password):
        user.last_login = datetime.utcnow()
        db.session.commit()

        access_token = create_access_token(
            identity=user.email)
        # res = jsonify({"message": "Logged in Successfully"})
        # set_access_cookies(res, access_token)
        return f"token is {access_token}", 200

    return {"message": "Invalid Password"}, 401

# LOGOUT ROUTE


@app.route("/auth/logout", methods=["POST"])
def logout():
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
        return jsonify({"message": "Fields cannot be empty"}), 204
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
    login_data = request.form
    email = login_data.get('email')
    password = login_data.get('password')

    # Check if fields not empty
    if not email or not password:
        return {"message": "Email or Password is required"}, 204
    # CHECK IF USER EXISTS
    company = Companies.query.filter(Companies.company_email == email).first()
    if not company:
        return {"message": "Invalid username or password"}, 401

    # CHECK THE PASSWORD
    if bcrypt.check_password_hash(company.password, password):
        company.last_login = datetime.utcnow()
        db.session.commit()

        access_token = create_access_token(
            identity=company.company_email)
        # res = jsonify({"message": "Logged in Successfully"})
        # set_access_cookies(res, access_token)
        return f"token is {access_token}", 200

    return {"message": "Invalid Password"}, 401
