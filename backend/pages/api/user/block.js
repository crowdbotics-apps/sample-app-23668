const admin = require("firebase-admin");

export default async function (req, res) {
  try {
    console.log("block");
    console.log(req.query);
    // admin.auth().deleteUser()
    await admin
      .auth()
      .updateUser(req.query.id, { disabled: req.query.disabled == "true" });
    admin.database().ref(`users`).child(`${req.query.id}`).update({
      disabled: req.query.disabled,
    });
    let users = (
      await admin.database().ref("users").limitToFirst(10).once("value")
    ).val();
    if (users)
      users = Object.keys(users).map((key) => ({ id: key, ...users[key] }));
    res.json(users);
  } catch (error) {
    res.status(500).json({});
  }
}
