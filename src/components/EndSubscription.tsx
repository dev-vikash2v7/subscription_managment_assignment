import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Grid } from '@mui/material';
import axiosInstance from '../axiosInstance';
import SubscriptionDropdown from './SubscriptionDropdown';

const EndSubscription = () => {
  const [subscriptionID, setSubscriptionID] = useState('');

  const [message, setMessage] = useState('');



  const handleSubmit = () => {
    axiosInstance.put(`/subscriptions/end_subscription/${subscriptionID}`)
      .then(response => {
        setMessage('Subscription ended successfully!')
        alert('Subscription ended successfully!')
        window.location.reload()

      })
      .catch(error => setMessage('Error ending subscription: ' + error.message));
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        End Subscription
      </Typography>

      <Grid container spacing={2}>

            <Grid item xs={12}>
          <SubscriptionDropdown onSelect={setSubscriptionID} />
        </Grid>

        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSubmit}
          >
            End Subscription
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

export default EndSubscription;
