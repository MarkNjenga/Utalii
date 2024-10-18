from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData, ForeignKey
from sqlalchemy_serializer import SerializerMixin

metadata = MetaData()
db = SQLAlchemy(metadata=metadata)

# Association Table for Many-to-Many relationship
user_favorite = db.Table(
    'user_favorite',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('favorite_id', db.Integer, db.ForeignKey('favorites.id'), primary_key=True),
    db.Column('favorite_type', db.String, nullable=False),  # To specify the type: 'park', 'hotel', 'beach'
    db.Column('review', db.String, nullable=True)  # User-submittable attribute
)

# User Model
class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False, unique=True)
    phone_number = db.Column(db.String, nullable=False, unique=True)
    password = db.Column(db.String, nullable=False)

    # Relationships
    services = db.relationship('Service', backref='user', lazy='dynamic')
    hotels = db.relationship('Hotel', backref='user', lazy='dynamic')
    
    # Many-to-Many relationship with user_favorite
    favorites = db.relationship('Favorite', secondary=user_favorite, backref='users')

    serialize_rules = ('-services.user', '-hotels.user', '-favorites.users')

# Service Model
class Service(db.Model, SerializerMixin):
    __tablename__ = 'services'

    id = db.Column(db.Integer, primary_key=True)
    service_name = db.Column(db.String, nullable=False)
    image = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    location = db.Column(db.String, nullable=False)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    serialize_rules = ('-user.services',)

# Park Model
class Park(db.Model, SerializerMixin):
    __tablename__ = 'parks'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    image = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    location = db.Column(db.String, nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    address = db.Column(db.String, nullable=False)

    # Foreign key to Favorite
    favorite_id = db.Column(db.Integer, ForeignKey('favorites.id'))

# Hotel Model
class Hotel(db.Model, SerializerMixin):
    __tablename__ = 'hotels'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    image = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    location = db.Column(db.String, nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    address = db.Column(db.String, nullable=False)
    price_range = db.Column(db.Integer, nullable=False)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    # Foreign key to Favorite
    favorite_id = db.Column(db.Integer, ForeignKey('favorites.id'))

    serialize_rules = ('-user.hotels',)

# Beach Model
class Beach(db.Model, SerializerMixin):
    __tablename__ = 'beaches'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    image = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    location = db.Column(db.String, nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    address = db.Column(db.String, nullable=False)

    # Foreign key to Favorite
    favorite_id = db.Column(db.Integer, ForeignKey('favorites.id'))

# Favorite Model
class Favorite(db.Model, SerializerMixin):
    __tablename__ = 'favorites'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)

    # Relationships
    parks = db.relationship('Park', backref='favorite')
    hotels = db.relationship('Hotel', backref='favorite')
    beaches = db.relationship('Beach', backref='favorite')

    serialize_rules = ('-users.favorites',)
