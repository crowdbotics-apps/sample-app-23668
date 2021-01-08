var admin = require("firebase-admin");
var serviceAccount = require("./key/brendameyapp-firebase-adminsdk-usize-0672ac8ee7.json");

export default async (req, res) => {
  res.statusCode = 200;
  if (!admin.apps.length) {
    console.log("initialize");
    // admin.initializeApp({
    //   credential: admin.credential.cert(serviceAccount),
    //   databaseURL: "https://brendameyapp.firebaseio.com",
    // });
  }
  //admin.auth();
  res.json({ nme: "D" });
};
