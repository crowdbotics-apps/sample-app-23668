const admin = require("firebase-admin");
export default async function (req, res) {
  try {
    console.log(req.query);
    let users = (await admin.database().ref("users").once("value")).val();
    if (users)
      users = Object.keys(users).map((key) => ({ id: key, ...users[key] }));

    res.json(users);
  } catch (error) {
    res.json([]);
    console.log(error);
  }
}
