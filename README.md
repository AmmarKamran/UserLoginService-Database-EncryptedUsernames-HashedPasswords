# UserLoginService-Database-EncryptedUsernames-HashedPasswords

#Installation
Run 
npm i 
OR:
npm i mongodb
npm i crypto-js

#Calling the Functions

InitializeDatabase() from the UsersDatabaseService

Then You can Call the signup or signin functions by passing in the Db collection from the respective services

# Description of File System:
(1) Encryption.js => performs encryption; used for encryption usernames before storing in database; Algorith used: AES (Advanced Encryption Scheme)

(2) Decryption.js => performs decryption; used for decryption of usernames (if ever required)

(3) Hashing_SHA256.js => performs hashing for passwords to be stored in database OR for lookups in database

(4) LoginService => Service used for an existing user to login 

(5) SignupService => Service used for a new user to signup 

(6) UsersDatabaseService => Setup and Configuring Database; Calls signup service

(X) Test Files:

  (a) Test_Encryption_then_Decryption.js => testing the encryption and decryption functions work and are perfect reversals of each other
  
  (b) Test_Hashing => to ensure the Hash function functions correctly and that it is deterministic
