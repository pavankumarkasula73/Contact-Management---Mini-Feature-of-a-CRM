# Contact-Management---Mini-Feature-of-a-CRM
Contact Management Application
Description
The Contact Management Application is a web-based tool that allows users to manage their contacts efficiently. Users can add, update, delete, and view contact details such as first name, last name, email, phone number, company, and job title. This project uses React for the frontend and Node.js with Express for the backend, with MongoDB as the database to store contact information.

Tech Stack
Frontend: React.js, Material UI (for styling and UI components)
Backend: Node.js, Express.js
Database: MongoDB Atlas (cloud MongoDB)
Authentication: No authentication has been implemented yet (optional for future enhancement)
Setup Instructions
Follow these steps to get the project up and running:

1. Clone the Repository
First, clone the repository to your local machine:

bash
Copy code
git clone https://github.com/your-username/contact-management.git
2. Install Backend Dependencies
Navigate to the backend directory:

bash
Copy code
cd backend
Install the required dependencies:

bash
Copy code
npm install
3. Set Up MongoDB Database
Go to MongoDB Atlas and sign up or log in.
Create a new cluster (if you don’t already have one).
Under Database Access, create a new database user with read and write access to the database.
Under Network Access, allow connections from your IP or any IP (0.0.0.0/0).
Copy the connection string provided by MongoDB Atlas.
In your backend folder, create a .env file with the following content:

env
Copy code
PORT=5000
MONGO_URI=mongodb+srv://<db_username>:<db_password>@cluster0.sii35.mongodb.net/contact-management?retryWrites=true&w=majority
Make sure to replace <db_username> and <db_password> with your actual credentials from MongoDB Atlas.

4. Start the Backend Server
Start the backend server:

bash
Copy code
npm start
This will run the server on http://localhost:5000.

5. Install Frontend Dependencies
Navigate to the frontend directory:

bash
Copy code
cd frontend
Install the required dependencies:

bash
Copy code
npm install
6. Start the Frontend Server
Start the React frontend server:

bash
Copy code
npm start
This will run the frontend on http://localhost:3000.

7. Access the Application
Once both the backend and frontend servers are running, you can access the application by visiting http://localhost:3000 in your browser.

Database Schema Script
Here is the schema used for the Contact model:

javascript
Copy code
const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  company: { type: String },
  jobTitle: { type: String },
});

module.exports = mongoose.model('Contact', contactSchema);
This schema defines the structure for each contact document stored in the MongoDB database. It ensures that fields such as first name, last name, email, and phone are mandatory, and the email is unique.

How the App Works
Frontend: The frontend consists of React components that provide an intuitive interface for managing contacts. Users can add a new contact, edit existing contacts, or delete contacts. The UI is styled using Material UI components, making the application responsive and user-friendly.

Backend: The backend uses Express.js to create a RESTful API that handles all contact-related operations (CRUD). The API connects to MongoDB via Mongoose, and the application stores contact information in the MongoDB database.

Adding a Contact: When the user fills out the form and clicks the "Add Contact" button, the frontend sends a POST request to the backend to store the contact in the database.

Editing a Contact: The user can click on the "Edit" button next to a contact, modify the contact details, and submit the changes. This sends a PUT request to the backend to update the contact in the database.

Deleting a Contact: The user can delete a contact by clicking on the "Delete" button next to the contact. This sends a DELETE request to the backend, removing the contact from the database.

Challenges and Solutions
1. MongoDB Connection Issues
Challenge: Initially, I faced issues with connecting to MongoDB Atlas. The connection string and credentials were difficult to configure properly.

Solution: After carefully reviewing the MongoDB Atlas setup process, I verified that I had added the correct username, password, and cluster information in the .env file. Additionally, I ensured that the IP address was whitelisted in the MongoDB Atlas network settings.

2. Form Validation
Challenge: One of the challenges was ensuring that the user cannot submit the form with empty fields, such as missing name or email. At first, the form was submitting even when required fields were empty.

Solution: I added client-side validation using simple JavaScript checks to make sure all the fields are filled before allowing submission. I also displayed error messages to guide the user.

3. Asynchronous Data Fetching
Challenge: When handling asynchronous requests, I initially struggled with ensuring that the frontend received updated contact data after adding or deleting a contact.

Solution: I implemented asynchronous functions in both the frontend and backend to handle these operations smoothly. I also made use of useEffect hooks in React to refresh the contact list once any operation (add, edit, delete) was completed.

4. CORS Issues
Challenge: While making requests from the frontend (React) to the backend (Express), I encountered Cross-Origin Resource Sharing (CORS) issues that blocked requests.

Solution: I installed and configured the cors package on the backend to allow cross-origin requests from the frontend. This allowed the frontend to communicate with the backend without CORS restrictions.
