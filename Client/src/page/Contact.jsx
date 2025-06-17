import React, { useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const Contact = () => {
    const timeout = useRef(null);
    const his = useHistory();

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
        timeout.current = setTimeout(checkAuth, 1000);
        return function () {
            if (timeout.current) {
                clearTimeout(timeout.current);
            }
        };
    }, []);

    return (
        <>
            <div style={{
                padding: "40px",
                background: "linear-gradient(to right, #A8E6CE, #DCEDC1)", // Green gradient
                color: "#333",
                fontFamily: "Arial, sans-serif",
                textAlign: "center",
                borderRadius: "10px",
                margin: "20px auto",
                maxWidth: "600px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                position: "relative",
                zIndex: 1,
            }}>
                <div style={{
                    backgroundColor: "rgba(255, 255, 255, 0.9)", // White background for contrast
                    padding: "20px",
                    borderRadius: "10px",
                }}>
                    <h2 style={{
                        color: "#388E3C",
                        fontWeight: "bold",
                        marginBottom: "15px",
                    }}>
                        Contact Us
                    </h2>
                    <p style={{
                        fontSize: "18px",
                        lineHeight: "1.6",
                        margin: "10px 0",
                    }}>
                        Please contact our Toll-Free Number <strong style={{ color: "#FF5722" }}>+91 9620585133</strong><br />
                        For any issues faced while using the app, feel free to reach out to us!
                    </p>
                    <p style={{
                        fontSize: "16px",
                        margin: "15px 0",
                    }}>
                        <strong style={{ color: "#FF5722" }}>Hours:</strong><br />
                        Monday to Friday: 9:00 AM - 9:00 PM<br />
                        Saturday: 9:00 AM - 1:00 PM
                    </p>
                </div>
            </div>
        </>
    );
};

export default Contact;
