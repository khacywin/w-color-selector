import * as StyleColorPicker from "./style.ColorPicker";

import React, { useEffect, useRef, useState } from "react";

interface Props {
  h: number;
  s: number;
  l: number;
  change: (s: number, l: number) => void;
}
export default React.memo((props: Props) => {
  const refCircleSelect: any = useRef();
  const refColorPickerBox: any = useRef();
  const [circleSelect, setCircleSelect] = useState([50, 50]);
  let isMousedown: boolean = false;

  function handleMoveCircleSelect(e: any, isClick = false) {
    // Get offset of mouse event
    if (isMousedown || isClick) {
      const widthBox = refColorPickerBox.current.width.baseVal.value;
      const heightBox = refColorPickerBox.current.height.baseVal.value;

      const _offset = [e.offsetX, e.offsetY];
      const SPercent: number = Math.round(((_offset[0] - 15) / widthBox) * 100);

      // Calculating the X and Y Percent Values
      const percentX = 100 - SPercent / 2;
      const percentY = 100 - ((_offset[1] - 15) / heightBox) * 100;

      // Calculating the LPercent
      // LPercent is the the X percentage of the of the Y percentage of the dragger
      const LPercent: number = Math.floor((percentY / 100) * percentX);

      // setCCircleSelect(_offset);
      props.change(SPercent, LPercent);
    }
  }

  useEffect(() => {
    // Event mouse down for circle selected
    const onMousedown = () => {
      isMousedown = true;
    };
    refCircleSelect.current.addEventListener("mousedown", onMousedown);

    // Event mouse up for circle selected
    const onMouseup = () => {
      if (isMousedown) isMousedown = false;
    };
    refCircleSelect.current.addEventListener("mouseup", onMouseup);

    // Event mouse move
    refColorPickerBox.current.addEventListener(
      "mousemove",
      handleMoveCircleSelect
    );

    // Event mouse leave
    // Event mouse leave
    const onMouseleave = () => {
      document.addEventListener("mouseup", onMouseup);
    };
    refColorPickerBox.current.addEventListener("mouseleave", onMouseleave);

    const onClick = (e) => {
      handleMoveCircleSelect(e, true);
    };
    refColorPickerBox.current.addEventListener("click", onClick);

    return () => {
      refCircleSelect.current?.removeEventListener("mousedown", onMousedown);
      refCircleSelect.current?.removeEventListener("mouseup", onMouseup);
      refColorPickerBox.current?.removeEventListener(
        "mousemove",
        handleMoveCircleSelect
      );
      refColorPickerBox.current?.removeEventListener(
        "mouseleave",
        onMouseleave
      );
      refColorPickerBox.current?.removeEventListener("click", onClick);
    };
  }, []);

  useEffect(() => {
    /**
     * set value HSL
     */
    let { s, l }: { s: number; l: number } = props;
    const widthBox = refColorPickerBox.current.width.baseVal.value;
    const heightBox = refColorPickerBox.current.height.baseVal.value;

    // Calculating y value
    const percentY = 100 - (l / (100 - s / 2)) * 100;
    let y = (heightBox / 100) * percentY + 14;

    // Calculating x value
    let x = (widthBox / 100) * s + 14;
    setCircleSelect([x, y]); // set position of circle select
  }, [props.h, props.s, props.l]);

  return (
    <StyleColorPicker.WColorPickerTemplate>
      <svg width="100%" height="120">
        <defs>
          <linearGradient id="saturation" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#fff"></stop>
            <stop offset="100%" stopColor={`hsl(${props.h},100%,50%)`}></stop>
          </linearGradient>
          <linearGradient id="brightness" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(0,0,0,0)"></stop>
            <stop offset="100%" stopColor="#000"></stop>
          </linearGradient>
          <pattern id="pattern_config" width="100%" height="100%">
            <rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              fill="url(#saturation)"
            ></rect>
            <rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              fill="url(#brightness)"
            ></rect>
          </pattern>
        </defs>
        <rect
          ref={refColorPickerBox}
          rx="5"
          ry="5"
          x="1"
          y="1"
          width="100%"
          height="100%"
          stroke="#fff"
          strokeWidth="2"
          fill="url(#pattern_config)"
        ></rect>
        <circle
          ref={refCircleSelect}
          cx={circleSelect[0]}
          cy={circleSelect[1]}
          r="5"
          stroke="white"
          strokeWidth="2"
          fill="transparent"
        />
      </svg>
    </StyleColorPicker.WColorPickerTemplate>
  );
});
