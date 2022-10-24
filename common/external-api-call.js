const axios = require("axios");
require("dotenv").config();

const postData = async (url, dataToPost) => {
    const axiosConfig = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${process.env.API_KEY}`,
      },
    };

    const response = await axios.post(url, dataToPost, axiosConfig);
    const result = response;
    // console.log('response from Post Data function', response);
    return result;
}

const fetchData = async (url) => {
    const axiosConfig = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${process.env.API_KEY}`,
      },
    };

    const response = await axios.get(url, dataToPost, axiosConfig);
    const result = response;
    // console.log('response from Post Data function', response);
    return result;
}

module.exports = { postData, fetchData}