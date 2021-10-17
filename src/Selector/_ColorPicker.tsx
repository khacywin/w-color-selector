import * as StyleColorPicker from "./style.ColorPicker";

import React, { useEffect, useState } from "react";

import Control from "./_ColorPicker.Control";
import { HSLAToRGBA } from "./_ColorPicker.convert";
import Slider from "./_ColorPicker.Slider";
import Template from "./_ColorPicker.Template";
import { WColorHeading } from "./style";
import _t from "../util/_t";

type HSL = { h: number; s: number; l: number };
interface Props {
  hex: (color: string) => void;
}
export default React.memo(({ hex }: Props) => {
  const [hue, setHue] = useState(0);
  const [saturation, setSaturation] = useState(12);
  const [lightness, setLightness] = useState(47);

  const changeColorSL = (s: number, l: number) => {
    setSaturation(s);
    setLightness(l);
  };

  const changeColorHex = (_hsl: HSL) => {
    setHue(_hsl.h);
    setSaturation(_hsl.s);
    setLightness(_hsl.l);
  };

  const changeColorHue = (h: number) => {
    setHue(h);
  };

  useEffect(() => {
    hex(HSLAToRGBA(hue, saturation, lightness, 1, true)); // Return color for parent component
  }, [hex, hue, saturation, lightness]);

  return (
    <StyleColorPicker.WColorPicker>
      <WColorHeading>{_t("Color picker")}</WColorHeading>
      <Template h={hue} s={saturation} l={lightness} change={changeColorSL} />
      <Slider h={hue} change={changeColorHue} />
      <Control h={hue} s={saturation} l={lightness} change={changeColorHex} />
    </StyleColorPicker.WColorPicker>
  );
});
