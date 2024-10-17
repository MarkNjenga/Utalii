from app import app, db
from models import User, Destination, Service, DestinationService

def seed_data():
    with app.app_context():
        # Create users
        user1 = User(name="Alice", email="alice@example.com", phone_number="1234567890", password="password123")
        user2 = User(name="Bob", email="bob@example.com", phone_number="0987654321", password="password456")

        db.session.add(user1)
        db.session.add(user2)
        db.session.commit()

        # Create destinations
        destination1 = Destination(location="Paris", price=1000.0, image="paris.jpg", category="Travel", user_id=user1.id)
        destination2 = Destination(location="New York", price=1500.0, image="new_york.jpg", category="Travel", user_id=user2.id)

        db.session.add(destination1)
        db.session.add(destination2)
        db.session.commit()

        # Create services
        service1 = Service(service_name="Guided Tour", image="tour.jpg", description="A guided tour of the city", user_id=user1.id)
        service2 = Service(service_name="Hotel Booking", image="hotel.jpg", description="Book your stay at a luxury hotel", user_id=user2.id)

        db.session.add(service1)
        db.session.add(service2)
        db.session.commit()

        # Create destination services
        destination_service1 = DestinationService(destination_id=destination1.id, service_id=service1.id, rating=5)
        destination_service2 = DestinationService(destination_id=destination2.id, service_id=service2.id, rating=4)

        db.session.add(destination_service1)
        db.session.add(destination_service2)
        db.session.commit()

        print("Data seeded successfully!")

if __name__ == '__main__':
    seed_data()
