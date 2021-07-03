// var SHA256 = require("crypto-js/sha256");
import cryptoJS from "crypto-js"
// -----------------------------------------------------------------------------------------------------
// ------------ HASHING FUNCTIONALTIY -------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------


async function Hash_SHA256(str) {
  console.log("original string is: ", str);
  let originalHashedretVal = cryptoJS.SHA256(str);
  let originalHashedretVal_asString = originalHashedretVal.toString();
  console.log("Hashed as  string is: ", originalHashedretVal_asString)

  if (cryptoJS.SHA256(str).string != cryptoJS.SHA256(str).string) {
    console.log("ERROR: TWO HASHED VALUES DONT EQUAL EACH OTHER----------------------------------")
  }
  return {
    originalHashedretVal: originalHashedretVal,
    originalHashedretVal_asString: originalHashedretVal_asString
  }
}

Hash_SHA256("hello")
