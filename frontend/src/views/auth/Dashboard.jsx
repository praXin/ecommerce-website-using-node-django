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
            {isLoggedIn() // in the return function 2 lines above, you cannot write conditional statement in if. You have to use {}. Also check below if backtick MUST be used for logout instead of single quotes
                ? <div>
                    <h1>Dashboard</h1>
                    <Link to={`/logout`}>Logout</Link>
                </div>
                : <div>
                    <h1>Home Page</h1>
                    <div className="d-flex">
                        <Link className='btn btn-primary' to={'/register'}>Register</Link> <br/>
                        <Link className='btn btn-success ms-4' to={'/login'}>Login</Link>
                    </div>
                </div>
            }
        </>
    )
}

export default Dashboard