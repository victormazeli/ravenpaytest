const router = require("express").Router();
const db = require("../config/dbConfig.js");
const {postData } = require("../common/external-api-call");
const {validatePayment } = require("../validation/schemas");
const accountDB = require("../models/account-model.js");
const validate = require("../middleware/validateError");


// INSERT USER INTO DB
router.post("/send/money", validatePayment, validate, async (req, res) => {
    try {
       // 1. validate bank account number
       const bank = req.body.bank_code;
       const amount = req.body.amount;
       const account_number = req.body.account_number;
       const isValid = await validateAccountNumber(account_number, bank);
       const findAccount = await accountDB.findByOne({ account_number })
       if(isValid && findAccount) {
        if (findAccount.balance <= 0) {
            return res.status(422).json(response.error(422, "INSUFFICENT BALANCE"));
        }
        const addUpAmount = findAccount.balance + amount;

        await db.transaction(async trx => {

            const id = await trx('accounts').where('id', findAccount.id).update({ balance: addUpAmount});
            
            console.log(id + 'account updated.')
          });
          const payload = {
            ...req.body,
            currency: "NGN"
        }
        const response =  await postData(`${process.env.RAVEN_API}/transfers/create`, payload);

        if (response.data.status === "success" && response.data.data) {
            
        }

       }else{
        return res.status(400).json(response.error(400, "ACCOUNT NUMBER NOT VALID"));
       }

    } catch (error) {
        
    }

    function validateAccountNumber(accountNumber, bank) {
        return new Promise( async(resolve, reject) => {
            try {
                const payload = {
                    bank: bank,
                    account_number: accountNumber
                }
               const response =  await postData(`${process.env.RAVEN_API}/account_number_lookup`, payload);
               if (response.data.status === "success" && response.data.data) {
                resolve(true);
               }
            } catch (error) {
                reject(false);
            }

        });

    }
  
});


module.exports = router;
