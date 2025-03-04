# Staysleek

## Staysleek is a full-stack web application for property rental, allowing users to list properties, book stays, and leave reviews. Built using the MERN stack with EJS for templating and Passport.js for authentication, it ensures secure and seamless user interactions.

## Features

User Authentication: Secure login and registration using Passport.js.

Protected Routes: Users must be authenticated to create listings, book properties, and leave reviews.

Property Listings: Users can add, edit, and delete property listing.

Booking System: Enables users to book properties based on availability.

Reviews & Ratings: Users can leave reviews for listed properties.

Server-Side Rendering: Uses EJS templates instead of React.

File Uploads: Images are stored and managed via Cloudinary.

## Note: The project currently lacks a responsive design and does not use Tailwind CSS.

Installation

1. Clone the Repository

git clone https://github.com/TalkeenAhmadNomani/stay_mern.git
cd stay_mern

2. Install Dependencies

npm install

3. Configure Environment Variables

Create a .env file in the root directory and add:

MONGO_URI=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
SESSION_SECRET=your_session_secret

4. Start the Server

npm start

The application will be accessible at http://localhost:3000.

Project Structure

controllers/: Handles application logic for routes.

models/: Defines MongoDB schemas using Mongoose.

routes/: API and view routing.

views/: EJS templates for server-side rendering.

middleware/: Authentication and authorization utilities.

Dependencies

Backend:

express

mongoose

passport

passport-local

express-session

multer

cloudinary

dotenv

Frontend:

EJS for templating

Contributing

Fork the repository.

Create a new branch: git checkout -b feature-name

Make your changes and commit them: git commit -m 'Add new feature'

Push to the branch: git push origin feature-name

Open a pull request.

