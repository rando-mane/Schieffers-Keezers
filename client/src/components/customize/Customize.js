import React, {useState, useEffect} from 'react';
import '../../App.css';
import ProductCard from './customize-components/ProductCard';

const BASE_URL = 'http://localhost:3001';

const Customize = () => {

  // state variables used for holding data on each product, seperated by category

  const [freezers, setFreezers] = useState([]);
  const [tapkits, setTapKits] = useState([]);
  const [thermostats, setThermostats] = useState([]);
  const [c02Tanks, setC02Tanks] = useState([]);

  // functions for querying the db for data on products of each category

  const getFreezers = async () => {
    const response = await fetch(BASE_URL + '/product/freezer');
    const parseRes = await response.json();
    setFreezers(parseRes);
  }
  useEffect(() => { getFreezers(); },[]);

  const getThermostats = async () => {
    const response = await fetch(BASE_URL + '/product/thermostat');
    const parseRes = await response.json();
    setThermostats(parseRes);
  }
  useEffect(() => { getThermostats(); },[]);

  const getTapKits = async () => {
    const response = await fetch(BASE_URL + '/product/tapkit');
    const parseRes = await response.json();
    setTapKits(parseRes);
  }
  useEffect(() => { getTapKits(); },[]);

  const getC02Tanks = async () => {
    const response = await fetch(BASE_URL + '/product/c02tank');
    const parseRes = await response.json();
    setC02Tanks(parseRes);
  }
  useEffect(() => { getC02Tanks(); },[]);

  // onSubmit functions for adding products of each category to cart

  const submitFreezer = async (e) => {
    e.preventDefault();
    const product_id = e.target.freezer.value;
    if (product_id === '') {
      alert('You have to choose a freezer.');
    } 
    else {
      try {
        const body = {product_id: product_id, qty: 1}
        
        const response = await fetch(BASE_URL + '/user/addCartItem', {
                                     method: 'POST',
                                     headers: {token: localStorage.token,
                                               'Content-type': 'application/json'},
                                     body: JSON.stringify(body)
        })
        if (!response.ok) {
          if (response.status === 403) {
            alert('You must be logged in');
          } else if (response.status === 500) {
            alert('There was a problem adding product to cart');
          }
        } else {
          alert('Product was successfully added to cart');
        } 
      } catch (err) {
        console.log(err.message);
      }
    }
  }

  const submitTapkit = async (e) => {
    e.preventDefault();
    const product_id = e.target.tapkit.value;
    if (product_id === '') {
      alert('You have to choose a freezer.');
    } 
    else {
      try {
        const body = {product_id: product_id, qty: 1}
        
        const response = await fetch(BASE_URL + '/user/addCartItem', {
                                     method: 'POST',
                                     headers: {token: localStorage.token,
                                               'Content-type': 'application/json'},
                                     body: JSON.stringify(body)
        })
        if (!response.ok) {
          if (response.status === 403) {
            alert('You must be logged in');
          } else if (response.status === 500) {
            alert('There was a problem adding product to cart');
          }
        } else {
          alert('Product was successfully added to cart');
        } 
      } catch (err) {
        console.log(err.message);
      }
    }
  }

  const submitThermostat = async (e) => {
    e.preventDefault();
    const product_id = e.target.thermostat.value;
    if (product_id === '') {
      alert('You have to choose a freezer.');
    } 
    else {
      try {
        const body = {product_id: product_id, qty: 1}
        
        const response = await fetch(BASE_URL + '/user/addCartItem', {
                                     method: 'POST',
                                     headers: {token: localStorage.token,
                                               'Content-type': 'application/json'},
                                     body: JSON.stringify(body)
        })
        if (!response.ok) {
          if (response.status === 403) {
            alert('You must be logged in');
          } else if (response.status === 500) {
            alert('There was a problem adding product to cart');
          }
        } else {
          alert('Product was successfully added to cart');
        } 
      } catch (err) {
        console.log(err.message);
      }
    }
  }
  
  const submitC02Tank = async (e) => {
    e.preventDefault();
    const product_id = e.target.c02tank.value;
    if (product_id === '') {
      alert('You have to choose a freezer.');
    } 
    else {
      try {
        const body = {product_id: product_id, qty: 1}
        
        const response = await fetch(BASE_URL + '/user/addCartItem', {
                                     method: 'POST',
                                     headers: {token: localStorage.token,
                                               'Content-type': 'application/json'},
                                     body: JSON.stringify(body)
        })
        if (!response.ok) {
          if (response.status === 403) {
            alert('You must be logged in');
          } else if (response.status === 500) {
            alert('There was a problem adding product to cart');
          }
        } else {
          alert('Product was successfully added to cart');
        } 
      } catch (err) {
        console.log(err.message);
      }
    }
  }

  return <>
    <h1>Customize Your Keezer</h1>

    <form onSubmit={submitFreezer} className='p-5'>
      <h2>Choose Your Freezer</h2>
      <div className='d-flex flex-wrap'>
        {freezers.map(freezer => {return <ProductCard {...freezer}/>})}
      </div>
      <button type='submit' className='cart-button'>Add To Cart</button>
    </form>

    <form onSubmit={submitTapkit} className='p-5'>
      <h2>Choose Your Tap Kit</h2>
      <div className='d-flex flex-wrap'>
        {tapkits.map(tapkit => {return <ProductCard {...tapkit}/>})}
      </div>
      <button type='submit' className='cart-button'>Add To Cart</button>
    </form>

    <form onSubmit={submitThermostat} className='p-5'>
      <h2>Choose Your Thermostat</h2>
      <div className='d-flex flex-wrap'>
        {thermostats.map(thermostat => {return <ProductCard {...thermostat}/>})}
      </div>
      <button type='submit' className='cart-button'>Add To Cart</button>
    </form>

    <form onSubmit={submitC02Tank} className='p-5'>
      <h2>Choose Your C02 Tank</h2>
      <div className='d-flex flex-wrap'>
        {c02Tanks.map(c02Tank => {return <ProductCard {...c02Tank}/>})}
      </div>
      <button type='submit' className='cart-button'>Add To Cart</button>
    </form>
  </>
}

export default Customize;