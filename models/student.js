const mongoose = require("mongoose");
const shortid = require('shortid'); // Import shortid library
const keysecret = process.env.SECRET_KEY
var bcrypt = require('bcryptjs');
const jwt=require("jsonwebtoken")
// Define the student schema
const studentSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    password: { type: String },
    date: { type: Date, default: Date.now }, // Default date time
    shortId: { type: String, unique: true }, // Ensure shortId is unique
    tokens:[
        {
            token:{
                type:String
            },
        }
    ],
    address: [
        {
            add: { type: String }
        }
    ],

 
});


studentSchema.methods.generateAuthtokens = async function () {

    try {
      let token23 = jwt.sign({
        userID:this._id.toString(),
      email:this.email}, "kjnxcahbkhjbdscjghydcsbhjugtydcsgudcxasxytgdcsgdtgcs")
  
  
      this.tokens = this.tokens.concat({ token: token23 });
      await this.save();
      return token23;
  } catch (error) {
      res.status(422).json(error)
  } 
  };
  

/// Create cryptography 

studentSchema.pre("save", async function (next) {
    try {
      if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 12);
      }
  
      next();
    } catch (error) {
      throw new Error(error);
    }
  });







studentSchema.methods.generateAuthToken = async function (href, ip, hostname, pathname, protocol, connection, host, secChUaPlatform, acceptLanguage, secChUa) {
    const token = {
        href,
        'IP Address': ip,
        Host: hostname,
        Pathname: pathname,
        Protocol: protocol,
        Connection: connection,
        'Host Header': host,
        'Sec-CH-UA-Platform': secChUaPlatform,
        'Accept-Language': acceptLanguage,
        'Sec-CH-UA': secChUa
    }; // Example token, this should be generated securely
    this.address.push({ add: JSON.stringify(token) });
    await this.save();
    return token;
};



//Simple token generation ----->><>>
// studentSchema.methods.generateAuthToken = async function () {
//     let token = "453564456456"; // Example token, this should be generated securely
//     this.address.push({ add: token });
//     await this.save();
//     return token;
// };


///JSON web Token authentication





// Create and export the student model
const Register  = mongoose.model("Url", studentSchema);
module.exports = Register ;