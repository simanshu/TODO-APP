// // config.js

// const mongoose = require('mongoose');

// const MONGODB_URI = 'mongodb://127.0.0.1:27017/contactlist'; // Replace with your MongoDB connection URI

// mongoose.connect(MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false,
// })
//   .then(() => console.log('Connected to MongoDB'))
//   .catch(err => console.error('Error connecting to MongoDB:', err));


const mongoose=require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/contactlist');

const db =mongoose.connection;

db.on('error',console.error.bind(console,'error on connecting db'));

db.once('open',function(){
    console.log('successfull connect to database');
});
