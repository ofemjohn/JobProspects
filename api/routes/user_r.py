from config import app, db
from flask import jsonify
from models.user_m import User


@app.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    # return jsonify({'user': users})
    return jsonify([user.to_dict() for user in users])
