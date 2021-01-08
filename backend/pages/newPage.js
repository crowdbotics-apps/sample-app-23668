//import * as admin from "firebase-admin";
import { useEffect, useState } from "react";
export default function newPage(props) {
  const [value, setValue] = useState(false);
  useEffect(() => {
    if (props) {
      setValue(true);
      console.log(props);
    }
  }, []);
  if (value == true) return <div>AAA</div>;
  return <div>SSS</div>;
}

let a = [];
export async function getStaticProps(context) {
  const data = await fetch("https://jsonplaceholder.typicode.com/photos");
  const full = await data.json();
  return {
    props: {
      a: full,
    },
  };
}
