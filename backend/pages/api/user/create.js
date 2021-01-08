const admin = require("firebase-admin");
let datt = [];
export default async function (req, res) {
  try {
    console.log("create");
    console.log(req.query);
    let newUser = await admin.auth().createUser({
      email: req.query.email,
      password: req.query.password,
      displayName: req.query.name,
    });
    admin.database().ref(`users/${newUser.uid}`).set({
      email: req.query.email,
      name: req.query.name,
      accNumber: req.query.accNumber,
    });
    res.json({});
  } catch (error) {
    let message;
    if (error && error.code == "auth/email-already-exists") {
      message = "The email address is already in use by another account";
    } else {
      console.log(error);
    }
    res.status(500).json({ message });
  }
}
