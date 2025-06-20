import React, { useEffect, useState } from 'react';
import CardProducts from './CardProducts';
import axios from 'axios';

const AllProducts = () => {
    const [getdata, setGetdata] = useState([]);

    const getData = async () => {
        const res = await axios.get('http://localhost:8000/getdata');
        setGetdata(res.data);
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <div className="products">
                <div className="container">
                    <h2 className="text-center font-weight-bold mb-5">Best Products</h2>
                    <div className="row">
                        {
                            getdata.slice(0, 3).map((val, ind) => (
                                <CardProducts
                                    key={ind}
                                    id={val.id}
                                    name={val.name}
                                    price={val.price}
                                    plant_image={val.image_url}
                                />
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default AllProducts;
