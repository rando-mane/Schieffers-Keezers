import React from 'react';
import '../../../App.css';
import Card from 'react-bootstrap/Card';

const ProductCard = (props) => {

  // The ProductCard component takes in values for image, name,
  // description, and price. This component is generated by
  // mapping the products array to the makeProductCard function
  // which returns a custom ProductCard for each product.

  return <>
  <div className='p-4'>
    <Card style={{ width: '18rem' }} className='p-4 product-card'>
      <div className='card-img'><Card.Img variant="top" src={`images/${props.image}`}/></div>
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Text>{props.description}</Card.Text>
        <Card.Text className='mba'>${props.price}</Card.Text>
        <input
          type='radio'
          value={props.product_id}
          name={props.type}
        />

      </Card.Body>
    </Card>
  </div>
  </>
};

export default ProductCard;