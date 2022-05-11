import React, { useEffect, useState } from 'react';
import axios from 'axios'

const Products = () => {
    const [products, setProducts] = useState([])
    useEffect(() => {
        const {data} = axios.get('http://localhost:5000/products') 
    }, [])
    return (
        <div>
            
        </div>
    );
};

export default Products;