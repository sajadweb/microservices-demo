const mongoose = require('mongoose');
//mongodev
mongoose.connect(process.env.MONGO_URI, { 
    // useNewUrlParser: true,
    // useFindAndModify: false,
    // useCreateIndex: true,
    // MONGO_URI = mongodb://localhost:27017/DB_NAME
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => {
    console.log('Connection successfull!');
}).catch((e) => {
    console.log('Connection failed!',e);
})