from config import app, db
from flask import jsonify, request
from models.user_m import User
from flask_jwt_extended import jwt_required


@app.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    # return jsonify({'user': users})
    return jsonify([user.to_dict() for user in users])

# GET A SINGLE USER


@app.route('/user/<int:id>', methods=['GET'])
@jwt_required()
def get_user(id):
    user = User.query.filter(User.user_id == id).first()
    if not user:
        return {"message": "User not found"}, 404
    return jsonify(user.to_dict())
# SINGLE USER UPDATE DETAILS


@app.route('/user/<int:id>', methods=['PUT'])
@jwt_required()
def update_user(id):
    user_data = request.form
    user = User.query.filter(User.user_id == id).first()
    if not user:
        return {"message": "User not found"}, 404
    # if user exists
    for key, value in user_data.items():
        setattr(user, key, value)
    db.session.commit()
    return {"message": "User updated successfully"}, 200
# DELETE INDIVIDUAL ACCOUNT


@app.route("/user/<int:id>", methods=["DELETE"])
@jwt_required()
def delete_account(id):
    user = User.query.filter(User.user_id == id).first()
    if not user:
        return {"message": "Account not found"}, 404
    db.session.delete(user)
    db.session.commit()
    return {"message": "User deleted successfully"}, 200
