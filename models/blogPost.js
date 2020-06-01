const mongoose = require('mongoose');



//building the database schema
const Schema = mongoose.Schema;
const BlogPostSchema = new Schema({
    title: String,
    body: String,
    date:{
        type: String,
        default: Date.now()
    }
});

//Model
const BlogPost = mongoose.model('BlogPost' , BlogPostSchema ); 

//saving data to database
const data= {
    title: 'welcome hello',
    body: 'this is th e body i ma passing',

}

const newBlogPost = new BlogPost(data);

module.exports = BlogPost;
