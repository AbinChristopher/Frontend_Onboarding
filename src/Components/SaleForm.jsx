import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { createSale, updateSale } from '../redux/salesSlice';

const SaleForm = ({ sale, onSave, customers = [], products = [], stores = [] }) => {
    const [dateSold, setDateSold] = useState('');
    const [customerId, setCustomerId] = useState('');
    const [productId, setProductId] = useState('');
    const [storeId, setStoreId] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        if (sale) {
            setDateSold(sale.dateSold.slice(0, 10)); // Trim to YYYY-MM-DD
            setCustomerId(sale.customerId);
            setProductId(sale.productId);
            setStoreId(sale.storeId);
        }
    }, [sale]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const saleData = { dateSold, customerId, productId, storeId };

        try {
            if (sale) {
                await dispatch(updateSale({ ...saleData, id: sale.id }));
            } else {
                await dispatch(createSale(saleData));
                // Optional: reset form after create
                setDateSold('');
                setCustomerId('');
                setProductId('');
                setStoreId('');
            }
            onSave();
        } catch (error) {
            console.error('Error saving sale:', error);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>Date Sold</Form.Label>
                <Form.Control
                    type="date"
                    value={dateSold}
                    onChange={(e) => setDateSold(e.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Customer</Form.Label>
                <Form.Control
                    as="select"
                    value={customerId || ''}
                    onChange={(e) => setCustomerId(e.target.value)}
                    required
                >
                    <option value="" disabled>Select a customer</option>
                    {customers.map((customer) => (
                        <option key={customer.id} value={customer.id}>
                            {customer.name}
                        </option>
                    ))}
                </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Product</Form.Label>
                <Form.Control
                    as="select"
                    value={productId || ''}
                    onChange={(e) => setProductId(e.target.value)}
                    required
                >
                    <option value="" disabled>Select a product</option>
                    {products.map((product) => (
                        <option key={product.id} value={product.id}>
                            {product.name}
                        </option>
                    ))}
                </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Store</Form.Label>
                <Form.Control
                    as="select"
                    value={storeId || ''}
                    onChange={(e) => setStoreId(e.target.value)}
                    required
                >
                    <option value="" disabled>Select a store</option>
                    {stores.map((store) => (
                        <option key={store.id} value={store.id}>
                            {store.name}
                        </option>
                    ))}
                </Form.Control>
            </Form.Group>

            <Button variant="primary" type="submit">
                {sale ? 'Update Sale' : 'Create Sale'}
            </Button>
        </Form>
    );
};

export default SaleForm;
