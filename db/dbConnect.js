const mongoose = require('mongoose');

const connectDB = (uri) => {
  return  mongoose.connect(uri)
}
mongoose.set("strictQuery", false);

module.exports = connectDB