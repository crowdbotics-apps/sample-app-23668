const admin = require("firebase-admin");
let datt = [];
export default async function (req, res) {
  try {
    console.log("create admin");
    console.log(req.query);
    let admins = await (
      await admin.database().ref("admin").once("value")
    ).val();
    if (admins) {
      admins = Object.keys(admins).map((key) => ({
        id: key,
        ...admins[key],
      }));
      for (const user of admins) {
        if (user.email == req.query.email) {
          return res.status(500).json({
            message: "The email address is already in use by another admin",
          });
        }
      }
    }

    admin.database().ref(`admin`).push({
      email: req.query.email,
      name: req.query.name,
      password: req.query.password,
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
