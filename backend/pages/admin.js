import { Container } from "@material-ui/core";
import { Router, useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Dashboard from "../src/appScreens/adminDashboard/adminDashboard";
import Loading from "../src/components/Loading";
const main = () => {
  let router = useRouter();
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let admin = localStorage.getItem("admin");

    setAdmin(admin);
    setLoading(false);
  }, []);

  if (admin && !loading) {
    return <Dashboard />;
  } else if (loading) {
    return (
      <Container
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#FFF",
        }}
      >
        <Loading />
      </Container>
    );
  } else {
    router.push("/");
    return <Container></Container>;
  }
};

export default main;
