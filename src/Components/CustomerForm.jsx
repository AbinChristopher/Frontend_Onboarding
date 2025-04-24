import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { createCustomer, updateCustomer } from '../redux/customersSlice'; // Redux actions

const CustomerForm = ({ customer, onSave }) => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const dispatch = useDispatch();

    // Pre-fill form for editing
    useEffect(() => {
        if (customer) {
            setName(customer.name);
            setAddress(customer.address);
        }
    }, [customer]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const customerData = { name, address };

        try {
            if (customer) {
                // Dispatch updateCustomer action to Redux
                await dispatch(updateCustomer({ ...customerData, id: customer.id }));
            } else {
                // Dispatch createCustomer action to Redux
                await dispatch(createCustomer(customerData));
            }
            onSave(); // Close modal and refresh data after save
        } catch (error) {
            console.error('Error saving customer:', error);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter customer name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter customer address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                />
            </Form.Group>

            <Button variant="primary" type="submit">
                {customer ? 'Update Customer' : 'Create Customer'}
            </Button>
        </Form>
    );
};

export default CustomerForm;
