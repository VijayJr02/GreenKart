import React, { useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import '../App.css';
import AllProducts from '../component/AllProducts';
import axios from 'axios';

const Home = () => {
    const timeout = useRef(null);
    const his = useHistory();

    const checkAuth = () => {
        axios.get("http://localhost:8000/isAuth", {
            headers: {
                "x-access-token": localStorage.getItem("Ecomtoken"),
            },
        }).then((response) => {
            if (!response.data.login) {
                his.push("/");
            }
        }).catch((error) => {
            console.error('Error checking authentication:', error);
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

    useEffect(() => {
        const datafet = async () => {
            try {
                const res = await axios.get(`https://open.mapquestapi.com/geocoding/v1/address?key=ccxeu5eQ2pEdTe7UvyQNbbE9XXdeLKdi&street=Hanschara%20M%20D%20High%20School&city=chandipur&state=wb&postalCode=721625`);
                console.log(res.data); // Log the actual response data
            } catch (error) {
                console.error('Error fetching data:', error); // Log the error
            }
        };
        datafet();
    }, []);

    // Click handlers for navigation
    const goToUserPage = () => {
        his.push('/MyAccount'); // Change '/MyAccount' to the correct path for your user page
    };

    const goToProductsPage = () => {
        his.push('/products'); // Change '/products' to the correct path for your products page
    };

    return (
        <>
            <div className="home">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 col-12 mb-3 mx-auto">
                            <h1>Welcome to <span>GreenKart</span></h1>
                            <p>We offer a diverse selection of indoor and outdoor plants to enhance your home and bring nature indoors. Whether you're a plant expert or a beginner, you'll find the perfect greenery in our carefully curated collection. Enjoy convenient online shopping with a focus on quality and sustainability, plus tips and exclusive offers for our community of plant lovers. Let GreenKart help you create your personal oasis—one plant at a time!</p>
                            <button className="btn btn-outline-success" onClick={goToUserPage}>User</button>
                        </div>
                        <div className="col-md-6 col-12 mb-3 mx-auto">
                            <img src="../img/one.svg" alt="home" className="img-fluid main-img" />
                        </div>
                    </div>
                </div>
            </div>
            <AllProducts />
            <div className="desc">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-6 col-12 mx-auto mb-3">
                            <img src="../img/envv.svg" alt="ok" className="img-fluid side-img" />
                        </div>
                        <div className="col-md-6 col-12 mx-auto mb-3 d-flex justify-content-center align-items-center flex-column">
                            <h1>Discover Our <span>Best Products!</span></h1>
                            <p>At GreenKart, we take pride in offering a handpicked selection of our top-selling plants that our customers love. From vibrant houseplants to low-maintenance varieties, each product is chosen for its beauty and ease of care. Elevate your space with our best offerings and find the perfect plant to suit your style and lifestyle!</p>
                            <button className="btn btn-outline-success" onClick={goToProductsPage}>Check Our Products</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
