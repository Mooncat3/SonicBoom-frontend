import React, { useState } from "react";
import classes from "./ContentBlock.module.css";
export default function ContentBlock({ children }) {
  return <div className={classes["tab-content"]}>{children}</div>;
}
