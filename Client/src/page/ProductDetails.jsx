import React, { useContext, useEffect, useState, useRef } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import { DataContext } from '../context/DataContext';

const ProductDetails = () => {
   const { id } = useParams();
   const { cart, setCart } = useContext(DataContext);
   const [detdata, setDetdata] = useState([]);
   const [pdetails, setPdetails] = useState("1");
   const timeout = useRef(null);
   const history = useHistory();

   useEffect(() => {
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

       timeout.current = setTimeout(checkAuth, 100);
       return () => {
           if (timeout.current) {
               clearTimeout(timeout.current);
           }
       };
   }, [history]);

   useEffect(() => {
       const getData = async () => {
           const res = await axios.get(`http://localhost:8000/getdata/${id}`);
           setDetdata(res.data);
       };

       getData();
   }, [id]);

   const onSub = (e) => {
       e.preventDefault();
       const data = {
           id: detdata[0].id,
           name: detdata[0].name,
           price: detdata[0].price,
           image: detdata[0].image_url,
           qty: pdetails
       };
       const exist = cart.find((x) => x.id === data.id);
       if (exist) {
           setCart(cart.map((x) => x.id === data.id ? data : x));
       } else {
           setCart([...cart, data]);
       }
   };

   if (!detdata.length) {
       return <h1 style={{ textAlign: 'center', marginTop: '50px' }}>Loading..</h1>;
   }

   return (
       <div style={{
           background: 'linear-gradient(to right, #f0f4c3, #b2ebf2)',
           padding: '20px',
           minHeight: '100vh'
       }}>
           <div className="container">
               <div className="row">
                   <div className="col-md-6 col-12 mx-auto mb-3">
                       <img 
                           src={`/${detdata[0].image_url}`} 
                           alt={detdata[0].image_url} 
                           className="img-fluid p-im" 
                           style={{ borderRadius: '10px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)' }} 
                       />
                   </div>
                   <div className="col-md-6 col-12 mx-auto mb-3 d-flex flex-column mt-5">
                       <h2 style={{ color: '#2e7d32' }}>{detdata[0].name}</h2>
                       <h4>Price: <strong>{detdata[0].price}.00</strong></h4>
                       <p style={{ lineHeight: '1.5', color: '#555' }}>
                           Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab quisquam quae ex maiores possimus nihil eum assumenda asperiores! Autem maxime incidunt voluptatibus quidem quaerat corrupti ex natus sed mollitia modi.
                       </p>
                       <form onSubmit={onSub}>
                           <input type="hidden" value={detdata[0].id} />
                           <div className="form-group w-50">
                               <label htmlFor="sel1">Choose Qty:</label>
                               <select 
                                   className="form-control" 
                                   id="sel1" 
                                   onChange={(e) => setPdetails(e.target.value)} 
                                   required
                                   style={{ borderRadius: '5px', border: '1px solid #ccc', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)' }}
                               >
                                   <option value="1">1</option>
                                   <option value="2">2</option>
                                   <option value="3">3</option>
                                   <option value="4">4</option>
                                   <option value="5">5</option>
                               </select>
                           </div>
                           <div className="text-left">
                               <button 
                                   type="submit" 
                                   className="btn btn-info" 
                                   style={{ backgroundColor: '#00897b', border: 'none', color: '#fff', padding: '10px 20px', borderRadius: '5px' }}
                               >
                                   Add To Cart
                               </button>
                           </div>
                       </form>
                   </div>
               </div>
           </div>
       </div>
   );
};

export default ProductDetails;
