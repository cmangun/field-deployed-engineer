"use client";
import React, {useEffect } from "react";

const Wrapper = ({ children }: { children: React.ReactNode }) => {

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("bootstrap/dist/js/bootstrap.bundle.min")
        .then(() => console.log("Bootstrap loaded"))
        .catch((err) => console.error("Bootstrap failed to load", err));
    }
  }, []);

  return children;
};

export default Wrapper;
