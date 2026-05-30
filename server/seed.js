require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Service = require('./models/Service');
const Booking = require('./models/Booking');

const users = [
    {
        name: 'Admin StyleDecor',
        email: 'admin@styledecor.com',
        photoURL: 'https://i.pravatar.cc/150?img=12',
        role: 'admin',
    },
    {
        name: 'Aarav Khan',
        email: 'decorator1@styledecor.com',
        photoURL: 'https://i.pravatar.cc/150?img=33',
        role: 'decorator',
        specialties: ['Wedding', 'Floral', 'Theme'],
        rating: 4.9,
        experienceYears: 8,
        bio: 'Award-winning wedding decorator with 8+ years experience.',
        phone: '+8801711000001',
    },
    {
        name: 'Mehnaz Rahman',
        email: 'decorator2@styledecor.com',
        photoURL: 'https://i.pravatar.cc/150?img=47',
        role: 'decorator',
        specialties: ['Home', 'Birthday', 'Lighting'],
        rating: 4.8,
        experienceYears: 6,
        bio: 'Modern minimalist home & event decorator.',
        phone: '+8801711000002',
    },
    {
        name: 'Rifat Hossain',
        email: 'decorator3@styledecor.com',
        photoURL: 'https://i.pravatar.cc/150?img=15',
        role: 'decorator',
        specialties: ['Office', 'Seminar', 'Corporate'],
        rating: 4.7,
        experienceYears: 10,
        bio: 'Corporate decorator handling 200+ events.',
        phone: '+8801711000003',
    },
    {
        name: 'Sumaiya Akter',
        email: 'decorator4@styledecor.com',
        photoURL: 'https://i.pravatar.cc/150?img=49',
        role: 'decorator',
        specialties: ['Anniversary', 'Floral', 'Theme'],
        rating: 4.6,
        experienceYears: 5,
        bio: 'Floral specialist creating dreamy spaces.',
        phone: '+8801711000004',
    },
    {
        name: 'Tania Sultana',
        email: 'user@styledecor.com',
        photoURL: 'https://i.pravatar.cc/150?img=5',
        role: 'user',
    },
];

const services = [
    {
        service_name: 'Royal Wedding Stage Decoration',
        cost: 75000,
        unit: 'per event',
        category: 'wedding',
        description:
            'Luxury stage setup with floral backdrop, fairy lights, drapery and a custom couple seating area. Includes professional setup team.',
        image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=900',
    },
    {
        service_name: 'Cozy Living Room Makeover',
        cost: 25,
        unit: 'per sqft',
        category: 'home',
        description:
            'Transform your living room with curated furniture arrangement, accent wall styling, lighting and decor accessories.',
        image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=900',
    },
    {
        service_name: 'Corporate Seminar Setup',
        cost: 35000,
        unit: 'per event',
        category: 'seminar',
        description:
            'Professional seminar/conference stage with branded backdrop, podium, plants and audience layout coordination.',
        image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=900',
    },
    {
        service_name: 'Birthday Party Theme Decor',
        cost: 12000,
        unit: 'per event',
        category: 'birthday',
        description:
            'Themed balloon arch, banners, cake table styling and photo backdrop for unforgettable birthday memories.',
        image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=900',
    },
    {
        service_name: 'Anniversary Romantic Setup',
        cost: 18000,
        unit: 'per event',
        category: 'anniversary',
        description:
            'Romantic candle-lit setup with rose petals, fairy lights, customized banner and ambient music coordination.',
        image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=900',
    },
    {
        service_name: 'Modern Office Lobby Styling',
        cost: 40,
        unit: 'per sqft',
        category: 'office',
        description:
            'Modern office lobby design including reception styling, branded wall art, indoor plants and seating arrangement.',
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=900',
    },
    {
        service_name: 'Wedding Reception Floral Arch',
        cost: 22000,
        unit: 'per arch',
        category: 'wedding',
        description:
            'Premium floral arch made with seasonal fresh flowers, perfect for receptions and photo moments.',
        image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=900',
    },
    {
        service_name: 'Bedroom Aesthetic Refresh',
        cost: 20,
        unit: 'per sqft',
        category: 'home',
        description:
            'Refresh your bedroom with new lighting, headboard styling, soft furnishings and aesthetic decor accents.',
        image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=900',
    },
    {
        service_name: 'Meeting Room Premium Setup',
        cost: 15000,
        unit: 'per event',
        category: 'meeting',
        description:
            'Executive meeting room arrangement with elegant table styling, name plates, branded materials and refreshment area.',
        image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900',
    },
    {
        service_name: 'Haldi Ceremony Yellow Theme',
        cost: 28000,
        unit: 'per event',
        category: 'wedding',
        description:
            'Vibrant yellow-themed haldi setup with marigold flowers, traditional umbrellas and cozy floor seating.',
        image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=900',
    },
    {
        service_name: 'Engagement Backdrop Decoration',
        cost: 17000,
        unit: 'per event',
        category: 'wedding',
        description:
            'Romantic engagement backdrop with fairy lights, flowers and custom name signage for a magical moment.',
        image: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=900',
    },
    {
        service_name: 'Kids Birthday Balloon Wonderland',
        cost: 9000,
        unit: 'per event',
        category: 'birthday',
        description:
            'Colorful balloon arches, themed props, treat tables and fun photo zones designed for children.',
        image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=900',
    },
];

async function run() {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected');

    await Promise.all([
        User.deleteMany({}),
        Service.deleteMany({}),
        Booking.deleteMany({}),
    ]);
    console.log('Cleared collections');

    const createdUsers = await User.insertMany(users);
    console.log(`Inserted ${createdUsers.length} users`);

    const admin = createdUsers.find((u) => u.role === 'admin');
    const decorators = createdUsers.filter((u) => u.role === 'decorator');
    const customer = createdUsers.find((u) => u.role === 'user');

    const createdServices = await Service.insertMany(
        services.map((s) => ({ ...s, createdByEmail: admin.email }))
    );
    console.log(`Inserted ${createdServices.length} services`);

    // a few bookings
    const sampleBookings = [
        {
            service: createdServices[0]._id,
            serviceSnapshot: {
                service_name: createdServices[0].service_name,
                cost: createdServices[0].cost,
                unit: createdServices[0].unit,
                category: createdServices[0].category,
                image: createdServices[0].image,
            },
            userEmail: customer.email,
            userName: customer.name,
            bookingDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            location: 'Banani Community Center, Dhaka',
            paymentStatus: 'paid',
            amountPaid: createdServices[0].cost,
            paymentIntentId: 'demo_intent_1',
            assignedDecoratorEmail: decorators[0].email,
            assignedDecoratorName: decorators[0].name,
            projectStatus: 'Planning Phase',
        },
        {
            service: createdServices[3]._id,
            serviceSnapshot: {
                service_name: createdServices[3].service_name,
                cost: createdServices[3].cost,
                unit: createdServices[3].unit,
                category: createdServices[3].category,
                image: createdServices[3].image,
            },
            userEmail: customer.email,
            userName: customer.name,
            bookingDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            location: 'Gulshan-2, Dhaka',
            paymentStatus: 'unpaid',
        },
    ];
    await Booking.insertMany(sampleBookings);
    console.log(`Inserted ${sampleBookings.length} bookings`);

    console.log('\n✅ Seed complete');
    console.log('Admin login: admin@styledecor.com / use Firebase to register this email');
    console.log('Sample user: user@styledecor.com');
    process.exit(0);
}

run().catch((e) => {
    console.error(e);
    process.exit(1);
});
