import axios from "axios";
import config from "../config/config";

const header = {
  "Accept": "application/json",
  "Content-Type": "application/json",
};

/**
 * 
 * 
 * @param {*} email 
 * @param {*} expoPushToken 
 */
exports.registerExpoToken = async (
  email,
  expoPushToken
) => {
  const user = {
    email: email,
    expoToken: expoPushToken,
  };

  try {
    console.log(`${config.host}/user/register/expoToken`);
    const result = await axios.post(
      `${config.host}/user/register/expoToken`,
      user,
      header
    );
    console.log("testing: " + JSON.stringify(result, null, 4))
    if ((result.status = "200"))
      console.log("Expo token has successfully been stored");
    else
      console.log(
        "Error: something has gone wrong trying to save expo notification token"
      );
  } catch (error) {
    console.log("Error: " + error);
  }
};