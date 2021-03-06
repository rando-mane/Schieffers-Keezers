const router = require('express').Router();
const pool = require('../utils/db');
const authorization = require('../middleware/authorization');
const validAddress = require('../middleware/validAddress');

// GET NAME
// *****************************************************************************************
router.get('/name', authorization, async (req, res) => {

  // This route is hit when the client request just the first name of the user
  // that is currently logged in.

  try {
    const user_id = req.user_id;

    const response = await pool.query(
      'select first_name from users where user_id = $1', [user_id]);
    
    res.json(response.rows[0].first_name);
    
  } catch (err) {
    console.log(err.message);
    res.status(500).json('Server Error');
  }
})

// ADD CART ITEM
// *****************************************************************************************
router.post('/addCartItem', authorization, async (req, res) => {

  // This route is hit when a client wants to add an item to the cart.
  // It expects the user_id of the user currently logged in, the product_id
  // of the product they are adding and the qty. If the user already has the
  // product in the cart, it will update the qty.

  try {
    const user_id = req.user_id;
    const {product_id, qty} = req.body;
    
    const newCartItem = await pool.query(
      'insert into cart(user_id, product_id, qty) \
       values($1, $2, $3) returning *', [user_id, product_id, qty]
    );
  
    res.json(newCartItem);

  } catch (err) {
    console.log(err.message);
    res.status(500).json('Server Error');
  };
});

// GET USER CART ITEMS
// *****************************************************************************************
router.get('/getUserCart', authorization, async (req, res) => {

  // This route is hit when a client wants all the cart items of the user
  // currently logged in

  try {
    const user_id = req.user_id;

    const userCartItems = await pool.query(
      'select products.name, description, qty, price, images.name as image, cart_item_id\
      from cart \
      join users \
      on cart.user_id = users.user_id \
      join products \
      on cart.product_id = products.product_id \
      join images \
      on products.product_id = images.product_id \
      where users.user_id = $1',
      [user_id]
    );

    res.json(userCartItems.rows);

  } catch (err) {
    console.log(err.message);
    res.status(500).json('Server Error');
  }
})

// DELETE CART ITEM
// *****************************************************************************************
router.delete('/deleteCartItem', authorization, async (req, res) => {

  // This route is hit when the user presses the delete button on an item 
  // in their cart. The request comes with a token that stores thier user_id
  // which is added to the request object by authorization. The request also
  // contains the cart_item_id they want to delete.

  try {
    const {cart_item_id} = req.body;

    const deletedItem = await pool.query(
      'delete from cart \
      where cart_item_id = $1 returning *',
      [cart_item_id]
    )

    res.json(deletedItem);
    
  } catch (err) {
    console.log(err.message);
    res.status(500).json('Server Error');
  }
})

// GET USER ADDRESS
// *****************************************************************************************
router.get('/address', authorization, async (req, res) => {

  // This route is hit when the client request information about the address
  // of the user currently logged in.

  try {
    const user_id = req.user_id;

    const userAddress = await pool.query('select street, city, state, zip from addresses where user_id = $1', [user_id])
    if (userAddress.rows.length === 0) { return res.status(404).json('User has no address on file') }

    res.json(userAddress.rows[0]);
    
  } catch (err) {
    console.log(err.message)
    res.status(500).json('Server Error');
  }
})

// CREATE/UPDATE USER ADDRESS
// *****************************************************************************************
router.post('/update-address', validAddress, authorization, async (req, res) => {

  // This route is hit when the user either doesn't yet have an address stored in the 
  // database and wants to add one, or already has an address and wants to update it
  
  try {
    const user_id = req.user_id
    const {street, city, state, zip} = req.body;
    
    const userAddress = await pool.query('select * from addresses where user_id = $1', [user_id])

    if (userAddress.rows.length === 0) {
      // user does not have an address, create a new record
      const newAddress = await pool.query(
        'insert into addresses(user_id, street, city, state, zip) \
        values($1, $2, $3, $4, $5) \
        returning street, city, state, zip',
        [user_id, street, city, state, zip]
      )
      res.json(newAddress.rows[0]);

    } else {
      // user already has an address, update
      const updatedAddress = await pool.query(
        'update addresses \
        set street = $1, city = $2, state = $3, zip = $4 \
        where user_id = $5 \
        returning street, city, state, zip',
        [street, city, state, zip, user_id]          
      )
      res.json(updatedAddress.rows[0]);
    }
    
  } catch (err) {
    console.log(err.message);
    res.status(500).json('Server Error');
  };
});

module.exports = router;