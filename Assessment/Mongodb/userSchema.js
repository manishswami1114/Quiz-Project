const mongoose=require('mongoose');
const allschema=mongoose.Schema({
    name:{
        type:String,
    },
    age:{
        type:Number,
    },
    gender:{
        type:String,
    },
    password:{
        type:String
    }
})
const newSchema=mongoose.model('students',allschema);
module.exports=newSchema;