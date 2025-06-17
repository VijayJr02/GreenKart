import React, { useEffect, useState, useRef } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import axios from 'axios';

const MyAccount = () => {
    const [order, setOrder] = useState([]);
    const userdatast = localStorage.getItem('EcomUser');
    const timeout = useRef(null);
    const history = useHistory();

    const logout = () => {
        localStorage.removeItem("Ecomtoken");
        localStorage.removeItem("Ecomlongid");
        localStorage.removeItem("EcomEmail");
        localStorage.removeItem("EcomUser");
        localStorage.removeItem("Ecompaymentmode");
        localStorage.removeItem("EcomUserId");
        window.location.reload();
    };

    const checkAuth = () => {
        axios.get("http://localhost:8000/isAuth", {
            headers: {
                "x-access-token": localStorage.getItem("Ecomtoken")
            }
        }).then((response) => {
            if (!response.data.login) {
                history.push("/");
            }
        });
    };

    useEffect(() => {
        timeout.current = setTimeout(checkAuth, 1000);
        return () => {
            if (timeout.current) {
                clearTimeout(timeout.current);
            }
        };
    }, []);

    const getOrderDetails = async (id) => {
        const res = await axios.get(`http://localhost:8000/account/${id}`);
        setOrder(res.data);
    };

    useEffect(() => {
        const dat = localStorage.getItem('EcomUserId');
        getOrderDetails(dat);
    }, []);

    if (!order.length) {
        return (
            <div style={{
                background: 'linear-gradient(to right, #67b26f, #4ca2cd)',
                padding: '40px',
                minHeight: '100vh',
                color: '#fff',
                textAlign: 'center'
            }}>
                <button className="btn btn-success ml-1 mr-1" disabled>Welcome {userdatast}</button>
                <button className="btn btn-warning ml-1 mr-1" onClick={logout}>Log Out</button>
                <br /><br />
                <h2>You Have Not Yet Placed Any Order</h2>
                <button 
                    className="btn btn-info" 
                    onClick={() => history.push('/products')}
                    style={{ marginTop: '20px', backgroundColor: '#ff6f61', border: 'none', color: '#fff' }}
                >
                    Continue Shopping
                </button>
            </div>
        );
    }

    return (
        <div style={{
            background: 'linear-gradient(to right, #ffafbd, #ffc3a0)',
            padding: '40px',
            minHeight: '100vh',
            color: '#333'
        }}>
            <div className="container">
                <button className="btn btn-success ml-1 mr-1" disabled>Welcome {userdatast}</button>
                <button className="btn btn-warning ml-1 mr-1" onClick={logout}>Log Out</button>
                <br /><br />
                <div className="row">
                    <div className="table-responsive">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Order Date</th>
                                    <th>Payment Method</th>
                                    <th>Order Status</th>
                                    <th>Amount</th>
                                    <th>Operation</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    order.map((val, ind) => (
                                        <tr key={ind}>
                                            <td>{ind + 1}</td>
                                            <td>{new Date(val.timestamp).toLocaleDateString()}</td> {/* Updated Date Formatting */}
                                            <td>{val.paymentmode}</td>
                                            <td>{val.orderstatus}</td>
                                            <td>{val.totalprice}</td>
                                            <td>
                                                <NavLink to={`/myorder/${val.id}`} className="btn btn-info">View</NavLink>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyAccount;
