function generateOtpCode() {
    let otp = '';
    const dataset = '0123456789';

    for (let index = 0; index < 6; index++) {
      const code = dataset[Math.floor(Math.random() * dataset.length)];
      otp += code;
    }
    return otp;
  }

module.exports = { generateOtpCode }