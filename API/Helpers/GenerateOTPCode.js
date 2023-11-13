const generateOTPCode = (limit) => {
  const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  let OTP = "";
  for (let i = 0; i < limit; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return parseInt(OTP);
};

export default generateOTPCode;
