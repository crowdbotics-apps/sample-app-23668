const admin = require("firebase-admin");
let datt = [];
export default async function (req, res) {
  try {
    admin.database().ref(`admin`).child(req.query.id).remove();
    let admins = (
      await admin.database().ref("admin").limitToFirst(10).once("value")
    ).val();
    if (admins)
      admins = Object.keys(admins).map((key) => ({
        id: key,
        ...admins[key],
      }));
    res.json(admins);
  } catch (error) {
    res.status(500).json({});
  }
}
