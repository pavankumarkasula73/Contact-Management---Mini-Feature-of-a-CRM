import React, { useState } from 'react';
import { TextField, Button, Grid, Box, Typography } from '@mui/material';
import axios from 'axios';

const ContactForm = ({ fetchContacts }) => {
  const [contact, setContact] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    company: '',
    jobTitle: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact({ ...contact, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/contacts', contact);
      fetchContacts();  // Refresh contacts list after adding
    } catch (err) {
      console.error('Error adding contact:', err);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ padding: 3, boxShadow: 3, borderRadius: 2 }}>
      <Typography variant="h5" gutterBottom>Add New Contact</Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            label="First Name"
            name="firstName"
            value={contact.firstName}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Last Name"
            name="lastName"
            value={contact.lastName}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Email"
            name="email"
            value={contact.email}
            onChange={handleChange}
            fullWidth
            required
            type="email"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Phone Number"
            name="phoneNumber"
            value={contact.phoneNumber}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Company"
            name="company"
            value={contact.company}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Job Title"
            name="jobTitle"
            value={contact.jobTitle}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
      </Grid>
      <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }}>
        Add Contact
      </Button>
    </Box>
  );
};

export default ContactForm;
