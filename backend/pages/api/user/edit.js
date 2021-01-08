const admin = require("firebase-admin");

export default async function (req, res) {
  try {
    console.log("edit");
    console.log(req.query);
    // admin.auth().deleteUser()
    if (req.query.email && req.query.checkEmail == "true") {
      await admin.auth().updateUser(req.query.id, {
        email: req.query.email,
      });
    }
    if (req.query.password && req.query.password.length > 5) {
      await admin.auth().updateUser(req.query.id, {
        password: req.query.password,
      });
    }
    if (req.query.name) {
      await admin.auth().updateUser(req.query.id, {
        displayName: req.query.name,
      });
    }
    admin.database().ref(`users`).child(`${req.query.id}`).update({
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
