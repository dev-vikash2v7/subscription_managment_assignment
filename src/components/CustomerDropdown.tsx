import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';

const CustomerDropdown = ({ onSelect }: { onSelect: (id: string) => void }) => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {

   const fun = async()=>{

      await axiosInstance.get('/subscriptions/customers')
      .then(response =>{
        console.log(response.data) 
        setCustomers(response.data.customers || [])})
      .catch(error => console.error('Error fetching customers:', error));
    }
    fun()

  }, []);

  return (
    <select onChange={(e) => onSelect(e.target.value)}>
      <option value="">Select a customer</option>
      {customers.map((customer: any) => (
        <option key={customer.customer_id} value={customer.customer_id}>
          {customer.name}
        </option>
      ))}
    </select>
  );
};

export default CustomerDropdown;
