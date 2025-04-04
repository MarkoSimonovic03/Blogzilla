import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import useFetchGet from '../hooks/useFetchGet';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [warning, setWarning] = useState(false);
    const [users, setUsers] = useState(null);
    const navigate = useNavigate();
    
    useEffect(() => {
        const curUser = JSON.parse(localStorage.getItem("currentUser"));
        if(curUser){
            navigate('/');
        }
       
        loadUsers();
    }, [])

    // Loads users from the API and updates the state.
    const loadUsers = async () =>{
        const data = await useFetchGet('/users');
        if(data){
            setUsers(data);
        }
    }

    // Handles user login: checks username and password, stores user in localStorage, and navigates to the homepage.
    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = users.find(u => u.username === username && u.password === password);
        
        if (user) {     
            localStorage.setItem("currentUser", JSON.stringify(user));
            navigate('/');
            window.location.reload();
        }
        else {
            setWarning(true);
        }
    }

    return (
        <section>
            <div className="container p-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <h2 className="text-center mb-4 fw-bold">Login</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">
                                    Username
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="username"
                                    value={username}
                                    onChange={e => setUsername(e.target.value)}
                                    placeholder="Enter your username"
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    required
                                />
                            </div>

                            {warning && <p className='text-danger fw-bold'>*Invalid credentials</p>}

                            <button type="submit" className="btn btn-primary w-100">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login