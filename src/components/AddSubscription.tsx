import React, { useState } from 'react';
import CustomerDropdown from './CustomerDropdown';
import ProductDropdown from './ProductDropdown';
import axiosInstance from '../axiosInstance';
import { Button, TextField, Grid, Typography, Box, Alert } from '@mui/material';

const AddSubscription = () => {
  const [customerID, setCustomerID] = useState('');
  const [productName, setProductName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [users, setUsers] = useState<string | number>();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {

    if(customerID.length == 0 ||  productName.length == 0 || startDate.length == 0 || endDate.length == 0 || users == 0){
      setMessage('Error : Please fill all the details')
      return
    }

    setLoading(true)
    await axiosInstance.post('/subscriptions/add_subscription/', {
      customer_id: customerID,
      product_name: productName,
      start_date: startDate,
      end_date: endDate,
      users: users || 0,
    })
      .then(response => setMessage('Subscription added successfully!'))
      .catch(error => {
        setMessage('Error : ' +error.response.data.message);
      });

    setLoading(false)

  };

  return (
    <Box sx={{ maxWidth: 600, margin: '0 auto', padding: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        Add Subscription
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <CustomerDropdown onSelect={setCustomerID} />
        </Grid>

        <Grid item xs={12}>
          <ProductDropdown onSelect={setProductName} />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Start Date"
            type="date"
            fullWidth
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="End Date"
            type="date"
            fullWidth
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>

        <Grid item xs={12}>
  <TextField
    label="Number of Users"
    type="number"
    fullWidth
    value={users}
    onChange={(e) => {
      const value = e.target.value;
      setUsers(value == '' ? '' : parseInt(value, 10));
    }}
  />
</Grid>

        <Grid item xs={12}>
          <Button
            variant="contained"
            color={loading ? 'secondary' : "primary"}
            fullWidth
            onClick={handleSubmit}
            sx={{ marginTop: 2 }}
            disabled ={loading}
          >
            Add Subscription
          </Button>
        </Grid>

        <Grid item xs={12}>
          {message && (
            <Alert severity={message.startsWith('Error') ? 'error' : 'success'}>
              {message}
            </Alert>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddSubscription;
