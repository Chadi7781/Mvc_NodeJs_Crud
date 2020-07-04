
var mongoose =require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name :{
      type:String,
      required:true
    },
    lastName : {
      type:String,
      required: true
    },
    password: {
      type:String,
      required:true
    },
   phone: {
     type: String,
     required: true
   }

});

 module.exports = mongoose.model('user',userSchema);

