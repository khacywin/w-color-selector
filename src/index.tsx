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
import icon_close from "./icons/close.svg";
import styled from "styled-components";

interface PropsMainValue {
  color?: string;
  height?: number;
  width?: number;
}

interface PropsMainSelector {
  show: boolean;
  dark?: boolean;
  light?: boolean;
}

interface Props {
  onChange: (value: string) => void;
  defaultValue?: string;
  width?: number;
  height?: number;
  dark?: boolean;
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
    <MainWrap ref={refWrap} className="w-color-selector">
      <MainValue
        color={value}
        height={props.height || 30}
        width={props.width || 30}
        onClick={() => setShow(!show)}
      />
      {show && (
        <MainSelector
          ref={refMenu}
          show={true}
          dark={props.dark}
          className="w-color-selector-container"
        >
          <Selector
            fnSelected={handleChange}
            select={value}
            fnClosePopup={hiddenDropdownWhenClick}
          />
          <ButtonControl>
            <button onClick={hiddenDropdownWhenClick}>
              <img src={icon_close} alt="w-color" />
            </button>
          </ButtonControl>
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
  box-sizing: border-box;
  border-radius: 0.5em;
  width: 15em;
  padding: 0.5em;

  ${(props) =>
    props.dark
      ? `
    background-color: #1a1a1a;
    color: #fff;
  `
      : `
    background-color: #fff;
    color: inherit;
    box-shadow: 0 2px 3px 1px rgba(0, 0, 0, 0.12);
  `}

  ${({ show }) =>
    show &&
    `
    z-index: 999;
  `};
`;

const ButtonControl = styled.div`
  position: absolute;
  right: 5px;
  top: 5px;

  button {
    border: none;
    border-radius: 7px;
    opacity: 0.8;
    padding: 2px 5px;
    cursor: pointer;

    img {
      width: 10px;
      height: 10px;
    }

    &:hover {
      opacity: 1;
    }
  }
`;
