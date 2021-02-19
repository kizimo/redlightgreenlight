import React, { useState, useCallback } from "react";
import "./styles.scss";

import fetchLight from "./fetchLight";

const lightColorArray = ["-red", "-yellow", "-green"];
const rev = lightColorArray.reverse();

export default function App() {
  const [color, setColor] = useState("");
  const [rnd] = useState(Math.floor(Math.random() * lightColorArray.length));
  const [checked, setChecked] = useState(false);
  const [intrvl, setIntrvl] = useState();
  const [buttonName, setButtonName] = useState("Change");

  const randomClick = useCallback(() => {
    setColor(lightColorArray[rnd]);
  }, [rnd]);

  const buttonClick = async () => {
    if (checked) {
      let i = 0;
      setColor(`${rev[i]}`);
      setIntrvl(
        setInterval(function () {
          i = (i + 1) % rev.length;
          setColor(`${rev[i]}`);
        }, 2500)
      );
    } else {
      const clr = await fetchLight();
      setColor(`-${clr}`);
    }
  };

  const toggleCheck = (e) => {
    setChecked(e.target.checked);
    if (e.target.checked) {
      setButtonName("Start");
    } else {
      clearInterval(intrvl);
      setIntrvl();
      setButtonName("Change");
    }
  };

  const light = (clr, lgt) => {
    clr = clr === lgt ? clr : "";
    return (
      <div className="circle-cap">
        <div className={`circle${clr}`} />
      </div>
    );
  };

  return (
    <div className="app">
      <div className="square" onClick={(e) => randomClick()}>
        {light(color, "-red")}
        {light(color, "-yellow")}
        {light(color, "-green")}
      </div>
      <button onClick={(e) => buttonClick()}>{buttonName}</button>
      <span>
        <input
          type="checkbox"
          id="toggle"
          className="toggle"
          onChange={(e) => toggleCheck(e)}
        />
        <label htmlFor="toggle" className="switch"></label>
      </span>
    </div>
  );
}
