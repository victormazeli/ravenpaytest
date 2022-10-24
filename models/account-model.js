const db = require("../config/dbConfig.js");

// GET ALL accounts
const find = () => {
  return db("accounts");
};

// GET SPECIFIC USER BY ID
const findById = id => {
  return db("accounts").where("id", id).first();

  //SQL RAW METHOD
  // return db.raw(`SELECT * FROM accounts
  //                  WHERE id = ${id}`);
};

// GET SPECIFIC USER BY EMAIL
const findByOne = condition => {
  return db("accounts").where(condition).first();

  //SQL RAW METHOD
  // return db.raw(`SELECT * FROM accounts
  //                  WHERE id = ${id}`);
};

// ADD A USER
const addAccount = account => {
  return db("accounts").insert(account, "id");
};

// UPDATE USER
const updateAccount = (id, post) => {
  return db("accounts")
    .where("id", id)
    .update(post);
};

// REMOVE USER
const removeAccount = id => {
  return db("accounts")
    .where("id", id)
    .del();
};

module.exports = {
  find,
  findById,
  addAccount,
  updateAccount,
  removeAccount,
  findByOne
};
