import {encrypt_AES} from "./Encryption.js"
import {Hash_SHA256} from "./Hashing_SHA256.js"
export let UserSecretKey_GLOBAL_sameforAllUsers = "This is the SecretKey. Typically its meant to be different from each user. But for simplicity I've made it the same as a global variable";


// node and Mongo Driver from https://mongodb.github.io/node-mongodb-native/4.0/
// Encryption, Decryption, and Hashing Functions from: //  https://www.npmjs.com/package/crypto-js

// const { MongoClient } = require('mongodb')


// -----------------------------------------------------------------------------------------------------
// ------------ SIGNUP FUNCTIONALTIY -------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------
export async function signup(collection, username, passwordFirst, passwordVerify, UserSecretKey) {
  console.log("Trying to Signup Customer with username: ", username);
  const doesUserNameAlreadyExist = await collection.find({ Username_Plaintext: username }).toArray()
  const lengthof_doesUserNameAlreadyExist = doesUserNameAlreadyExist.length;
  // console.log("lengthof_doesUserNameAlreadyExist is ", lengthof_doesUserNameAlreadyExist);
  const HashedPassword1 =  (await Hash_SHA256(passwordFirst)).originalHashedretVal_asString;
  const HashedPasswordVerify =   (await Hash_SHA256(passwordVerify)).originalHashedretVal_asString;

  const Username_Package_Encrypted_Plain_and_SecretKey = await encrypt_AES(username, UserSecretKey)
  if (lengthof_doesUserNameAlreadyExist) {
    // FIND IN DB WITH A FILTER
    console.log("A user already exists with that username. Please sign in with that username or Choose a different username")
    console.log('Found documents filtered by { Username: "Username1" } =>', doesUserNameAlreadyExist)
  } else if (HashedPassword1 != HashedPasswordVerify) {
    console.log("Error: Passwords do not match");
  } else {
    const insertResult = await collection.insertMany([{ Username_Plaintext: Username_Package_Encrypted_Plain_and_SecretKey.plaintext, EncryptedUsername: Username_Package_Encrypted_Plain_and_SecretKey.ciphertext, UsernameSecretKey: Username_Package_Encrypted_Plain_and_SecretKey.secretKey, Password: passwordFirst, Password_Hashed_SHA256: HashedPassword1}])
    console.log('Inserted documents =>', insertResult)  
  }
}

// -----------------------------------------------------------------------------------------------------
// ------------ SIGNUP 4 Basic Users -------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------
export async function Signup4BasicUsers(collection) {
  console.log("\n\n\n\n\n ABOUT TO SIGN UP FIRST USERNAME with everything correct ------------------------------------------------------------")
  await signup(collection, "Username1", "Password1", "Password1", UserSecretKey_GLOBAL_sameforAllUsers);
  

  console.log("\n\n\n\n\n ABOUT TO SIGN UP SECOND PERSON WITH SAME USERNAME as first ------------------------------------------------------------")
  await signup(collection, "Username1", "Password1", "Password1", UserSecretKey_GLOBAL_sameforAllUsers);

  console.log("\n\n\n\n\n ABOUT TO SIGN UP THIRD PERSON WITH UNIQUE USERNAME but mismatching passwords ------------------------------------------------------------")
  await signup(collection, "Username2", "Password1", "Password2", UserSecretKey_GLOBAL_sameforAllUsers);

  console.log("\n\n\n\n\n ABOUT TO SIGN UP FORUTH PERSON WITH everything correct  (and password same as User1)------------------------------------------------------------")
  await signup(collection, "Username3", "Password1", "Password1", UserSecretKey_GLOBAL_sameforAllUsers);

  // FIND IN DB
  console.log ("\n\n\ ABOUT TO PRINT ALL ELEMS IN DB ------------------------------------------------")
  const findResult = await collection.find({}).toArray()
  console.log('Found documents =>', findResult)
  return 'done';
}
