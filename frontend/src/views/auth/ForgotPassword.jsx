import { useState } from 'react'
import apiInstance from '../../utils/axios';
import { useNavigate, Link } from 'react-router-dom';

function ForgotPassword() {
    const [email, setEmail] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()

    const handleSubmit = async () => {
        setIsLoading(true)
        try {
                await apiInstance.get(`user/password-reset/${email}/`).then((res) => { // to pass variables in url, use backtick (tilde button on keyboard)
                    alert("An email has been sent to you.")
                    setIsLoading(false)
                    // navigate("/create-new-password")
                    // console.log(res.data); // logging response data
            })
        } catch (error) {
            alert("Email does not exist.")
            setIsLoading(false)
            // console.log(error);
        }
    }

    return (
        <section>
            <main className="" style={{ marginBottom: 100, marginTop: 50 }}>
                <div className="container">
                    {/* Section: Login form */}
                    <section className="">
                        <div className="row d-flex justify-content-center">
                            <div className="col-xl-5 col-md-8">
                                <div className="card rounded-5">
                                    <div className="card-body p-4">
                                        <h3 className="text-center">Forgot Password</h3>
                                        <br />

                                        <div className="tab-content">
                                            <div
                                                className="tab-pane fade show active"
                                                id="pills-login"
                                                role="tabpanel"
                                                aria-labelledby="tab-login"
                                            >
                                                <div>
                                                    {/* Email input */}
                                                    <div className="form-outline mb-4">
                                                        <label className="form-label" htmlFor="loginName">
                                                            Email Address
                                                        </label>
                                                        <input
                                                            type="email"
                                                            id="loginName"
                                                            name="email"
                                                            value={email}
                                                            className="form-control"
                                                            onChange={(e) => setEmail(e.target.value)}
                                                        />
                                                    </div>

                                                    {isLoading === true
                                                        ? <button disabled className='btn btn-primary btn-rounded w-100 mb-4'>
                                                            Processing...
                                                        </button>

                                                        : <button onClick={handleSubmit} type='button' className='btn btn-primary btn-rounded w-100 mb-4'>
                                                            Send Email <i className='fas fa-paper-plane' />
                                                        </button>

                                                    }

                                                    {/* Sign-in button */}
                                                    <div className="text-center">
                                                        <p>
                                                            Want to sign in? <Link to="/login">Login</Link>
                                                        </p>
                                                        {/* <button onClick={handleEmailSubmit} className='btn btn-primary w-100'>Reset Password</button> */}
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </section>
    )
}

export default ForgotPassword