import React from "react";
import { Alert } from "react-bootstrap";

const Message = (props) => {
  return <Alert variant={props.variant}>{props.children}</Alert>;
};

Message.defaultProps = {
  variant: "info",
};

export default Message;
