const mongoose = require('mongoose');

const connectToMongo = (url)=>{
    mongoose.connect(url, {
        useNewUrlParser: true
    }, ()=>{
        console.log('connected successfully');
    });

}

module.exports = connectToMongo;