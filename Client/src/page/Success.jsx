import React, { useEffect, useRef } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';

const Success = () => {
    const his = useHistory();
    const loc = useLocation();
    const pid = localStorage.getItem('Ecomlongid');

    useEffect(() => {
        const paydet = async () => {
            const str = loc.search;
            const myArr = str.split("=");
            const pyid = myArr[myArr.length - 1];
            const data = {
                pid: pid,
                pyid: pyid
            };
            const res = await axios.post(`http://localhost:8000/paydetails`, data);
            console.log(res);
        };
        paydet();
    }, [loc.search, pid]);

    const timeout = useRef(null);
    const checkAuth = () => {
        axios.get("http://localhost:8000/isAuth", {
            headers: {
                "x-access-token": localStorage.getItem("Ecomtoken")
            }
        }).then((response) => {
            if (!response.data.login) {
                his.push("/");
            }
        });
    };

    useEffect(() => {
        timeout.current = setTimeout(checkAuth, 10);
        return function () {
            if (timeout.current) {
                clearTimeout(timeout.current);
            }
        };
    }, []);

    // Inline styles
    const styles = {
        container: {
            padding: '5rem',
            background: 'linear-gradient(to right, #4facfe, #00f2fe)', // Gradient background
            minHeight: '100vh', // Full viewport height
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        text: {
            textAlign: 'center',
            background: 'rgba(255, 255, 255, 0.8)', // Slightly transparent background
            borderRadius: '10px', // Rounded corners
            padding: '2rem', // Padding for the text container
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)', // Subtle shadow
        },
        button: {
            marginTop: '1rem',
            padding: '0.5rem 1.5rem',
            backgroundColor: '#007bff', // Bootstrap's primary color
            border: 'none',
            borderRadius: '5px',
            color: 'white',
            cursor: 'pointer',
        },
        buttonHover: {
            backgroundColor: '#0056b3', // Darker blue on hover
        },
    };

    return (
        <div style={styles.container}>
            <div style={styles.text}>
                <h2>Thank You for Buying This</h2>
                <button 
                    style={styles.button} 
                    onClick={() => his.push('/products')}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.button.backgroundColor}
                >
                    Continue Shopping
                </button>
            </div>
        </div>
    );
};

export default Success;
