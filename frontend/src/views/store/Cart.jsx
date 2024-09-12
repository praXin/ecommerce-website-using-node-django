import { useState, useEffect } from 'react'
import apiInstance from '../../utils/axios'
import UserData from '../plugin/UserData'
import CardID from '../plugin/CardID'

function Cart() {
    const [cart, setCart] = useState([])
    const [cartTotal, setCartTotal] = useState([])

    const userData = UserData()
    const cart_id = CardID()

    const fetchCartData = (cartId, userId) => {
        const url = userId ? `cart-list/${cartId}/${userId}/` : `cart-list/${cartId}/`
        apiInstance.get(url).then((res) => {
            setCart(res.data)
        })
    }


    const fetchCartTotal = (cartId, userId) => {
        const url = userId ? `cart-detail/${cartId}/${userId}/` : `cart-detail/${cartId}/`
        apiInstance.get(url).then((res) => {
            setCartTotal(res.data)
        })
    }

    if (cart_id !== null || cart_id !== undefined){
        if(userData !== undefined) { // if userData is null?
            // Send cart data with userId and cartId
            useEffect(() => {
                fetchCartData(cart_id, userData?.user_id)
                fetchCartTotal(cart_id, userData?.user_id)
            }, [])
        } else {
            // Send cart data without userId but only cart_Id
            useEffect(() => {
                fetchCartData(cart_id, null)
                fetchCartTotal(cart_id, null)
            }, [])
        }
    }
    
    console.log(cartTotal);

    return (
        <main className="mt-5">
            <div className="container">
                <main className="mb-6">
                    <div className="container">
                        <section className="">
                            <div className="row gx-lg-5 mb-5">
                                <div className="col-lg-8 mb-4 mb-md-0">
                                    <section className="mb-5">

                                        {cart?.map((c, index) => (
                                            
                                        
                                        <div className="row border-bottom mb-4" key={index}>
                                            <div className="col-md-2 mb-4 mb-md-0">
                                                <div
                                                    className="bg-image ripple rounded-5 mb-4 overflow-hidden d-block"
                                                    data-ripple-color="light"
                                                >
                                                    {/* Check */}
                                                    {/* <Link to=''> */}
                                                    <img
                                                        src={c.product?.image}
                                                        className="w-100"
                                                        alt=""
                                                        style={{width: "100px", height: "100px", objectFit: "cover", borderRadius: "10px" }}
                                                    />
                                                    {/* </Link> */}
                                                    <a href="#!">
                                                    <div className="hover-overlay">
                                                        <div
                                                        className="mask"
                                                        style={{
                                                            backgroundColor: "hsla(0, 0%, 98.4%, 0.2)"
                                                        }}
                                                        />
                                                    </div>
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="col-md-8 mb-4 mb-md-0">
                                                <p className='fw-bold'>{c.product?.title}</p>
                                                <p className='mb-1'>
                                                    <span className="text-muted me-2">Price:</span>
                                                    <span>Rs.{c.price}</span>
                                                </p>
                                                {c.size !== "No Size" && 
                                                    <p className="mb-1">
                                                        <span className="text-muted me-2">Size:</span>
                                                        <span>{c.size}</span>
                                                    </p>
                                                }
                                                {c.color !== "No Color" && 
                                                    <p className='mb-0'>
                                                        <span className="text-muted me-2">Color:</span>
                                                        <span>{c.color}</span>
                                                    </p>
                                                }
                                                <p className='mb-1'>
                                                    <span className="text-muted me-2">Stock Qty:</span>
                                                    <span>{c.qty}</span>
                                                </p>
                                                <p className='mb-1'>
                                                    <span className="text-muted me-2">Vendor:</span>
                                                    <span>Pravin</span>
                                                </p>
                                                <p className="mt-3">
                                                    <a href="" className='text-danger pe-3'>
                                                        <small>
                                                            <i className="fas fa-trash me-2" />Remove
                                                        </small>
                                                    </a>
                                                </p>
                                            </div>
                                            <div className="col-md-2 mb-4 mb-md-0">
                                                <div className="form-outline d-flex mb-4">
                                                    <input
                                                        type="number"
                                                        id='typeNumber'
                                                        className="form-control"
                                                        value={c.qty}
                                                        min={1}

                                                    />
                                                    <button className='btn btn-primary ms-2'><i className='fas fa-rotate-right'></i></button>
                                                </div>
                                                <h5 className='mb-2'>
                                                    <span className='align-middle'>$101</span>
                                                </h5>
                                                <p className="text-dark">
                                                    <small>Sub Total</small><br />
                                                </p>
                                            </div>
                                        </div>

                                        ))}

                                        {cart.length < 1 && 
                                            <h5>Your Cart Is Empty</h5>
                                        }
                                            {/* Check */}
                                            {/* <Link to='/'> <i className='fas fa-shopping-cart'></i> Continue Shopping</Link> */}

                                    </section>
                                    {cart?.length > 0 && 
                                        <form>
                                            <h5 className="mb-4 mt-4">Contact Information</h5>
                                            {/* 2 column grid layout with text inputs for the first and last names */}
                                            <div className="row mb-4">
                                                <div className="col-lg-12">
                                                    <div className="form-outline">
                                                        <label className="form-label" htmlFor="full_name"> <i className='fas fa-user'></i> Full Name</label>
                                                        <input
                                                            type="text"
                                                            id=""
                                                            name='fullName'
                                                            className="form-control"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row mb-4">
                                                <div className="col-lg-6">
                                                    <div className="form-outline">
                                                        <label className="form-label" htmlFor="form6Example1"><i className='fas fa-envelope'></i> Email</label>
                                                        <input
                                                            type="text"
                                                            id="form6Example1"
                                                            className="form-control"
                                                            name='email'

                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="form-outline">
                                                        <label className="form-label" htmlFor="form6Example1"><i className='fas fa-phone'></i> Mobile</label>
                                                        <input
                                                            type="text"
                                                            id="form6Example1"
                                                            className="form-control"
                                                            name='mobile'
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <h5 className="mb-1 mt-4">Shipping Details</h5>

                                            <div className="row mb-4">
                                                <div className="col-lg-6 mt-3">
                                                    <div className="form-outline">
                                                        <label className="form-label" htmlFor="form6Example1"> Address</label>
                                                        <input
                                                            type="text"
                                                            id="form6Example1"
                                                            className="form-control"
                                                            name='address'
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 mt-3">
                                                    <div className="form-outline">
                                                        <label className="form-label" htmlFor="form6Example1"> City</label>
                                                        <input
                                                            type="text"
                                                            id="form6Example1"
                                                            className="form-control"
                                                            name='city'
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-lg-6 mt-3">
                                                    <div className="form-outline">
                                                        <label className="form-label" htmlFor="form6Example1"> State</label>
                                                        <input
                                                            type="text"
                                                            id="form6Example1"
                                                            className="form-control"
                                                            name='state'
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 mt-3">
                                                    <div className="form-outline">
                                                        <label className="form-label" htmlFor="form6Example1"> Country</label>
                                                        <input
                                                            type="text"
                                                            id="form6Example1"
                                                            className="form-control"
                                                            name='country'
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    }
                                </div>
                                <div className="col-lg-4 mb-4 mb-md-0">
                                    {/* Section: Summary */}
                                    <section className="shadow-4 p-4 rounded-5 mb-4">
                                        <h5 className="mb-3">Cart Summary</h5>
                                        <div className="d-flex justify-content-between mb-3">
                                            <span>Subtotal </span>
                                            <span>Rs.{cartTotal.sub_total?.toFixed(2)}</span>
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <span>Shipping </span>
                                            <span>Rs.{cartTotal.shipping?.toFixed(2)}</span>
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <span>Tax </span>
                                            <span>Rs.{cartTotal.tax?.toFixed(2)}</span>
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <span>Service Fee </span>
                                            <span>Rs.{cartTotal.service_fee?.toFixed(2)}</span>
                                        </div>
                                        <hr className="my-4" />
                                        <div className="d-flex justify-content-between fw-bold mb-5">
                                            <span>Total </span>
                                            <span>Rs.{cartTotal.total?.toFixed(2)}</span>
                                        </div>
                                        <button className="btn btn-primary btn-rounded w-100" >
                                            Proceed to checkout <i className='fas fa-arrow-right'></i>
                                        </button>
                                    </section>

                                    <section className='shadow rounded-3 card p-4 rounded-5'>
                                        <h5 className='mb-4'>Apply promo code</h5>
                                        <div className='d-flex align-items-center'>
                                            <input 
                                                type="text" 
                                                className='form-control rounded me-1' 
                                                placeholder='Promo code'
                                            />
                                            <button type='button' className='btn btn-success btn-rounded overflow-visible'>
                                                Apply
                                            </button>
                                        </div>
                                    </section>
                                </div>
                            </div>
                        </section>
                    </div>
                </main>
            </div>
        </main>
    )
}

export default Cart