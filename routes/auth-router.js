const router = require("express").Router();
const dotenv = require('dotenv');
const usersDB = require("../models/users-model.js");
const accountDB = require("../models/account-model.js");
const bcrypt = require('bcrypt');
const client = require("../common/redis");
const response = require("../common/response");
const validate = require("../middleware/validateError");
const {validateLogin, validateNewUser } = require("../validation/schemas");

const { verifyRefreshToken } = require('../middleware/auth');
const { generateAccessToken, generateRefreshToken} = require("../common/token-generator");
const {postData } = require("../common/external-api-call");
// const { createAccountWithSerial } = require("../common/nuban.util");

dotenv.config();


// router.post('/generatepassword', async (req, res) => {
//   const salt = await bcrypt.genSalt(10);
//   const password = await bcrypt.hash(req.body.password, salt);
//   res.json({ 'Generated password': password });
// });

router.post('/signup', validateNewUser(), validate, async (req, res) => {
 try {
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.password, salt);
  const newUser = {
    email: req.body.email,
    password: password
  }
  // check user
  const findUser = await usersDB.findByOne({ email: req.body.email });

  if (findUser) {
    return res.status(400).json(response.error(400, "SIGNUP.ERROR.USER_ALREADY_EXIST"));
  }

  // check phone number

  const findPhone = await accountDB.findByOne({ phone_number: req.body.phone_number });

  if (findPhone) {
    return res.status(400).json(response.error(400, "SIGNUP.ERROR.USER_PHONE_NUMBER_ALREADY_EXIST"));
  }

  const user = await usersDB.addUser(newUser);
  const getUser = await usersDB.findById(user[0]);
  console.log(getUser)
  // create account number for user 
  const payload = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    phone: req.body.phone_number,
    email: req.body.email,
    amount: '0'
  };
  const createAccount = await postData(`${process.env.RAVEN_API}/pwbt/generate_account`, payload);
  console.log(createAccount.data);

  if (createAccount.data) {
    const newAccount = {
      first_name: createAccount.data.data.customer.first_name,
      last_name: createAccount.data.data.customer.last_name,
      phone_number: createAccount.data.data.customer.phone,
      account_number: createAccount.data.data.account_number,
      account_name: createAccount.data.data.account_name,
      bank_name: createAccount.data.data.bank,
      balance: 0,
      user_id: user[0]
    }
    await accountDB.addAccount(newAccount)
  }
  const resposnePyaload = {
    email: getUser.email,
    first_name: createAccount.data.data.customer.first_name,
    last_name: createAccount.data.data.customer.last_name,
    phone_number: createAccount.data.data.customer.phone,
    account_number: createAccount.data.data.account_number,
    account_name: createAccount.data.data.account_name,
  };
  return res.status(201).json(response.success(201, "SIGNUP.SUCCESS", resposnePyaload))
 } catch (error) {
  console.log(error)
  return res.status(500).json(response.error(500, "SERVER ERROR"));
 };
});

router.post('/login', validateLogin(), validate, async (req, res) => {
   try {
    const user = await usersDB.findByOne({email: req.body.email});
    console.log(user)
    if (user) {
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (validPassword) {
        const token = generateAccessToken(user.id, user.email);
        const refreshToken = generateRefreshToken(user.id, user.email);
        const tokenPair = {
          access_token: token,
          refresh_token: refreshToken
        }
  
        const refreshList = {
          status: 'loggedin',
          token: token,
          refreshtoken: refreshToken,
        };
        // client.setEx(refreshToken, 3600, JSON.stringify(refreshList));
        return res.status(200).json(response.success(200, "LOGIN.SUCCESS", tokenPair));
      } else {
        return res.status(400).json(response.error(400, "LOGIN.ERROR.INVALID_PASSWORD"));
      }
    } else {
      return res.status(404).json(response.error(404, "LOGIN.ERROR.USER_NOT_FOUND"));
    }
   } catch (error) {
    console.log(error)
    return res.status(500).json(response.error(500, "SERVER ERROR"));
   }
});

router.post('/refresh', verifyRefreshToken, async (req, res) => {
  const postData = req.decoded;
  if (postData) {

    const token = generateAccessToken(postData.sub, postData.email);
    const refreshToken = generateRefreshToken(postData.sub, postData.email);
    const tokenPair = {
      access_token: token,
      refresh_token: refreshToken
    }
    const refreshList = {
      status: 'loggedin',
      token: token,
      refreshtoken: refreshToken,
    };
    client.setEx(usersRedisKey, 3600, JSON.stringify(refreshList));
    return res.status(200).json(response.success(200, "REFRESH.SUCCESS", tokenPair));

  } else {
    return res.status(403).json(response.error(403, "REFRESH.ERROR.ERROR"));
  }
});
  

module.exports = router;