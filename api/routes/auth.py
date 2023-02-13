from models.user_m import User
from flask import request, jsonify
from config import db, app
from flask_bcrypt import Bcrypt
from datetime import datetime
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
        res = jsonify({"message": "Logged in Successfully"})
        set_access_cookies(res, access_token)
        return f"{res} token is {access_token}", 200

    return {"message": "Invalid Password"}, 401

# LOGOUT ROUTE


@app.route("/auth/logout", methods=["POST"])
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response


with app.app_context():
    db.create_all()
