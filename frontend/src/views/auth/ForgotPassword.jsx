import { useState } from 'react'
import apiInstance from '../../utils/axios';

function ForgotPassword() {
    const [email, setEmail] = useState("")

    const handleSubmit = () => {
        try {
                apiInstance.get(`user/password-reset/${email}/`).then((res) => { // to pass variables in url, use backtick (tilde button on keyboard)
                console.log(res.data); // logging response data
            })
        } catch (error) {
            console.log(error);
        }
    }

    return (
    <div>
        <h1>Forgot Password</h1>
        <input 
            onChange={(e) => setEmail(e.target.value)} 
            type="text" 
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