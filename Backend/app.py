from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_cors import CORS
from flask_migrate import Migrate  
from models import db, User, Destination, Service, DestinationService

app = Flask(__name__)
CORS(app)

# Database Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///utalii.db'  
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'U%T23A*&L#2I14$I8'  

db.init_app(app)
migrate = Migrate(app, db)  
jwt = JWTManager(app)

# Ensure tables are created once before the first request
tables_initialized = False

@app.before_request
def initialize_tables():
    global tables_initialized
    if not tables_initialized:
        db.create_all()
        tables_initialized = True

@app.route('/api/auth/signup', methods=['POST'])
def signup():
    data = request.json
    new_user = User(
        name=data['name'],
        email=data['email'],
        phone_number=data['phone_number'],
        password=data['password']  
    )
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"msg": "User registered successfully!"}), 201

@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.json
    user = User.query.filter_by(email=data['email']).first()
    if user and user.password == data['password']:  
        access_token = create_access_token(identity={'user_id': user.id})
        return jsonify(access_token=access_token), 200
    return jsonify({"msg": "Bad username or password"}), 401

@app.route('/api/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify({"msg": "Welcome!", "user_id": current_user['user_id']}), 200

if __name__ == '__main__':
    app.run(debug=True)


# from sqlalchemy.orm import Session
# from models import db, User, Destination, Service
# from flask_migrate import Migrate
# from flask import Flask, request, make_response, jsonify
# from flask_restful import Api, Resource
# import os

# BASE_DIR = os.path.abspath(os.path.dirname(__file__))
# DATABASE = os.environ.get(
#     "DB_URI", f"sqlite:///{os.path.join(BASE_DIR, 'utalii.db')}")

# app = Flask(__name__)
# app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# app.json.compact = False

# migrate = Migrate(app, db)

# db.init_app(app)

# api = Api(app)

# class User(Resource):
#     pass

# class Destination(Resource):
#     pass

# class Service(Resource):
#     pass

# if __name__ == '__main__':
#     app.run(port=5555, debug=True)

