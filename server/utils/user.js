import bcrypt from "bcrypt";

//! hashing password for more safety
export const hashPass = async (pass) => {
  if (!pass || typeof pass !== "string") {
    throw new Error("Password must be a non-empty string");
  }

  return await bcrypt.hash(pass, 12);
};

export const checkPass = async (pass, hashedPass) => {
  try {
    const isPasswordValid = await bcrypt.compare(pass, hashedPass);
    return isPasswordValid;
  } catch (e) {
    console.error('Error checking password: ', e)
    throw new Error("Password comparison failed.")
  }
};

//! get first error from any object
export const firstErrorMessage = (e) => {
  const firstErrorKey = Object.keys(
    e.errors
  ); /*return an array of the property names of an object*/
  const firstMessage = e.errors[firstErrorKey[0]].message;
  return firstMessage;
};

export const avatar = "http://localhost:8000/default-picture.jpg";
