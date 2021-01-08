const admin = require("firebase-admin");
export default async function (req, res) {
  try {
    console.log(req.query);
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
    res.json({});
    console.log(error);
  }
}
