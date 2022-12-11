const mongoose = require('mongoose')

const connectDB = (url) => {
    try {
        mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000
        })
        console.log('Connected to database ' + url);
    } catch(err) {
            console.log('Error connecting to database ' + url);
            console.log(err.reason);    
            process.exit(1);
    }
}

module.exports = connectDB;
