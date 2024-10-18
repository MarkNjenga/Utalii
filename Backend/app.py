from flask import Flask, request, jsonify, make_response
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Resource, Api
from models import db, User, Hotel, Park, Beach, Service

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

class SignupResource(Resource):
    def post(self):
        data = request.json
        new_user = User(
            name=data['name'],
            email=data['email'],
            phone_number=data['phone_number'],
            password=data['password']  # Hash the password before saving
        )
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"msg": "User registered successfully!"}), 201

class LoginResource(Resource):
    def post(self):
        data = request.json
        user = User.query.filter_by(email=data['email']).first()
        if user and user.password == data['password']:  # Add hashed password check here
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
        hotels = [h.to_dict() for h in Hotel.query.all()]
        return make_response(jsonify(hotels), 200)

class Parks(Resource):  
    def get(self):
        parks = [p.to_dict() for p in Park.query.all()]
        return make_response(jsonify(parks), 200)
    
class Beaches(Resource):  
    def get(self):
        beaches = [b.to_dict() for b in Beach.query.all()]
        return make_response(jsonify(beaches), 200)

class Services(Resource): 
    def get(self):
        services = [s.to_dict() for s in Service.query.all()]
        return make_response(jsonify(services), 200)

    def post(self):
        data = request.json
        try:
            new_service = Service(
                service_name=data['service_name'],  
                description=data['description'],
                image=data['image'],  
                user_id=data.get('user_id')  
            )
            db.session.add(new_service)
            db.session.commit()
            return make_response(jsonify({"message": "Service added successfully!"}), 201)
        except Exception as e:
            return make_response(jsonify({"error": str(e)}), 400)


# New ServiceById Resource
class ServiceById(Resource):
    @jwt_required()
    def get(self, id):
        service = Service.query.get(id)
        if not service:
            return make_response(jsonify({"error": "Service not found"}), 404)
        return make_response(jsonify(service.to_dict()), 200)

    @jwt_required()
    def patch(self, id):
        service = Service.query.get(id)
        if not service:
            return make_response(jsonify({"error": "Service not found"}), 404)
        
        data = request.json
        if 'service_name' in data:
            service.service_name = data['service_name']
        if 'description' in data:
            service.description = data['description']
        if 'image' in data:
            service.image = data['image']

        db.session.commit()
        return make_response(jsonify({"message": "Service updated successfully!"}), 200)

    @jwt_required()
    def delete(self, id):
        service = Service.query.get(id)
        if not service:
            return make_response(jsonify({"error": "Service not found"}), 404)
        
        db.session.delete(service)
        db.session.commit()
        return make_response(jsonify({"message": "Service deleted successfully!"}), 200)


# Register resources with routes
api.add_resource(SignupResource, '/signup')
api.add_resource(LoginResource, '/login')
api.add_resource(ProtectedResource, '/protected')
api.add_resource(Hotels, '/hotels')
api.add_resource(Parks, '/parks')
api.add_resource(Beaches, '/beaches')
api.add_resource(Services, '/services')
api.add_resource(ServiceById, '/services/<int:service_id>')

if __name__ == '__main__':
    app.run(port=5555)
