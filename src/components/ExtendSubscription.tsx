import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Grid } from '@mui/material';
import axiosInstance from '../axiosInstance';
import SubscriptionDropdown from './SubscriptionDropdown';
import { format } from 'date-fns';

const ExtendSubscription = () => {
  const [subscriptionID, setSubscriptionID] = useState('');
  const [subEndDate, setSubEndDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [message, setMessage] = useState('');


  const today = format(new Date(), 'yyyy-MM-dd');

  const handleSubmit = () => {
    axiosInstance.put(`/subscriptions/extend_subscription/${subscriptionID}`, {
      end_date: endDate,
    })
      .then(response => {
        setMessage('Subscription extended successfully!')
        alert('Subscription extended successfully!')
        window.location.reload()
      })
      .catch(error => setMessage('Error extending subscription: ' + error.message));
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Extend Subscription
      </Typography>

      <Grid container spacing={2}>
        
      <Grid item xs={12}>
          <SubscriptionDropdown onSelect={setSubscriptionID} />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="End Date"
            type="date"
            variant="outlined"
            fullWidth
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              inputProps: { min: today }, // Disable past dates
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSubmit}
          >
            Extend Subscription
          </Button>
        </Grid>

        {message && (
          <Grid item xs={12}>
            <Typography variant="body1" color="error">
              {message}
            </Typography>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default ExtendSubscription;
