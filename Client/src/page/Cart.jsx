import React, { useContext, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import CartP from '../component/CartP';
import { DataContext } from '../context/DataContext';
import axios from 'axios';

const Cart = () => {
    const { cart } = useContext(DataContext);
    const timeout = useRef(null);
    const history = useHistory();

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
        timeout.current = setTimeout(checkAuth, 100);
        return () => {
            if (timeout.current) {
                clearTimeout(timeout.current);
            }
        };
    }, []);

    return (
        <div style={{
            background: 'linear-gradient(to right, #ffafbd, #ffc3a0)',
            padding: '20px',
            minHeight: '100vh',
            color: '#333'
        }}>
            <div className="container">
                {
                    !cart.length ? (
                        <>
                            <h2 style={{ textAlign: 'center', color: '#d50000' }}>Your Cart is Empty</h2>
                            <div className="text-center">
                                <button 
                                    className="btn btn-primary" 
                                    onClick={() => history.push('/products')}
                                    style={{ marginTop: '20px', backgroundColor: '#ff6f61', border: 'none', color: '#fff' }}
                                >
                                    Continue Shopping
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <h2 style={{ textAlign: 'center', color: '#00796b' }}>Your Cart Items</h2>
                            <br />
                            <div className="row">
                                {
                                    cart.map((val, ind) => (
                                        <CartP
                                            key={ind}
                                            id={val.id}
                                            name={val.name}
                                            price={val.price}
                                            plant_image={val.image}
                                            qty={val.qty}
                                        />
                                    ))
                                }
                            </div>
                            <div className="row m-5">
                                <div className="col-12">
                                    <div className="text-right">
                                        <button 
                                            className="btn btn-success" 
                                            onClick={() => history.push("/payment")}
                                            style={{ backgroundColor: '#ff6f61', border: 'none', color: '#fff' }}
                                        >
                                            Check Out
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                }
            </div>
        </div>
    );
};

export default Cart;
