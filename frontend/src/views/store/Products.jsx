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
            <main className="mt-5">
                <div className="container">
                    <section className="text-center">
                        <div className='row'>
                            {products?.map((p, index) => (
                                <div>
                                    <div className="col-lg-4 col-md-12 mb-4">
                                        <div className="card">
                                            <div
                                                className="bg-image hover-zoom ripple"
                                                data-mdb-ripple-color="light"
                                            >
                                                <img
                                                    src={p.image}
                                                    className="w-100"
                                                    style={{width:"100%", height:"250px", objectFit:"cover"}}
                                                />
                                            </div>
                                            <div className='card-body'>
                                                <a href="" className='text-reset'>
                                                    <h5 className='card-title mb-3'>{p.title}</h5>
                                                </a>
                                                <a href="" className='text-reset'>
                                                    <p>{p.category?.title}</p>
                                                </a>
                                                <div className='d-flex justify-content-center'>
                                                    <h6 className='mb-3'>Rs.{p.price}</h6>
                                                    <h6 className='mb-3 text-muted ms-2'><strike>Rs.{p.old_price}</strike></h6>
                                                </div>
                                                <div className='btn-group'>
                                                    <button
                                                        className='btn btn-primary dropdown-toggle'
                                                        type='button'
                                                        id='dropdownMenuClickable'
                                                        data-bs-toggle='dropdown'
                                                        data-bs-auto-close='false'
                                                        aria-expanded='false'
                                                    >
                                                        Variation
                                                    </button>
                                                    <ul
                                                        className='dropdown-menu'
                                                        aria-labelledby='dropdownMenuClickable'
                                                    >
                                                        <div className='d-flex flex-column'>
                                                            <p>test</p>
                                                        </div>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <div className='row'>
                                <div className='col-lg-2'>
                                    <img src="https://skala.or.id/wp-content/uploads/2024/01/dummy-post-square-1-1.jpg" style={{width:"100px", height:"100px", borderRadius:"50%", objectFit:"cover"}} alt="" />
                                    <h6>Category</h6>
                                </div>
                                <div className='col-lg-2'>
                                    <img src="https://skala.or.id/wp-content/uploads/2024/01/dummy-post-square-1-1.jpg" style={{width:"100px", height:"100px", borderRadius:"50%", objectFit:"cover"}} alt="" />
                                    <h6>Category</h6>
                                </div>
                                <div className='col-lg-2'>
                                    <img src="https://skala.or.id/wp-content/uploads/2024/01/dummy-post-square-1-1.jpg" style={{width:"100px", height:"100px", borderRadius:"50%", objectFit:"cover"}} alt="" />
                                    <h6>Category</h6>
                                </div>
                                <div className='col-lg-2'>
                                    <img src="https://skala.or.id/wp-content/uploads/2024/01/dummy-post-square-1-1.jpg" style={{width:"100px", height:"100px", borderRadius:"50%", objectFit:"cover"}} alt="" />
                                    <h6>Category</h6>
                                </div>
                                <div className='col-lg-2'>
                                    <img src="https://skala.or.id/wp-content/uploads/2024/01/dummy-post-square-1-1.jpg" style={{width:"100px", height:"100px", borderRadius:"50%", objectFit:"cover"}} alt="" />
                                    <h6>Category</h6>
                                </div>
                                <div className='col-lg-2'>
                                    <img src="https://skala.or.id/wp-content/uploads/2024/01/dummy-post-square-1-1.jpg" style={{width:"100px", height:"100px", borderRadius:"50%", objectFit:"cover"}} alt="" />
                                    <h6>Category</h6>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </>





                        
    )
}

export default Products