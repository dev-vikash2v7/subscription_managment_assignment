import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';

const SubscriptionDropdown = ({ onSelect , setSubEndDate }: { onSelect: (name: string) => void , setSubEndDate ?: Date }) => {
  const [subscription, setSubscription] = useState([]);

  useEffect(() => {

    axiosInstance.get('/subscriptions/all-subscriptions')
      .then(response => { 

      
        
        setSubscription(response.data.sub_list || [])})
      .catch(error => console.error('Error fetching subscriptions:', error));
  }, []);

  return (
    <select onChange={(e) =>{

    
      
      onSelect(e.target.value)}}>


      <option value="">Select the subscription</option>
      {subscription.map((sub: any) => (
        <option key={sub} value={sub.id}>
          {sub.customer__name + ' - '  + sub.product}
        </option>
      ))}
    </select>
  );
};

export default SubscriptionDropdown;
