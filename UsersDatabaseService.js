import pkg from "mongodb"
const {MongoClient} = pkg
import { Signup4BasicUsers, signup, UserSecretKey_GLOBAL_sameforAllUsers } from "./SignupService.js"
const url = 'mongodb://localhost:27017'
const client = new MongoClient(url)
const dbName = 'UsersDatabase'

// import { MongoClient } from 'mongodb'
// const { MongoClient } = require('mongodb')
// import MongoClient from "mongodb"


export async function InitializeDatabase_AndCallSignupFunction() {
  // Use connect method to connect to the server
  console.log ("About to connect to Server")
  await client.connect()
  console.log('\n\n\n\n\nConnected successfully to server')
  const db =  client.db(dbName)
  const collection =  db.collection('Usersdocuments')
  const deleteAllBeforeStart = true;
  if (deleteAllBeforeStart) {
    console.log("DELETING EVERYTHING IN THE DATABASE BEFORE WE START ---------------------------------")
    const deleteResult = await collection.deleteMany()
    // console.log('Deleted documents =>', deleteResult)
  }
  Signup4BasicUsers(collection);
  return {
    collection: collection
  }
}

InitializeDatabase_AndCallSignupFunction()

// .then(console.log)
//   .catch(console.error)
//   .finally(() => client.close())
