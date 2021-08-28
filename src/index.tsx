import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import Selector from "./Selector";
import _key from "./util/_key";
import _t from "./util/_t";
import styled from "styled-components";

interface PropsMainValue {
  color?: string;
  height?: number;
  width?: number;
}

interface PropsMainSelector {
  show: boolean;
}

interface Props {
  onChange: (value: string) => void;
  defaultValue?: string;
  width?: number;
  height?: number;
}
function App(props: Props) {
  const [value, setValue] = useState("#54478c");
  const [show, setShow] = useState(false);

  const refWrap = useRef<HTMLDivElement>();
  const refMenu = useRef<HTMLDivElement>();

  const posScreen = useMemo(
    () => ({
      x: 0,
      y: 0,
      height: window.innerHeight,
      width: window.innerWidth,
    }),
    []
  );

  /**
   * @param e
   */
  const handleClick = useCallback((e: any) => {
    const path = e.path || (e.composedPath && e.composedPath()) || [];

    // Hide path when click outside
    !path.some((item: any) => refWrap.current.contains(item.parentNode)) &&
      hiddenDropdownWhenClick();
  }, []);

  /**
   */
  const hiddenDropdownWhenClick = useCallback(() => {
    setShow(false);
    document.removeEventListener("mouseup", handleClick);
  }, [handleClick]);

  const handleChange = useCallback(
    (color: string) => {
      setValue(color);
      props.onChange(color);
    },
    [props.onChange]
  );

  useEffect(() => {
    function display() {
      if (refMenu?.current?.clientHeight > 0) {
        const posElement = refMenu.current.getBoundingClientRect();
        let transform = [];
        let transformOriginY = "left";
        let transformOriginX = "top";

        if (posElement.x < 0) {
          transform.push("translateX(100%)");
          transformOriginY = "top";
        } else if (posElement.right > posScreen.width - 10) {
          transform.push("translateX(-100%)");
          transformOriginY = "bottom";
        }

        if (posElement.top < 0) {
          transform.push(`translateY(calc(100% + ${props.height || 35})`);
          transformOriginX = "left";
        } else if (posElement.bottom > posScreen.height) {
          transform.push(`translateY(calc(-100% - ${props.height || 35}px))`);
          transformOriginX = "right";
        }

        refMenu.current.style.transform = transform.join(" ");
        refMenu.current.style.visibility = "visible";
        refMenu.current.style.transformOrigin = `${transformOriginX} ${transformOriginY}`;
      }

      if (show) {
        document.addEventListener("mouseup", handleClick);
      }
    }

    show && setTimeout(() => display(), 100);

    return () => {
      document.removeEventListener("mouseup", handleClick);
    };
  }, [props.height, show]);

  useEffect(() => {
    props.defaultValue && setValue(props.defaultValue);
  }, [props.defaultValue]);

  return (
    <MainWrap ref={refWrap}>
      <MainValue
        color={value}
        height={props.height || 30}
        width={props.width || 30}
        onClick={() => setShow(!show)}
      />
      {show && (
        <MainSelector ref={refMenu} show={true}>
          <Selector fnSelected={handleChange} select={value} />
        </MainSelector>
      )}
    </MainWrap>
  );
}

export default App;

const MainWrap = styled.div`
  display: block;
  overflow: hidden;
`;

const MainValue = styled.div<PropsMainValue>`
  cursor: pointer;
  border-radius: 5px;
  ${(props) => `
    width: ${props.width}px;
    height: ${props.height}px;
    background-color: ${props.color};
  `}
`;

const MainSelector = styled.div<PropsMainSelector>`
  position: absolute;
  z-index: -1;
  visibility: hidden;

  ${({ show }) =>
    show &&
    `
    z-index: 999;
  `};
`;
