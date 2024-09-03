import React, {useState, useEffect} from 'react'

import apiInstance from '../../utils/axios'

function Products() {
    const [products, setProducts] = useState([])

    useEffect(() => {
        apiInstance.get(`products/`).then((response) => {
            setProducts(response.data)
        })      
    }, [])

    return (
        <>
            <div>Products</div>
            {products?.map((p, index) => (
                <div className='card shadow border p-3'>
                    <h1>{p.description}</h1>
                    <h1>{p.title}</h1>
                </div>
            ))}
        </>
    )
}

export default Products