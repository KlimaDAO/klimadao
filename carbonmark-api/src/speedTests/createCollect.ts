import admin from 'firebase-admin';
import { ethers } from 'ethers';
import { faker } from '@faker-js/faker';


import * as dotenv from "dotenv";
dotenv.config({ path: "../../../.vercel/.env.development.local" });

if (!process.env.FIREBASE_ADMIN_CERT) {
    throw new Error("Environment variable FIREBASE_ADMIN_CERT is undefined");
  }

admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_ADMIN_CERT))
});

const db = admin.firestore();


const createUserData = async () => {
  let counter = 0;

  while (counter < 1000) {
  const wallet = ethers.Wallet.createRandom();
  const ethAddress = wallet.address;


  const userData = {
    description: faker.lorem.sentence(), 
    username: faker.internet.userName(), 
    handle: faker.internet.userName(), 
    profileImgUrl: faker.internet.avatar(), 
    ethereumAddress: ethAddress,
  };

  // Add a new document in collection "usersTesting" with auto-generated ID
  await db.collection('usersTesting').doc(ethAddress).set(userData)
    .then(() => console.info('Document written with ID: ', ethAddress))
    .catch((error) => console.error('Error adding document: ', error));
  counter += 1
}

};

createUserData();
