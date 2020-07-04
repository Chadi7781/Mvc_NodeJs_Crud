const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const user_controller = require('../Controller/user.controller');


// a simple test url to check that all of our files are communicating correctly.
router.get('/test', user_controller.test);

//add user
router.post('/create',user_controller.user_create);

//get user by id
router.get('/byid/:id', user_controller.user_detail);

//update user
router.put('/update/:id', user_controller.user_update);

//delete user
router.delete('/delete/:id', user_controller.user_delete);




module.exports = router;

