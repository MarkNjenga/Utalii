from flask import Flask, request, jsonify, make_response
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Resource, Api
from models import db, User, Destination

app = Flask(__name__)
CORS(app)

# Database Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///utalii.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'U%T23A*&L#2I14$I8'

db.init_app(app)
migrate = Migrate(app, db)
jwt = JWTManager(app)
api = Api(app)

# Ensure tables are created once before the first request
tables_initialized = False

@app.before_request
def initialize_tables():
    global tables_initialized
    if not tables_initialized:
        db.create_all()
        tables_initialized = True

class DestinationsResource(Resource):
    def get(self):
        destinations = Destination.query.all()
        response_dict = [destination.to_dict() for destination in destinations]
        return jsonify(response_dict)

class ParksResource(Resource):
    def get(self):
        parks = Destination.query.filter_by(category='park').all()
        response_dict = [park.to_dict() for park in parks]
        return make_response(jsonify(response_dict), 200)

class SignupResource(Resource):
    def post(self):
        data = request.json
        new_user = User(
            name=data['name'],
            email=data['email'],
            phone_number=data['phone_number'],
            password=data['password']  # Should hash in production
        )
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"msg": "User registered successfully!"}), 201

class LoginResource(Resource):
    def post(self):
        data = request.json
        user = User.query.filter_by(email=data['email']).first()
        if user and user.password == data['password']:  # Hash password check in production
            access_token = create_access_token(identity={'user_id': user.id})
            return jsonify(access_token=access_token), 200
        return jsonify({"msg": "Bad username or password"}), 401

class ProtectedResource(Resource):
    @jwt_required()
    def get(self):
        current_user = get_jwt_identity()
        return jsonify({"msg": "Welcome!", "user_id": current_user['user_id']}), 200
    

class Hotels(Resource):
    def get(self):
        hotels = []
        hotels_dict = [h.to_dict() for h in Destination.query.filter_by(Destination.category=='hotel').all()]
        hotels.append(hotels_dict)
        response = make_response(
            hotels,
            200
        )
        return response
class Parks(db.Model, Resource):
    def get(self):
        parks = []
        parks_dict = [p.to_dict() for p in Destination.query.filter_by(Destination.category=='park').all()]
        parks.append(parks_dict)
        response = make_response(
            parks,
            200
        )
        return response
    
class Beaches(db.Model, Resource):
    def get(self):
        beaches = []
        beaches_dict = [b for b in Destination.query.filter_by(Destination.category=='beach').all()]
        beaches.append(beaches_dict)
        response = make_response(
            beaches,
            200
        )
        return response

class Services(db.Model, Resource):
    def post(self):
        data = request.json
        try:
            new_destination = Destination(
                name=data['name'],
                description=data['description'],
                category=data['category'],
                location=data['location']
            )
            db.session.add(new_destination)
            db.session.commit()
            return make_response(jsonify({"message": "Destination added successfully!"}), 201)
        except Exception as e:
            return make_response(jsonify({"error": str(e)}), 400)
    def delete(self):
        destination_id = request.args.get('id')
        destination = Destination.query.get(destination_id)
        
        if destination:
            db.session.delete(destination)
            db.session.commit()
            return make_response(jsonify({"message": "Destination deleted successfully!"}), 200)
        else:
            return make_response(jsonify({"error": "Destination not found"}), 404)
# Add resources to API
api.add_resource(DestinationsResource, '/destinations')
api.add_resource(ParksResource, '/parks')
api.add_resource(SignupResource, '/api/auth/signup')
api.add_resource(LoginResource, '/api/auth/login')
api.add_resource(ProtectedResource, '/api/protected')
api.add_resource(Hotels, '/hotels')
api.add_resource(Parks, '/parks')
api.add_resource(Beaches, '/beaches')
api.add_resource(Services, '/services')

if __name__ == '__main__':
    app.run(debug=True)
