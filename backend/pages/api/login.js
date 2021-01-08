const admin = require("firebase-admin");
let datt = [];
export default async function (req, res) {
  try {
    let users = (await admin.database().ref("admin").once("value")).val();
    if (users) {
      users = Object.keys(users).map((key) => ({ id: key, ...users[key] }));
      for (const user of users) {
        if (
          req.query.email == user.email &&
          req.query.password == user.password
        ) {
          console.log("admin login");
          return res.json({ login: true, admin: user });
        }
      }
    }
    res.json({ login: false });
  } catch (error) {
    res.json({ login: false });
    console.log(error);
  }
}
