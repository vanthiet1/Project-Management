const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
{
     email:{
          type:String,
          required:true,
     },
     fullname:{
        type:String,
        required:true,
     },
     password:{
        type:String,
        required:true,
     },
     phoneNumber:{
        type:String,
        required:true,
     },
     statusWorking: {
        type: Boolean,
        default: true,
    },
     status: {
        type: Boolean,
        default: true ,
    },
    roles: {
        type: [String],
        enum: ['admin','employee'],
        default: ['employee'],
    }
},{
    timestamps: true,
}
)
const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;