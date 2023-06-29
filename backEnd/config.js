require('dotenv').config(); // Load environment variables from .env file

mongodbURI =  process.env.MONGODB_CONNECTION_URL;
console.log(mongodbURI);
module.exports = {mongodbURI};
