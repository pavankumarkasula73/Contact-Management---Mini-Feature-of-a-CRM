const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('your-mongodb-atlas-connection-string', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log(err));



const contactSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String },
  company: { type: String },
  jobTitle: { type: String }
});

const Contact = mongoose.model('Contact', contactSchema);

// POST /contacts - Create new contact
app.post('/contacts', async (req, res) => {
  const { firstName, lastName, email, phoneNumber, company, jobTitle } = req.body;
  try {
    const contact = new Contact({ firstName, lastName, email, phoneNumber, company, jobTitle });
    await contact.save();
    res.status(201).json(contact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET /contacts - Get all contacts
app.get('/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT /contacts/:id - Update a contact
app.put('/contacts/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const updatedContact = await Contact.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedContact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE /contacts/:id - Delete a contact
app.delete('/contacts/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Contact.findByIdAndDelete(id);
    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
