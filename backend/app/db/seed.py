from sqlalchemy.orm import Session
from app.models.menu import MenuItem
from app.models.event import Event
from app.models.review import Review


def seed_database(db: Session):
    # Check if already seeded
    if db.query(MenuItem).first() is not None:
        return

    # Seed Authentic Menu Items for Molecule Air Bar Lucknow
    menu_items = [
        # Cocktails (Molecular Mixology)
        MenuItem(
            category="Cocktails",
            name="Signature Molecule",
            description="House infused botanical gin, citrus essence, aromatic mist & rosemary smoke",
            price=650,
            image_url="/assets/images/cocktail-molecule.jpg",
            is_special=True,
            dietary="Signature"
        ),
        MenuItem(
            category="Cocktails",
            name="Smoked Old Fashioned",
            description="Single barrel bourbon, Angostura bitters, flamed orange peel, hickory wood smoke",
            price=700,
            image_url="/assets/images/cocktail-oldfashioned.jpg",
            is_special=True,
            dietary="Signature"
        ),
        MenuItem(
            category="Cocktails",
            name="Liquid Nitrogen Mojito",
            description="Cuban white rum, fresh garden mint, Persian lime, frozen nitrogen pearls",
            price=550,
            image_url="/assets/images/cocktail-mojito.jpg",
            is_special=False,
            dietary="Standard"
        ),
        MenuItem(
            category="Cocktails",
            name="Classic Whisky Sour",
            description="Blended Scotch whisky, organic lemon juice, aromatic bitters, silky egg foam",
            price=600,
            image_url="/assets/images/cocktail-whiskeysour.jpg",
            is_special=False,
            dietary="Standard"
        ),

        # Spirits
        MenuItem(
            category="Spirits",
            name="Single Malt Highland 12Y",
            description="Neat or over hand-carved ice sphere, 30 ml pour",
            price=750,
            image_url="/assets/images/spirit-singlemalt.jpg",
            is_special=True,
            dietary="Premium"
        ),
        MenuItem(
            category="Spirits",
            name="Grey Goose Vodka",
            description="Ultra-premium French wheat vodka, neat or with artisan tonic, 30 ml",
            price=500,
            image_url="/assets/images/spirit-vodka.jpg",
            is_special=False,
            dietary="Premium"
        ),
        MenuItem(
            category="Spirits",
            name="Diplomático Aged Rum",
            description="Venezuelan dark rum aged 12 years in oak barrels, 30 ml",
            price=550,
            image_url="/assets/images/spirit-rum.jpg",
            is_special=False,
            dietary="Premium"
        ),

        # Gourmet Bites
        MenuItem(
            category="Bites",
            name="Truffle Paneer Tikka",
            description="Cottage cheese marinated in Kashmiri spices, clay oven charred with truffle drizzle",
            price=450,
            image_url="/assets/images/bite-paneer.jpg",
            is_special=True,
            dietary="Veg"
        ),
        MenuItem(
            category="Bites",
            name="Awadhi Chicken Seekh",
            description="Minced country chicken infused with royal Lucknow spices, served with mint emulsion",
            price=520,
            image_url="/assets/images/bite-chicken.jpg",
            is_special=True,
            dietary="Non-Veg"
        ),
        MenuItem(
            category="Bites",
            name="Golgappa Molecular Shots",
            description="Crisp semolina spheres served with five molecular spiced botanical waters",
            price=380,
            image_url="/assets/images/bite-golgappa.jpg",
            is_special=True,
            dietary="Veg"
        ),
        MenuItem(
            category="Bites",
            name="Parmesan Truffle Fries",
            description="Double-cooked hand-cut potatoes tossed in aged parmesan, herbs and garlic aioli",
            price=320,
            image_url="/assets/images/bite-fries.jpg",
            is_special=False,
            dietary="Veg"
        ),
    ]

    for item in menu_items:
        db.add(item)

    # Seed Events & Nightlife
    events = [
        Event(
            title="Live Acoustic Nights",
            timing="Every Friday, 9:00 PM onwards",
            description="Unwind with soulful acoustic sets, panoramic Lucknow skyline views, and artisan cocktails.",
            image_url="/assets/images/event-music.jpg",
            is_active=True
        ),
        Event(
            title="Golden Hour Sundowner",
            timing="Daily, 5:00 PM to 8:00 PM",
            description="Exclusive 1+1 offers on signature molecular cocktails while watching the sunset over Gomti Nagar.",
            image_url="/assets/images/event-happyhour.jpg",
            is_active=True
        ),
        Event(
            title="Saturday Bollywood & Commercial DJ",
            timing="Saturday nights, 10:00 PM till late",
            description="High-energy rooftop clubbing experience with top guest DJs. Early table reservation recommended.",
            image_url="/assets/images/event-dj.jpg",
            is_active=True
        )
    ]

    for ev in events:
        db.add(ev)

    # Seed Authentic Reviews
    reviews = [
        Review(
            author="Rohit Verma",
            text="The rooftop view of Gomti Nagar from Riverside Mall is unmatched. Loved the molecular cocktails and the live acoustic performance on Friday night!",
            rating=5,
            source="Google Reviews"
        ),
        Review(
            author="Priyanka Sharma",
            text="Molecule Air Bar is our top weekend destination in Lucknow. Great music, polite staff, and the Truffle Paneer Tikka was sensational.",
            rating=5,
            source="Google Reviews"
        ),
        Review(
            author="Ananya Srivastava",
            text="Incredible atmosphere with the 3D molecular theme and outdoor breeze. Liquid Nitrogen cocktails are must-try. Definitely booking early next time!",
            rating=5,
            source="Google Reviews"
        )
    ]

    for rev in reviews:
        db.add(rev)

    db.commit()
