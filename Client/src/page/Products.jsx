import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import CardProducts from '../component/CardProducts';
import { useHistory } from 'react-router-dom';

const Products = () => {
    const [getdata, setGetdata] = useState([]);
    const [loading, setLoading] = useState(true);
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
        return () => {
            if (timeout.current) {
                clearTimeout(timeout.current);
            }
        };
    }, []);

    const getData = async () => {
        try {
            const res = await axios.get('http://localhost:8000/getdataall');
            setGetdata(res.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const sortData = async (sort) => {
        try {
            const res = await axios.get(`http://localhost:8000/sort/${sort}`);
            setGetdata(res.data);
        } catch (error) {
            console.error("Error sorting data:", error);
        }
    };

    const sortHandel = (e) => {
        const sort = e.target.value;
        if (sort === 'all') {
            getData();
        } else {
            sortData(sort);
        }
    };

    if (loading) {
        return <h1 style={{ textAlign: 'center', marginTop: '50px' }}>Loading..</h1>;
    }

    if (!getdata.length) {
        return <h1 style={{ textAlign: 'center', marginTop: '50px' }}>No products available.</h1>;
    }

    return (
        <div style={{
            padding: '20px',
            background: 'linear-gradient(to right, #e0f7fa, #80deea)',
            minHeight: '100vh'
        }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)' }}>
                <h2 style={{ textAlign: 'center', fontWeight: 'bold', marginBottom: '30px', color: '#004d40' }}>Best Products</h2>
                <div style={{ marginBottom: '20px', textAlign: 'center' }}>
                    <select 
                        style={{
                            padding: '10px',
                            fontSize: '16px',
                            borderRadius: '5px',
                            border: '1px solid #ccc',
                            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)'
                        }} 
                        onChange={sortHandel}
                    >
                        <option value="all">All</option>
                        <option value="200">Less than 200</option>
                        <option value="200_500">200-500</option>
                        <option value="500_1000">500-1000</option>
                    </select>
                </div>
                <div className="row" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                    {getdata.map((val, ind) => (
                        <CardProducts
                            key={ind}
                            id={val.id}
                            name={val.name}
                            price={val.price}
                            plant_image={val.image_url}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Products;
