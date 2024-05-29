const mongoose = require('mongoose');

const ProjectSchema = mongoose.Schema(
{
     nameProject:{
          type:String,
          required:true,
     },
     dayStart:{
        type:Date,
        required:true,
     },
     sizeTeam:{
        type:Number,
        required:true,
     },
   
   teamProject:[
        { 
           type: mongoose.Schema.Types.ObjectId, 
           ref: 'User' 
       }
     ],
     statusProject: {
        type: Boolean,
        default: true,
    },
},{
    timestamps: true,
}
)
const ProjectModel = mongoose.model('Project', ProjectSchema);

module.exports = ProjectModel;