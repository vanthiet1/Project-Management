const mongoose = require('mongoose');
require('dotenv').config()
const connectMongo = async ()=>{
  try {
   await mongoose.connect(process.env.URL_DATA);
   console.log('kết nối thành công');
  } catch (error) {
       console.log('kết nối thất bại');
  }
}
module.exports = connectMongo