const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AuthSchema = require("../models/auth");

const secret = "test";

const authLogin = async (req, res) => {
    const { email, password } = req.body;
  try {
     // Check User exists or not
     const checkUserData = await AuthSchema.findOne({ email: email });
     console.log('checkUserData',checkUserData);

     if (!checkUserData) {
       return res.status(404).json({ message: "User Not exists" });
     }
 
     // Compare hash-password and normal password
     const isPasswordCorrect = await bcrypt.compare(password, checkUserData.password);
     if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });
 
     // Create token
     const token = await jwt.sign({ email: checkUserData.email, id: checkUserData._id }, secret, { expiresIn: "1h" });

     // Send Data in response
     const saveUserData = {
       result: checkUserData,
       token: token,
     };
     res.status(201).json(saveUserData);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const authSignup = async (req, res) => {
  const { email, password, firstname, lastname } = req.body;
  try {

    // Check Already Register or Not
    const checkRegistration = await AuthSchema.findOne({ email: email });

    if (checkRegistration) {
      return res.status(400).json({ message: "User Already Register" });
    }

    // Convert password to bcrypt hash
    const hashpassword = await bcrypt.hash(password, 12);

    // Create User and store in database
    const saveUser = await AuthSchema.create({
      email: email,
      password: hashpassword,
      firstname: firstname,
      lastname: lastname,
    });

    // Create Token
    const token = await jwt.sign(
      { email: saveUser.email, id: saveUser._id },
      secret,
      { expiresIn: "1h" }
    );

    // Send Data in response
    const saveUserData = {
      result: saveUser,
      token: token,
    };
    res.status(201).json(saveUserData);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
    
    console.log(error);
  }
};

module.exports = {
  authLogin,
  authSignup,
};
