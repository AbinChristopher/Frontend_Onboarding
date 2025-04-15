import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCustomers } from '../redux/customersSlice';
import CustomerList from '../components/CustomersList';
import CustomerForm from '../components/CustomerForm';
import './CustomerPage.css';

const CustomerPage = () => {
    const dispatch = useDispatch();
    const customers = useSelector(state => state.customers.customers);
    const loading = useSelector(state => state.customers.loading);
    const error = useSelector(state => state.customers.error);

    const [editingCustomer, setEditingCustomer] = useState(null);
    const [isAddingCustomer, setIsAddingCustomer] = useState(false); // Manage adding new customer state
    const [updatedName, setUpdatedName] = useState('');
    const [updatedAddress, setUpdatedAddress] = useState('');

    useEffect(() => {
        dispatch(fetchCustomers()); // Fetch customers on component mount
    }, [dispatch]);

    // Handle customer edit
    const handleEdit = (customer) => {
        setEditingCustomer(customer);
        setUpdatedName(customer.name);
        setUpdatedAddress(customer.address);
    };

    // Handle form submission for updating customer
    const handleUpdate = (e) => {
        e.preventDefault();

        if (editingCustomer) {
            const updatedCustomer = {
                ...editingCustomer,
                name: updatedName,
                address: updatedAddress,
            };

            dispatch(updateCustomer(updatedCustomer)).then(() => {
                dispatch(fetchCustomers()); // Refresh customers list
            });

            setEditingCustomer(null); // Clear editing state
        }
    };

    const handleAddCustomer = () => {
        setIsAddingCustomer(true); // Show add customer form
    };

    const handleCloseForm = () => {
        setIsAddingCustomer(false); // Hide form after customer added
        setUpdatedName('');
        setUpdatedAddress('');
    };

    if (loading) return <p>Loading customers...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>Customer List</h1>
            {/* Add customer button with specific class */}
            <button className="add-new-customer" onClick={handleAddCustomer}>
                Add Customer
            </button>

            <CustomerList customers={customers} onEdit={handleEdit} />

            {/* Edit Form */}
            {editingCustomer && (
                <form onSubmit={handleUpdate}>
                    <h2>Edit Customer</h2>
                    <div>
                        <label>Name: </label>
                        <input
                            type="text"
                            value={updatedName}
                            onChange={(e) => setUpdatedName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Address: </label>
                        <input
                            type="text"
                            value={updatedAddress}
                            onChange={(e) => setUpdatedAddress(e.target.value)}
                        />
                    </div>
                    <button type="submit">Save</button>
                    <button type="button" onClick={() => setEditingCustomer(null)}>
                        Cancel
                    </button>
                </form>
            )}

            {/* Add Customer Form */}
            {isAddingCustomer && (
                <CustomerForm
                    customer={null} // No existing customer for adding new one
                    onSave={handleCloseForm} // Close form after saving
                />
            )}
        </div>
    );
};

export default CustomerPage;
