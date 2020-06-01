
const express = require('express');
const router = express.Router();

const BlogPost = require('../models/blogPost');

//Routes
router.get('/' ,( req , res ) => {
    
    BlogPost.find({})
    .then((data)=> {
        console.log('Data',data);
        res.json(data);

    })
    .catch((error)=> {
        console.log('error',error);

    })
    
});

router.get('/name' ,( req , res ) => {
    const data ={
        username:"sanish maharjan",
        age: 21
    };
    res.json(data);
});


//for post request
router.post('/save' ,( req , res ) => {
    // console.log('Body:',req.body);
    const data = req.body;
    const newBlogPost = new BlogPost(data);
    //save
    newBlogPost.save((error) => {
        if(error)
        {
            res.status(500).json({ msg: 'sorry,internal server error'});
            return;
        }//Blogpost
        res.json({
            msg:"we recieved your data"
        });

    });

    });

module.exports =router;