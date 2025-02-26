from app import app
from models import db, User, Service, Park, Hotel, Beach, Favorite

# Create the seed data function
def seed_data():
    # Drop existing data and recreate the tables
    db.drop_all()
    db.create_all()

    # Create users
    user1 = User(
        name="John Doe",
        email="john@example.com",
        phone_number="1234567890",
        password="hashed_password"  
    )
    user2 = User(
        name="Jane Smith",
        email="jane@example.com",
        phone_number="0987654321",
        password="hashed_password"
    )

    # Add Services
    service1 = Service(
        service_name="Kayaking",
        image="https://tinyurl.com/4y2mfxy7", 
        description="Enjoy a thrilling kayaking experience.",
        location="Lake Victoria",
        user_id=user1.id
    )
    service2 = Service(
        service_name="Safari Tour",
        image="https://tinyurl.com/5thzdc64",
        description="Experience a breathtaking safari tour.",
        location="Masai Mara",
        user_id=user2.id
    )

    # Add Parks
    park1 = Park(
        name="Serengeti National Park",
        image="https://tinyurl.com/mvzybp6s",
        description="A majestic wildlife park filled with rich biodiversity.",
        location="Tanzania",
        rating=5,
        address="Serengeti, TZ"
    )
    park2 = Park(
        name="Yellowstone National Park",
        image="https://tinyurl.com/2vn86sve",
        description="Explore the geothermal wonders of Yellowstone.",
        location="USA",
        rating=4,
        address="Yellowstone, WY"
    )

    # Add Hotels
    hotel1 = Hotel(
        name="Luxury Safari Lodge",
        image="https://tinyurl.com/ysurwsee",
        description="A luxury lodge in the heart of the wilderness.",
        location="Masai Mara",
        rating=5,
        address="Masai Mara, Kenya",
        price_range=300,
        user_id=user1.id
    )
    hotel2 = Hotel(
        name="Coastal Beach Resort",
        image="https://tinyurl.com/6fbay9we",
        description="A resort with stunning views of the ocean.",
        location="Diani Beach",
        rating=4,
        address="Diani Beach, Kenya",
        price_range=250,
        user_id=user2.id
    )

    # Add Beaches
    beach1 = Beach(
        name="Diani Beach",
        image="https://tinyurl.com/23x3amj9",
        description="A pristine white-sand beach on the Kenyan coast.",
        location="Kenya",
        rating=5,
        address="Diani Beach, Kenya"
    )
    beach2 = Beach(
        name="Bondi Beach",
        image="https://tinyurl.com/bdc64ecv",
        description="Australia’s iconic beach destination.",
        location="Australia",
        rating=4,
        address="Bondi, NSW"
    )

    # Add Favorites
    favorite1 = Favorite(name="Wildlife Experiences")
    favorite2 = Favorite(name="Beach Getaways")

    # Associate Parks, Hotels, and Beaches with Favorites
    favorite1.parks.extend([park1, park2])
    favorite2.beaches.append(beach1)
    favorite2.hotels.append(hotel2)

    # Commit the objects to the session
    db.session.add_all([user1, user2, service1, service2, park1, park2, hotel1, hotel2, beach1, beach2, favorite1, favorite2])
    db.session.commit()

# Ensure the app context is set up for database operations
if __name__ == '__main__':
    with app.app_context():
        seed_data()
        print("Database seeded successfully!")
