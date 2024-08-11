import React, { useEffect, useState } from 'react';
import { Typography, Container, Paper } from '@mui/material';
import axiosInstance from '../axiosInstance';

const RevenueReport = () => {
  const [revenue, setRevenue] = useState(0);

  useEffect(() => {
    axiosInstance.get('/subscriptions/revenue')
      .then(response => setRevenue(response.data.revenue))
      .catch(error => console.error('Error fetching revenue:', error));
  }, []);

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="h4" gutterBottom>
          Revenue Report
        </Typography>
        <Typography variant="h6">
          Total Revenue Earned: <strong>${revenue.toFixed(2)}</strong>
        </Typography>
      </Paper>
    </Container>
  );
};

export default RevenueReport;
