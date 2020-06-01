const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');


const app = express();
const PORT = process.env.PORT || 8080;

const routes = require('./routes/api');

const MONGODB_URI = "mongodb+srv://sanish:sanishcha000!@youtubedb-hlkua.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect( MONGODB_URI || ' mongodb://localhost/mern_youtube ' , {
    useNewUrlParser: true,
    useUnifiedTopology: true
 } );

 mongoose.connection.on('connected' , () => {
     console.log('Mongoose is connected');
 });

 app.use(express.json());
 app.use(express.urlencoded({
     extended : false 
 }));

 app.use(cors());
//http request logger
app.use(morgan('tiny'));
app.use('/api' ,routes);

if(process.env.NODE_ENV === "production" ){
    app.use(express.static('client/build'));

}

//Routes
app.listen(PORT, console.log(`listening at port ${PORT}`));



