# Mvc_NodeJs_Crud+Angular(frontend)
Node js Restful +angular project MVC design pattern applies to the CRUD model in ExpressJS.

The CRUD (Create, Read, Update, Delete) model defines the actions to be performed on each resource present.

As a first step, we define the Model for our resource using the ODM module Mongoose for MongoDB.

'use strict';

##Example
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    excerpt: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
})

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
The timestamps option defined in the Mongoose documentation allows us to add the createdAt and updatedAt fields of type Date to the document which have a similar purpose to those of Laravel, that is to save the creation and update date of a resource.

At this point we can define the Controller that will handle HTTP requests and views.

'use strict';
const Post = require('../models/post');

class PostController {

}

module.exports = PostController;
For Views we can create a subdirectory in views naming it as our resource but in the plural. In our case we will have views/posts. The name of each view, if required, it will be consistent with that of the controller methods.

Now we can see in detail each of the four verbs that make up the CRUD model.

Create
Create is made up of two distinct HTTP requests:

GET /posts/create: we display the form for creating the resource.
POST /posts: here we create the resource.
Let's define the actions in our controller:

class PostController {
    static create(req, res) {
        res.render('posts/create');
    }
    
    static store(req, res) {
        try {
           const post = new Post(req.body);
           post.save();
           res.status(201).render('posts/create', { post });
        } catch(error) {
           res.status(400).render('errors/400', { error } );
        }
    }
}
Then we can create the routes.

'use strict';

const express = require('express');
const router = express.Router();
const PostController = require('../controllers/PostController');

router.get('/posts/create', PostController.create);
router.post('/posts', PostController.store);

module.exports = router;
Read
Read is made up of two distinct actions:

GET /posts: returns a list of the documents that define a resource.
GET /posts/:id: via the :id identifier, we can return a single resource.
Here we define the controller's methods:

class PostController {
    static async index(req, res) {
            try {
                const posts = await Post.find();
                res.render('posts/index', { posts });
            } catch(error) {
                res.status(500).render('errors/500', { error } );
            }
    }
    
    static async show(req, res) {
        const { id } = req.params;
        try {
                const post = await Post.findById(id);
                res.render('posts/show', { post });
            } catch(error) {
                res.status(404).render('errors/404', { error } );
            }
    }
}
Then our routes:

router.get('/posts', PostController.index);
router.get('/posts/create', PostController.create);
router.get('/posts/:id', PostController.show);
router.post('/posts', PostController.store);
Update
Update is made up of two distinct HTTP requests:

GET /posts/:id/edit: shows the form to update the resource identified by :id.
PUT|PATCH /posts/:id: updates the resource fetched with :id.
Here we can add two more methods to our controller:

class PostController {
    static edit(req, res) {
           const { id } = req.params;
           res.render('posts/edit', { id }); 
        }
    
    static async update(req, res) {
        const { id } = req.params;
        try {
                const post = await Post.findByIdAndUpdate(id, req.body);
                res.render('posts/edit', { post });
            } catch(error) {
                res.status(400).render('errors/400', { error } );
            }
    }
}
Then we can also update our routes:

router.get('/posts', PostController.index);
router.get('/posts/create', PostController.create);
router.get('/posts/:id', PostController.show);
router.get('/posts/:id/edit', PostController.edit);
router.post('/posts', PostController.store);
router.put('/posts/:id', PostController.update);
Delete
Delete will be implemented with the request DELETE /posts/:id and it simply deletes the specified resource identified by :id. In this case a view is not required.

The corresponding controller's method will be as follows:

class PostController {
    static async destroy(req, res) {
           const { id } = req.params;
           try {
              const post = await Post.findOneAndDelete({ _id: id });
              res.send(post);
           } catch(error) {
              res.status(500).send(error);
           }
        }
}       
Our routes now are the following:

router.get('/posts', PostController.index);
router.get('/posts/create', PostController.create);
router.get('/posts/:id', PostController.show);
router.get('/posts/:id/edit', PostController.edit);
router.post('/posts', PostController.store);
router.put('/posts/:id', PostController.update);
router.delete('/posts/:id', PostController.destroy);
Conclusion
The MVC model proves to be very useful in implementing the CRUD model in ExpressJS. By simply changing the type of views used, we can adapt it to different use cases.
