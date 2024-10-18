from flask import Flask, request, jsonify, make_response
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Resource, Api
from werkzeug.security import generate_password_hash, check_password_hash  # For password hashing
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

@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()

    # Check if all required fields are present
    if not all(key in data for key in ('name', 'email', 'phone_number', 'password')):
        return jsonify({"error": "Missing required fields"}), 400

    # Check if user already exists
    user = User.query.filter_by(email=data['email']).first()
    if user:
        return jsonify({"error": "User already exists!"}), 409

    try:
        # Use pbkdf2:sha256 for password hashing
        hashed_password = generate_password_hash(data['password'], method='pbkdf2:sha256')

        new_user = User(
            name=data['name'],
            email=data['email'],
            phone_number=data['phone_number'],
            password=hashed_password
        )

        db.session.add(new_user)
        db.session.commit()

        return jsonify({"message": "User registered successfully!"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# Login Route
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    
    # Validate input data
    if not all(key in data for key in ('email', 'password')):
        return jsonify({"error": "Missing required fields"}), 400

    user = User.query.filter_by(email=data['email']).first()
    
    if not user or not check_password_hash(user.password, data['password']):
        return jsonify({"error": "Invalid email or password!"}), 401

    # Generate a JWT access token
    access_token = create_access_token(identity=user.id)
    return jsonify({"access_token": access_token}), 200

# Logout Route (optional, depending on how you handle the client-side token)
@app.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    # Here, you can revoke tokens or handle client-side token invalidation
    return jsonify({"message": "Successfully logged out!"}), 200

# Example Protected Route to Test JWT Authentication
@app.route('/home', methods=['GET'])
@jwt_required()
def profile():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if user:
        return jsonify(user.to_dict()), 200
    return jsonify({"error": "User not found"}), 404

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
    def get(self, service_id):
        service = Service.query.get(service_id)
        if not service:
            return make_response(jsonify({"error": "Service not found"}), 404)
        return make_response(jsonify(service.to_dict()), 200)

    @jwt_required()
    def patch(self, service_id):
        service = Service.query.get(service_id)
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
    def delete(self, service_id):
        service = Service.query.get(service_id)
        if not service:
            return make_response(jsonify({"error": "Service not found"}), 404)
        
        db.session.delete(service)
        db.session.commit()
        return make_response(jsonify({"message": "Service deleted successfully!"}), 200)

# Register resources with routes
api.add_resource(Hotels, '/hotels')
api.add_resource(Parks, '/parks')
api.add_resource(Beaches, '/beaches')
api.add_resource(Services, '/services')
api.add_resource(ServiceById, '/services/<int:service_id>')

if __name__ == '__main__':
    app.run(port=5555, debug=True)
