import {decrypt} from "./Decryption.js"
import {encrypt_AES} from "./Encryption.js"
// -----------------------------------------------------------------------------------------------------
// ------------ TEST EN/De Crypt ---------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------
async function TestEncryptAndDecrupt() {
  console.log("\n\n\nTESTING ENCRYPT AND DECRYPT FUNCTIONALITIES -----------------------------")
  // TESTING Encrypt Function
  const Test_Encrypt = await encrypt_AES("Encrypt ME", "SecretKey123")
  console.log("Test_Encrypt result was ", Test_Encrypt)
  // TESTING DECRYPT Function
  let Test_Decrypt = await decrypt(Test_Encrypt.ciphertext, Test_Encrypt.secretKey)
  console.log("Test_Decrypt result was ", Test_Decrypt)
  console.log ("\n\n\n\n\n")
}

TestEncryptAndDecrupt()
