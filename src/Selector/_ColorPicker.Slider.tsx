import * as StyleColorPicker from "./style.ColorPicker";

import React, { useEffect, useRef, useState } from "react";

interface Props {
  h: number;
  change: (hue: number) => void;
}
export default React.memo((props: Props) => {
  const refSliderSelect: any = useRef();
  const refSliderBox: any = useRef();
  const [cSelect, setSelect] = useState(1);
  let isMousedownSlider = false;

  function convertPositionToHue(pos: number) {
    const widthBox = refSliderBox.current.width.baseVal.value;
    const percent = (pos / widthBox) * 100;
    // Calculating the color
    // Max number for hue colors is 359, I find the percentage of this, from the percent variable
    // I take it away from the max number because the slider should work backwards
    return Math.round(359 - (359 / 100) * percent);
  }

  function convertHueToPosition(hue: number) {
    const widthBox = refSliderBox.current.width.baseVal.value;
    let percentHue = 100 - (hue / 359) * 100;
    let pos = (widthBox / 100) * percentHue - 5;
    return pos;
  }

  function handleMoveCircleSelect(e: any, isClick = false) {
    let _c = e.offsetX;
    if (isClick || isMousedownSlider) {
      props.change(convertPositionToHue(_c));
      // setSelect(_c);
    }
  }

  useEffect(() => {
    // Event mouse down for circle selected
    const onMousedown = () => {
      isMousedownSlider = true;
    };
    refSliderSelect.current.addEventListener("mousedown", onMousedown);

    // Event mouse up for circle selected
    const onMouseup = () => {
      if (isMousedownSlider) isMousedownSlider = false;
    };
    refSliderSelect.current.addEventListener("mouseup", onMouseup);

    // Event mouse move
    refSliderBox.current.addEventListener("mousemove", handleMoveCircleSelect);

    // Event mouse leave
    const onMouseleave = () => {
      document.addEventListener("mouseup", onMouseup);
    };
    refSliderBox.current.addEventListener("mouseleave", onMouseleave);

    // Handle click
    const onClick = (e) => {
      handleMoveCircleSelect(e, true);
    };
    refSliderBox.current.addEventListener("click", onClick);

    return () => {
      refSliderSelect.current?.removeEventListener("mousedown", onMousedown);
      refSliderSelect.current?.removeEventListener("mouseup", onMouseup);
      refSliderBox.current?.removeEventListener(
        "mousemove",
        handleMoveCircleSelect
      );
      refSliderBox.current?.removeEventListener("mouseleave", onMouseleave);
      refSliderBox.current?.removeEventListener("click", onClick);
    };
  }, []);

  useEffect(() => {
    const widthBox = refSliderBox.current.width.baseVal.value;

    setSelect(convertHueToPosition(props.h));
  }, [props.h]);

  return (
    <StyleColorPicker.WColorPickerBar>
      <svg width="100%" height="26">
        <defs>
          <linearGradient id="hue" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#f00"></stop>
            <stop offset="16.666%" stopColor="#ff0"></stop>
            <stop offset="33.333%" stopColor="#0f0"></stop>
            <stop offset="50%" stopColor="#0ff"></stop>
            <stop offset="66.666%" stopColor="#00f"></stop>
            <stop offset="83.333%" stopColor="#f0f"></stop>
            <stop offset="100%" stopColor="#f00"></stop>
          </linearGradient>
        </defs>
        <rect
          ref={refSliderBox}
          rx="5"
          ry="5"
          x="0"
          y="1"
          width="100%"
          height="20"
          stroke="#fff"
          strokeWidth="2"
          fill="url(#hue)"
        ></rect>
        <rect
          ref={refSliderSelect}
          width="5"
          height="22"
          stroke="#000"
          strokeWidth="2"
          fill="transparent"
          rx="5"
          ry="5"
          x={cSelect}
          y="0"
        ></rect>
      </svg>
    </StyleColorPicker.WColorPickerBar>
  );
});
