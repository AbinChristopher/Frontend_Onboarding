import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { createProduct, updateProduct } from '../redux/productSlice';

const ProductForm = ({ product, onSave }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        if (product) {
            setName(product.name);
            setPrice(product.price);
        }
    }, [product]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const productData = { name, price: parseFloat(price)};

        try {
            if (product) {
                await dispatch(updateProduct({ ...productData, id: product.id }));
            } else {
                await dispatch(createProduct(productData));
            }
            onSave(); 
        } catch (error) {
            console.error('Error saving product:', error);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter product name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control
                    type="number"
                    step="0.01"
                    placeholder="Enter price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
            </Form.Group>

            <Button variant="primary" type="submit">
                {product ? 'Update Product' : 'Create Product'}
            </Button>
        </Form>
    );
};

export default ProductForm;
