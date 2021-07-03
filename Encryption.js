import CryptoJS from "crypto-js"

// -----------------------------------------------------------------------------------------------------
// ------------ ENCRYPTING FUNCTIONALTIY -------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------
export async function encrypt_AES(plaintext, secretKey) {
  console.log("ENTERED Encrypt Function. \n plaintext: ", plaintext); // 'my message'
  console.log("secretKey: ", secretKey)
  // Encrypt
  var ciphertext = CryptoJS.AES.encrypt(plaintext,secretKey).toString();
  console.log("encrypted text:" , ciphertext);
  return {
    plaintext: plaintext,
    secretKey: secretKey,
    ciphertext: ciphertext,
  };
}

