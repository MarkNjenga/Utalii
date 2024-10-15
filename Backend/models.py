from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy_serializer import SerializerMixin

metadata = MetaData()
db = SQLAlchemy(metadata=metadata)

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False, unique=True)

    phone_number = db.Column(db.String, nullable=False, unique=True) 

    password = db.Column(db.String, nullable=False)
    destinations = db.relationship('Destination', backref='user')
    services = db.relationship('Service', backref='user')
    serialize_rules = ('-destinations.user', '-services.user')

class Destination(db.Model, SerializerMixin):
    __tablename__ = 'destinations'

    id = db.Column(db.Integer, primary_key=True)
    location = db.Column(db.String, nullable=False)
    price = db.Column(db.Float, nullable=False)
    image = db.Column(db.String, nullable=False)
    category = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    services = db.relationship('Service', secondary='destination_service', viewonly=True)
    destination_services = db.relationship('DestinationService', backref='destination_link') 
    serialize_rules = ('-services.user', '-destination_services.service')


class DestinationService(db.Model, SerializerMixin):
    __tablename__ = 'destination_service'

    id = db.Column(db.Integer, primary_key=True)
    destination_id = db.Column(db.Integer, db.ForeignKey('destinations.id'))
    service_id = db.Column(db.Integer, db.ForeignKey('services.id'))
    rating = db.Column(db.Integer, nullable=False) 

    destination = db.relationship("Destination", backref="_destination_services")  
    service = db.relationship("Service", backref="destination_service_list")  
    serialize_rules = ('-destination.services_link', '-service.destination_services')


class Service(db.Model, SerializerMixin):
    __tablename__ = 'services'

    id = db.Column(db.Integer, primary_key=True)
    service_name = db.Column(db.String, nullable=False)
    image = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    destinations = db.relationship('Destination', secondary='destination_service', viewonly=True)
    destination_services = db.relationship('DestinationService', backref='service_link')  
    serialize_rules = ('-destinations.user', '-destination_services.destination')