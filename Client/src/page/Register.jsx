import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState(false);
    const [msg, setMsg] = useState("");
    const timeout = useRef(null);
    const his = useHistory();

    const checkAuth = () => {
        axios.get("http://localhost:8000/isAuth", {
            headers: {
                "x-access-token": localStorage.getItem("Ecomtoken")
            }
        }).then((response) => {
            if (response.data.login) {
                his.push("/home");
            }
        });
    };

    useEffect(() => {
        timeout.current = setTimeout(checkAuth, 1000);
        return function () {
            if (timeout.current) {
                clearTimeout(timeout.current);
            }
        };
    }, []);

    const onSub = async (e) => {
        e.preventDefault();
        const data = {
            username: username,
            email: email,
            password: password
        };
        const res = await axios.post("http://localhost:8000/register", data);
        if (res.data.msg) {
            setStatus(true);
            setMsg(res.data.msg);
        } else {
            his.push("/");
        }
    };

    return (
        <>
            <div style={{
                minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'linear-gradient(135deg, #36D1DC, #5B86E5)'
            }}>
                <div style={{
                    backgroundColor: 'white', padding: '40px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    maxWidth: '400px', width: '100%'
                }}>
                    {status && (
                        <div style={{
                            backgroundColor: '#d9534f', color: 'white', padding: '10px', borderRadius: '5px',
                            display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px'
                        }}>
                            <p style={{ margin: 0 }}>{msg}</p>
                            <button onClick={() => setStatus(false)} style={{
                                background: 'none', border: 'none', color: 'white', fontWeight: 'bold', cursor: 'pointer'
                            }}>&times;</button>
                        </div>
                    )}
                    <h2 style={{
                        textAlign: 'center', color: '#36D1DC', marginBottom: '30px', fontWeight: 'bold'
                    }}>Register Now</h2>
                    <form onSubmit={onSub}>
                        <div style={{ marginBottom: '15px' }}>
                            <input type="text" placeholder="Enter Username" value={username} onChange={(e) => setUserName(e.target.value)} required
                                style={{
                                    width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '5px',
                                    fontSize: '16px', outline: 'none', boxSizing: 'border-box'
                                }}
                            />
                        </div>
                        <div style={{ marginBottom: '15px' }}>
                            <input type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} required
                                style={{
                                    width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '5px',
                                    fontSize: '16px', outline: 'none', boxSizing: 'border-box'
                                }}
                            />
                        </div>
                        <div style={{ marginBottom: '15px' }}>
                            <input type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} required
                                style={{
                                    width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '5px',
                                    fontSize: '16px', outline: 'none', boxSizing: 'border-box'
                                }}
                            />
                        </div>
                        <button type="submit" style={{
                            width: '100%', padding: '12px', backgroundColor: '#36D1DC', color: 'white', border: 'none',
                            borderRadius: '5px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', transition: 'background 0.3s ease'
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#5B86E5'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = '#36D1DC'}
                        >Register</button>
                    </form>
                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
                        <NavLink to="/" style={{ color: '#36D1DC', textDecoration: 'none', fontWeight: 'bold' }}>
                            Login Now
                        </NavLink>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;
