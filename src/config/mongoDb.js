const mongoose = require('mongoose');

exports.connect = async () => {
  // Configuring the database
  mongoose.Promise = global.Promise;
  // mongoose.set('debug', true);
  // Connecting to the database
  await mongoose.connect(`${process.env.MONGO_URL}`, {
    // auth: {
    //   user: process.env.DB_USER,
    //   password: process.env.DB_PASS,
    // },
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    console.log('Successfully connected to the database');
  }).catch((err) => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
  });
};
