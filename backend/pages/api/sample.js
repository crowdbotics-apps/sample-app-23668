var admin = require("firebase-admin");
// admin should add other admins
const objectt2 = {
  name: "2",
  email: "admin88",
  password: "adminV1",
};
let dd = [];

export default async (req, res) => {
  //const result = await admin.auth().getUser("7hqnVCuyFLPsYjBUX2uq2TbgY6u1");
  //console.log(result);

  //const e = await admin.database().ref("admin").set(objectt);

  const obj1 = await admin
    .database()
    .ref("admin")
    .on("value", function (snapshot) {
      const data = snapshot.val();
      
      dd = data;
    });






  // dd.push(objectt2);
  // const obj2 = await admin.database().ref("admin").set(dd);
};
