import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { createStore, updateStore } from '../redux/storeSlice';

const StoreForm = ({ store, onSave }) => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        if (store) {
            setName(store.name);
            setAddress(store.address);
        }
    }, [store]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const storeData = { name, address };

        try {
            if (store) {
                await dispatch(updateStore({ ...storeData, id: store.id }));
            } else {
                await dispatch(createStore(storeData));
            }
            onSave(); // Close form after save
        } catch (error) {
            console.error('Error saving store:', error);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter store name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter store address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                />
            </Form.Group>

            <Button variant="primary" type="submit">
                {store ? 'Update Store' : 'Create Store'}
            </Button>
        </Form>
    );
};

export default StoreForm;
