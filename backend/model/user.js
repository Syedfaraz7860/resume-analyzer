import mongoose from "mongoose";
const userSchema= new mongoose.Schema({
    name:{
        type: String,
        required: true

    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
         type: String,
         required: true,
         minlength: 8,
    match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/
    }
},
{
    timestamps:true

});
 export default mongoose.model("user", userSchema);