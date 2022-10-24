// require("dotenv").config();
// const banks = [
//   { name: "ACCESS BANK", code: "044" },
//   { name: "RAVEN BANK", code: "321" },
//   { name: "CITIBANK", code: "023" },
//   { name: "DIAMOND BANK", code: "063" },
//   { name: "ECOBANK NIGERIA", code: "050" },
//   { name: "FIDELITY BANK", code: "070" },
//   { name: "FIRST BANK OF NIGERIA", code: "011" },
//   { name: "FIRST CITY MONUMENT BANK", code: "214" },
//   { name: "GUARANTY TRUST BANK", code: "058" },
//   { name: "HERITAGE BANK", code: "030" },
//   { name: "JAIZ BANK", code: "301" },
//   { name: "KEYSTONE BANK", code: "082" },
//   { name: "PROVIDUS BANK", code: "101" },
//   { name: "SKYE BANK", code: "076" },
//   { name: "STANBIC IBTC BANK", code: "221" },
//   { name: "STANDARD CHARTERED BANK", code: "068" },
//   { name: "STERLING BANK", code: "232" },
//   { name: "SUNTRUST", code: "100" },
//   { name: "UNION BANK OF NIGERIA", code: "032" },
//   { name: "UNITED BANK FOR AFRICA", code: "033" },
//   { name: "UNITY BANK", code: "215" },
//   { name: "WEMA BANK", code: "035" },
//   { name: "ZENITH BANK", code: "057" }
// ];

// const seed = "373373373373";
// const nubanLength = 10;
// const serialNumLength = 9;
// let error;

// module.exports = {
//   getAccountBanks: () => {
//     let accountNumber = req.params.account;

//     let accountBanks = [];

//     banks.forEach((item, index) => {
//       if (isBankAccountValid(accountNumber, item.code)) {
//         accountBanks.push(item);
//       }
//     });

//     return accountBanks;
//   },
//   createAccountWithSerial: () => {
//     let bankCode = process.env.BANK;
//     let bank = banks.find(bank => bank.code == bankCode);
//     let serialCode = process.env.SERIAL_NUMBER;

//     if (!bank) {
//       return null;
//     }

//     return new Promise((resolve, reject) => {
//         let serialNumber = serialCode.padStart(serialNumLength, "0");
//         let checkDigit = generateCheckDigit(serialNumber, bankCode);

//         if (!checkDigit) {
//             reject(null)
//         }

//         let nuban = `${serialNumber}${checkDigit}`;
  
//         let account = {
//           serialNumber,
//           nuban,
//           bankCode,
//           bank
//         };
//         resolve(account);
//     })
//   }
// };

// const generateCheckDigit = (serialNumber, bankCode) => {
//   if (serialNumber.length > serialNumLength) {
//     console.log( `Serial number should be at most ${serialNumLength}-digits long.`)
//     return null
//   }

//   serialNumber = serialNumber.padStart(serialNumLength, "0");
//   let cipher = bankCode + serialNumber;
//   let sum = 0;

//   // Step 1. Calculate A*3+B*7+C*3+D*3+E*7+F*3+G*3+H*7+I*3+J*3+K*7+L*3
//   cipher.split("").forEach((item, index) => {
//     sum += item * seed[index];
//   });

//   // Step 2: Calculate Modulo 10 of your result i.e. the remainder after dividing by 10
//   sum %= 10;

//   // Step 3. Subtract your result from 10 to get the Check Digit
//   let checkDigit = 10 - sum;

//   // Step 4. If your result is 10, then use 0 as your check digit
//   checkDigit = checkDigit == 10 ? 0 : checkDigit;

//   return checkDigit;
// };

// /**
//  * Algorithm source: https://www.cbn.gov.ng/OUT/2011/CIRCULARS/BSPD/NUBAN%20PROPOSALS%20V%200%204-%2003%2009%202010.PDF
//  * The approved NUBAN format ABC-DEFGHIJKL-M where
//  * ABC is the 3-digit bank code assigned by the CBN
//  * DEFGHIJKL is the NUBAN Account serial number
//  * M is the NUBAN Check Digit, required for account number validation
//  * @param {*} accountNumber
//  * @param {*} bankCode
//  */
// const isBankAccountValid = (accountNumber, bankCode) => {
//   if (!accountNumber || !accountNumber.length == nubanLength) {
//     error = "NUBAN must be %s digits long" % nubanLength;
//     return false;
//   }

//   let serialNumber = accountNumber.substring(0, 9);
//   let checkDigit = generateCheckDigit(serialNumber, bankCode);

//   return checkDigit == accountNumber[9];
// };