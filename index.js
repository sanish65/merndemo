const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');


const app = express();

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


if (process.env.NODE_ENV === "production") {
    //set A static folder
    app.use(express.static("client/build"));
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
  }

//Routes
const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`listening at port ${PORT}`));



