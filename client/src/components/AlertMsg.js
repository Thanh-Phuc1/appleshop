import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const AlertMsg = () => {
  return (
    <ToastContainer
      position="top-center"
      hideProgressBar={false}
      newestOnTop={false}
      autoClose={2000}
      pauseOnHover
      limit={5}
    />
  );
};

export default AlertMsg;
