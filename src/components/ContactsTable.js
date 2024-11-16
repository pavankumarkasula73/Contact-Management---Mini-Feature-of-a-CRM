import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, IconButton } from '@mui/material';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


const ContactsTable = ({ contacts, fetchContacts }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/contacts/${id}`);
      fetchContacts();
    } catch (err) {
      console.error('Error deleting contact:', err);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone Number</TableCell>
            <TableCell>Company</TableCell>
            <TableCell>Job Title</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contacts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((contact) => (
            <TableRow key={contact._id}>
              <TableCell>{contact.firstName}</TableCell>
              <TableCell>{contact.lastName}</TableCell>
              <TableCell>{contact.email}</TableCell>
              <TableCell>{contact.phoneNumber}</TableCell>
              <TableCell>{contact.company}</TableCell>
              <TableCell>{contact.jobTitle}</TableCell>
              <TableCell>
                <IconButton>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(contact._id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={contacts.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

export default ContactsTable;
