import pkg from "mongodb"
const {MongoClient} = pkg
import { signup, UserSecretKey_GLOBAL_sameforAllUsers } from "./SignupService.js"
const url = 'mongodb://localhost:27017'
const client = new MongoClient(url)
const dbName = 'UsersDatabase'

// import { MongoClient } from 'mongodb'
// const { MongoClient } = require('mongodb')
// import MongoClient from "mongodb"


async function main() {
  // Use connect method to connect to the server
  console.log ("About to connect to Server")
  await client.connect()
  console.log('\n\n\n\n\nConnected successfully to server')
  const db =  client.db(dbName)
  const collection =  db.collection('documents')
  const deleteAllBeforeStart = true;
  if (deleteAllBeforeStart) {
    console.log("DELETING EVERYTHING IN THE DATABASE BEFORE WE START ---------------------------------")
    const deleteResult = await collection.deleteMany()
    // console.log('Deleted documents =>', deleteResult)
  }
  // the following code examples can be pasted here...
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

  return 'done.'
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close())
