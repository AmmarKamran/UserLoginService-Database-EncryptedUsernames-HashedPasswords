import CryptoJS from "crypto-js"


// -----------------------------------------------------------------------------------------------------
// ------------ DECRYPT FUNCTIONALTIY -------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------
export async function decrypt(ciphertext, secretKey) {
  console.log("ENTERED Decrypt Function.")
  console.log("ciphertext: ", ciphertext); // 'my message'
  console.log("secretKey: ", secretKey)
  // Decrypt
  var bytes  = CryptoJS.AES.decrypt(ciphertext, secretKey);
  var plaintext = bytes.toString(CryptoJS.enc.Utf8);
  console.log("plaintext: ", plaintext)
  return {
    plaintext: plaintext,
    ciphertext: ciphertext,
    secretKey: secretKey,
  };
}