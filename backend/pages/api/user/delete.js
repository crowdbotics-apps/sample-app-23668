const admin = require("firebase-admin");
let datt = [];
export default async function (req, res) {
  try {
    console.log("create");
    console.log(req.query);
    // admin.auth().deleteUser()
    await admin.auth().deleteUser(req.query.id);
    admin.database().ref(`users`).child(`${req.query.id}`).remove();
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
