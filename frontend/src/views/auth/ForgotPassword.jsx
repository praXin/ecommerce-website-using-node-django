import { useState } from 'react'
import apiInstance from '../../utils/axios';
import { useNavigate } from 'react-router-dom';

function ForgotPassword() {
    const [email, setEmail] = useState("")

    const navigate = useNavigate()

    const handleSubmit = async () => {
        try {
                await apiInstance.get(`user/password-reset/${email}/`).then((res) => { // to pass variables in url, use backtick (tilde button on keyboard)
                    alert("An email has been sent to you.")
                    // navigate("/create-new-password")
                    // console.log(res.data); // logging response data
            })
        } catch (error) {
            alert("Email does not exist.")
            // console.log(error);
        }
    }

    return (
    <div>
        <h1>Forgot Password</h1>
        <input 
            onChange={(e) => setEmail(e.target.value)} 
            type="email" 
            placeholder='Enter Email' 
            name='' 
            id='' 
        />
        <br />
        <br />
        <button onClick={handleSubmit}>Reset Password</button>
    </div>
    )
}

export default ForgotPassword