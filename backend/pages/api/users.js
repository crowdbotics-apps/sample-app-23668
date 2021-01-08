const admin = require("firebase-admin");
export default async function (req, res) {
  try {
    console.log(req.query);
    let users;
    if (req.query.limit) {
      let res = await admin
        .database()
        .ref("users")
        .limitToFirst(Number(req.query.limit))
        .once("value");
      users = res.val();
      if (users)
        users = Object.keys(users).map((key) => ({ id: key, ...users[key] }));
    } else {
      users = (
        await admin.database().ref("users").limitToFirst(10).once("value")
      ).val();
      if (users)
        users = Object.keys(users).map((key) => ({ id: key, ...users[key] }));
    }
    res.json(users);
  } catch (error) {
    res.json([]);
    console.log(error);
  }
}
