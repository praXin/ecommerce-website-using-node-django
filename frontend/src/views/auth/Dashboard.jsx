import React from 'react'
import { useAuthStore } from '../../store/auth'
import { Link } from 'react-router-dom'

function Dashboard() {
    const [isLoggedIn, setIsLoggedIn] = useAuthStore((state) => [
        state.isLoggedIn,
        state.user
    ])

    return (
        <>
            {isLoggedIn() // in return function 2 lines above, you cannot write conditional statement in if. You have to use {}
                ? <div>
                    <h1>Dashboard</h1>
                    <Link to={`/logout`}>Logout</Link>
                </div>
                : <div>
                    <h1>Home Page</h1>
                    <Link to={'/register'}>Register</Link> <br/>
                    <Link to={'/login'}>Login</Link>
                </div>
            }
        </>
    )
}

export default Dashboard