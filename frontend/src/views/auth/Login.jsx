import React, { useState, useEffect } from 'react'
import { login } from '../../utils/auth'
import { useNavigate, Link } from 'react-router-dom'
import { useAuthStore } from '../../store/auth'

function Login() {
    const [email, setEmail] = useState("") // useState always returns 2 variables
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn)

    console.log(email);
    console.log(password);
    useEffect(() => {
        if(isLoggedIn()){
            navigate('/')
        }
    })

    const resetForm = () => {
        setEmail("")
        setPassword("")
    }

    const handleLogin = (e) => {
        e.preventDefault()
        setIsLoading(true)

        const { error } = login(email, password)
        if(error) {
            alert(error)
        } else {
            navigate("/")
            resetForm()
        }
        setIsLoading(false)
    }

  

    // const navigate = useNavigate()
    return (
    <div>
        <h2>Welcome back</h2>
        <p>Login to continue</p>
        <form onSubmit={handleLogin}>
            <input 
                type="text" 
                name="email" 
                id="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)} // so whatever you type in input is getting typed and visible on the screen
            />
            <br />
            <br />
            <input 
                type="password" 
                name="password" 
                id="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)} // so whatever you type in input is getting typed and visible on the screen
            />
            <br />
            <br />

            <button type='submit'>Login</button>
            <hr />
            <Link to={'/forgot-password'}>Forgot Password?</Link>
        </form>
    </div>
    )
}

export default Login