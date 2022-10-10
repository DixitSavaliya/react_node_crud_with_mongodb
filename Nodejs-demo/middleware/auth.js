const jwt = require("jsonwebtoken");

const secret = 'test';

const auth = async (req, res, next) => {
    console.log('req',req.headers);
  try {
    const token = req.headers.authorization;
    console.log('token',token);
    const isCustomAuth = token.length < 500;
    console.log('isCustomAuth',isCustomAuth);

    let decodedData;

    if (token && isCustomAuth) {      
      decodedData = jwt.verify(token, secret);

      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);

      req.userId = decodedData?.sub;
    }    
    console.log('decodedData',decodedData);
    console.log('req',req);
    

    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
    auth
}