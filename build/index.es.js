import React, { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import styled, { keyframes, css } from 'styled-components';

const WColor = styled.div `
  position: relative;
  box-sizing: border-box;
  border-radius: .5em;
  width: 15em;
  padding: .5em;
  ${props => props.dark ? `
    background-color: #1a1a1a;
    color: #fff;
  ` : `
    background-color: #fff;
    color: inherit;
    box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.12);
  `}
`;
const WColorHeading = styled.div `
  font-size: .8em;
  text-indent: .3em;
  position: relative;
  margin-bottom: 3px;
`;
const WColorAdd = styled.button `
  display: block;
  width: 1.4em;
  height: 1.4em;
  background-color: transparent;
  padding: 0;
  border: none;
  cursor: pointer;
  position: absolute;
  right: 5px;
  top: 0;
  box-sizing: border-box;

  &::before{
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #000;
    opacity: 0.1;
    transform: scale(0);
    transition: transform 0.2s ease-in;
    top: 0;
    left: 0;
    border-radius: 50%;
  }

  &:hover{
    &::before{
      transform: scale(1);
    }
  }

  &:focus{
    outline: 0;
  }

  img{
    margin: 20%;
    width: 60%;
    height: 60%;
  }
`;

var img = "data:image/svg+xml,%3c%3fxml version='1.0' encoding='iso-8859-1'%3f%3e%3c!-- Generator: Adobe Illustrator 19.0.0%2c SVG Export Plug-In . SVG Version: 6.00 Build 0) --%3e%3csvg version='1.1' id='Capa_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 496 496' style='enable-background:new 0 0 496 496%3b' xml:space='preserve'%3e%3cg%3e %3cg%3e %3cpath d='M488%2c240H256V8c0-4.418-3.582-8-8-8s-8%2c3.582-8%2c8v232H8c-4.418%2c0-8%2c3.582-8%2c8s3.582%2c8%2c8%2c8h232v232c0%2c4.418%2c3.582%2c8%2c8%2c8 s8-3.582%2c8-8V256h232c4.418%2c0%2c8-3.582%2c8-8S492.418%2c240%2c488%2c240z'/%3e %3c/g%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3c/svg%3e";

function _t (text, language = 'en') {
    return text;
}

const WColorContainer = styled.div `
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;
const KeyframesActive = keyframes `
  0%{
    transform: scale(.6);
  }
  20%{
    transform: scale(.8);
  }
  100%{
    transform: scale(1);
  }
`;
const CSSActive = css `
  &::before{
    animation: ${KeyframesActive} 0.3s linear both;
  }
`;
const KeyframesItem = keyframes `
  0%{
    transform: scale(.2);
  }
  70%{
    transform: scale(.9);
  }
  100%{
    transform: scale(.8);
  }
`;
const WColorItemWrap = styled.div `
  position: relative;
  width: 1.4em;
  height: 1.4em;
  margin: .3em;
  box-sizing: border-box;

  &:hover button{
    display: initial;
  }
  button{
    position: absolute;
    display: none;
    z-index: 100;
    top: 0;
    right: 1px;
    width: 10px;
    height: 10px;
    padding: 0;
    background-color: #fff;
    border: none;
    border-radius: 50%;
    cursor: pointer;

    &:focus{
      outline: 0;
    }


    img{
      transform: translate(0, -2px) scale(.9);
    }
  }

`;
const WColorItem = styled.div `
  position: relative;
  width: 100%;
  height: 100%;
  cursor: pointer;
  border-radius: 0.4em;
  background-color: inherit;

  &::before{
    position: absolute;
    content: '';
    border-radius: 0.2em;
    width: 100%;
    height: 100%;
    top:0;
    left:0;
    transform: scale(0.8);
    transition: all 0.2s linear;
    background-color: ${props => props.color};
    z-index: 10;
    animation: ${KeyframesItem} 0.2s linear;
  }

  &:hover{
    &::before{
      transform: scale(0.9);
    }
  }
  
  ${props => props.active && CSSActive}
`;

let key = 0;
function _key () {
    return 'w-color-' + key + '-';
}

var img$1 = "data:image/svg+xml,%3c%3fxml version='1.0' encoding='utf-8'%3f%3e%3c!-- Generator: Adobe Illustrator 22.0.1%2c SVG Export Plug-In . SVG Version: 6.00 Build 0) --%3e%3csvg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 32 32' style='enable-background:new 0 0 32 32%3b' xml:space='preserve'%3e%3cstyle type='text/css'%3e .st0%7bfill:%23010101%3bstroke:black%3bstroke-width:2%3bstroke-miterlimit:10%3b%7d%3c/style%3e%3cpolygon class='st0' points='26%2c5.6 16.2%2c15.5 6.3%2c5.6 5.6%2c6.3 15.5%2c16.2 5.6%2c26.1 6.3%2c26.7 16.2%2c16.8 26%2c26.7 26.7%2c26.1 16.8%2c16.2 26.7%2c6.3 '/%3e%3c/svg%3e";

var Container = React.memo((props) => {
    const _keyWColor = _key();
    return (React.createElement(WColorContainer, null, props.colour.map((color, key) => (React.createElement(WColorItemWrap, { key: `${_keyWColor}-${key}` },
        React.createElement(WColorItem, { color: color, active: color === props.select, onClick: () => props.fnSelected(color), onDoubleClick: () => props.fnRemove(color) }),
        key > 9 && (React.createElement("button", { onClick: () => props.fnRemove(color), type: 'button' },
            React.createElement("img", { src: img$1, alt: 'w-color' }))))))));
});

const WColorPicker = styled.div `
  margin: 0 0 0.4em 0;
  border-bottom: 1px solid #e9e9e9;
  *{
    will-change: all;
  }
`;
const WColorPickerTemplate = styled.div ``;
const WColorPickerBar = styled.div `
  margin-top: .5em;
`;
const WColorPickerControl = styled.div `
  padding: 0.3em 0;
  display: flex;
  align-items: center;

  & > label{
    flex: 0 0 40px;
    text-align: center;
    opacity: 0.6;
    font-size: 0.8em;
  }

  & > input {
    width: calc(100% - 60px);
    padding: 3px;
    border: none;
    border-bottom:1px solid #e9e9e9;

    &:focus{
      outline: 0;
    }
  }
`;
const WColorPickerControlValue = styled.div.attrs(props => ({
    style: {
        background: props.color,
    },
})) `
  flex: 0 0 20px;
  height: 20px;
  border-radius: 50%;
`;

var Template = React.memo((props) => {
    const refCircleSelect = useRef();
    const refColorPickerBox = useRef();
    const [cCircleSelect, setCCircleSelect] = useState([50, 50]);
    let widthBox = 0;
    let heightBox = 0;
    let isMousedown = false;
    useEffect(() => {
        // Event mouse down for circle selected
        refCircleSelect.current.addEventListener('mousedown', function () {
            isMousedown = true;
        });
        // Event mouse up for circle selected
        refCircleSelect.current.addEventListener('mouseup', function () {
            if (isMousedown)
                isMousedown = false;
        });
        // Event mouse move
        refColorPickerBox.current.addEventListener('mousemove', handleMoveCircleSelect);
        // Event mouse leave
        refColorPickerBox.current.addEventListener('mouseleave', () => {
            document.addEventListener('mouseup', () => {
                if (isMousedown)
                    isMousedown = false;
            });
        });
        refColorPickerBox.current.addEventListener('click', (e) => handleMoveCircleSelect(e, true));
    }, []);
    useEffect(() => {
        /**
         * set value HSL
         */
        let { s, l } = props;
        widthBox = refColorPickerBox.current.width.baseVal.value;
        heightBox = refColorPickerBox.current.height.baseVal.value;
        // Calculating y value
        const percentY = 100 - (l / (100 - s / 2)) * 100;
        let y = (heightBox / 100) * percentY + 14;
        // Calculating x value
        let x = (widthBox / 100) * s + 14;
        setCCircleSelect([x, y]); // set position of circle select
    }, [props.h, props.s, props.l]);
    function handleMoveCircleSelect(e, isClick = false) {
        // Get offset of mouse event
        if (isMousedown || isClick) {
            const _offset = [e.offsetX, e.offsetY];
            const SPercent = Math.round(((_offset[0] - 15) / widthBox) * 100);
            // Calculating the X and Y Percent Values
            const percentX = 100 - SPercent / 2;
            const percentY = 100 - ((_offset[1] - 15) / heightBox) * 100;
            // Calculating the LPercent
            // LPercent is the the X percentage of the of the Y percentage of the dragger
            const LPercent = Math.floor((percentY / 100) * percentX);
            // setCCircleSelect(_offset);
            props.change(SPercent, LPercent);
        }
    }
    return (React.createElement(WColorPickerTemplate, null,
        React.createElement("svg", { width: '100%', height: '120' },
            React.createElement("defs", null,
                React.createElement("linearGradient", { id: 'saturation', x1: '0%', y1: '0%', x2: '100%', y2: '0%' },
                    React.createElement("stop", { offset: '0%', stopColor: '#fff' }),
                    React.createElement("stop", { offset: '100%', stopColor: `hsl(${props.h},100%,50%)` })),
                React.createElement("linearGradient", { id: 'brightness', x1: '0%', y1: '0%', x2: '0%', y2: '100%' },
                    React.createElement("stop", { offset: '0%', stopColor: 'rgba(0,0,0,0)' }),
                    React.createElement("stop", { offset: '100%', stopColor: '#000' })),
                React.createElement("pattern", { id: 'pattern_config', width: '100%', height: '100%' },
                    React.createElement("rect", { x: '0', y: '0', width: '100%', height: '100%', fill: 'url(#saturation)' }),
                    React.createElement("rect", { x: '0', y: '0', width: '100%', height: '100%', fill: 'url(#brightness)' }))),
            React.createElement("rect", { ref: refColorPickerBox, rx: '5', ry: '5', x: '1', y: '1', width: '100%', height: '100%', stroke: '#fff', strokeWidth: '2', fill: 'url(#pattern_config)' }),
            React.createElement("circle", { ref: refCircleSelect, cx: cCircleSelect[0], cy: cCircleSelect[1], r: '5', stroke: 'white', strokeWidth: '2', fill: 'transparent' }))));
});

var Slider = React.memo((props) => {
    const refSliderSelect = useRef();
    const refSliderBox = useRef();
    const [cSelect, setSelect] = useState(1);
    let isMousedownSlider = false;
    let widthBox = 0;
    useEffect(() => {
        // Event mouse down for circle selected
        refSliderSelect.current.addEventListener('mousedown', function () {
            isMousedownSlider = true;
        });
        // Event mouse up for circle selected
        refSliderSelect.current.addEventListener('mouseup', function () {
            if (isMousedownSlider)
                isMousedownSlider = false;
        });
        // Event mouse move
        refSliderBox.current.addEventListener('mousemove', handleMoveCircleSelect);
        // Event mouse leave
        refSliderBox.current.addEventListener('mouseleave', (event) => {
            document.addEventListener('mouseup', () => {
                if (isMousedownSlider)
                    isMousedownSlider = false;
            });
        });
        refSliderBox.current.addEventListener('click', (e) => handleMoveCircleSelect(e, true));
    }, []);
    useEffect(() => {
        widthBox = refSliderBox.current.width.baseVal.value;
        setSelect(convertHueToPosition(props.h));
    }, [props.h]);
    function convertPositionToHue(pos) {
        const percent = (pos / widthBox) * 100;
        // Calculating the color
        // Max number for hue colors is 359, I find the percentage of this, from the percent variable
        // I take it away from the max number because the slider should work backwards
        return Math.round(359 - (359 / 100) * percent);
    }
    function convertHueToPosition(hue) {
        let percentHue = 100 - (hue / 359) * 100;
        let pos = (widthBox / 100) * percentHue - 5;
        return pos;
    }
    function handleMoveCircleSelect(e, isClick = false) {
        let _c = e.offsetX;
        if (isClick || isMousedownSlider) {
            props.change(convertPositionToHue(_c));
            // setSelect(_c);
        }
    }
    return (React.createElement(WColorPickerBar, null,
        React.createElement("svg", { width: '100%', height: '26' },
            React.createElement("defs", null,
                React.createElement("linearGradient", { id: 'hue', x1: '100%', y1: '0%', x2: '0%', y2: '0%' },
                    React.createElement("stop", { offset: '0%', stopColor: '#f00' }),
                    React.createElement("stop", { offset: '16.666%', stopColor: '#ff0' }),
                    React.createElement("stop", { offset: '33.333%', stopColor: '#0f0' }),
                    React.createElement("stop", { offset: '50%', stopColor: '#0ff' }),
                    React.createElement("stop", { offset: '66.666%', stopColor: '#00f' }),
                    React.createElement("stop", { offset: '83.333%', stopColor: '#f0f' }),
                    React.createElement("stop", { offset: '100%', stopColor: '#f00' }))),
            React.createElement("rect", { ref: refSliderBox, rx: '5', ry: '5', x: '0', y: '1', width: '100%', height: '20', stroke: '#fff', strokeWidth: '2', fill: 'url(#hue)' }),
            React.createElement("rect", { ref: refSliderSelect, width: '5', height: '22', stroke: '#000', strokeWidth: '2', fill: 'transparent', rx: '5', ry: '5', x: cSelect, y: '0' }))));
});

/*
 * Color Value Converter
 */
// Convert HSLA to RGBA
let HSLAToRGBA = function (h, s, l, a, toHex) {
    s /= 100;
    l /= 100;
    let c = (1 - Math.abs(2 * l - 1)) * s, x = c * (1 - Math.abs(((h / 60) % 2) - 1)), m = l - c / 2, r = 0, g = 0, b = 0;
    if (0 <= h && h < 60) {
        r = c;
        g = x;
        b = 0;
    }
    else if (60 <= h && h < 120) {
        r = x;
        g = c;
        b = 0;
    }
    else if (120 <= h && h < 180) {
        r = 0;
        g = c;
        b = x;
    }
    else if (180 <= h && h < 240) {
        r = 0;
        g = x;
        b = c;
    }
    else if (240 <= h && h < 300) {
        r = x;
        g = 0;
        b = c;
    }
    else if (300 <= h && h < 360) {
        r = c;
        g = 0;
        b = x;
    }
    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);
    if (toHex === true) {
        return RGBAToHexA(r, g, b, a);
    }
    else {
        return {
            r: r,
            g: g,
            b: b,
            a: a
        };
    }
};
// Convert RGBA to HSLA
let RGBAToHSLA = function (r, g, b, a) {
    r /= 255;
    g /= 255;
    b /= 255;
    a = a == undefined ? 1 : a;
    let cmin = Math.min(r, g, b), cmax = Math.max(r, g, b), delta = cmax - cmin, h = 0, s = 0, l = 0;
    if (delta == 0)
        h = 0;
    else if (cmax == r)
        h = ((g - b) / delta) % 6;
    else if (cmax == g)
        h = (b - r) / delta + 2;
    else
        h = (r - g) / delta + 4;
    h = Math.round(h * 60);
    if (h < 0)
        h += 360;
    l = (cmax + cmin) / 2;
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);
    return {
        h: h,
        s: s,
        l: l,
        a: a
    };
};
// Convert RGBA to HexA
let RGBAToHexA = function (r, g, b, a) {
    let _r = r.toString(16);
    let _g = g.toString(16);
    let _b = b.toString(16);
    let _a = Math.round(a * 255).toString(16);
    if (_r.length == 1)
        _r = '0' + _r;
    if (_g.length == 1)
        _g = '0' + _g;
    if (_b.length == 1)
        _b = '0' + _b;
    if (_a.length == 1)
        _a = '0' + _a;
    if (_a == 'ff') {
        return '#' + _r + _g + _b;
    }
    else {
        return '#' + r + g + -b + _a;
    }
};
// Convert HexA to RGBA
let hexAToRGBA = function (h, toHSL) {
    if (h.length == 7)
        h += 'ff';
    else if (h.length == 4)
        h += h.substring(1, 4) + 'ff';
    let r = 0, g = 0, b = 0, a = 1;
    if (h.length == 5) {
        r = '0x' + h[1] + h[1];
        g = '0x' + h[2] + h[2];
        b = '0x' + h[3] + h[3];
        a = '0x' + h[4] + h[4];
    }
    else if (h.length == 9) {
        r = '0x' + h[1] + h[2];
        g = '0x' + h[3] + h[4];
        b = '0x' + h[5] + h[6];
        a = '0x' + h[7] + h[8];
    }
    a = +(a / 255).toFixed(3);
    if (toHSL === true) {
        return RGBAToHSLA(+r, +g, +b, a);
    }
    else {
        return 'rgba(' + +r + ',' + +g + ',' + +b + ',' + a + ')';
    }
};

var Control = React.memo((props) => {
    const [value, setValue] = useState('');
    const [focus, setFocus] = useState(false);
    const refInput = useRef();
    useEffect(() => {
        let { h, s, l } = props;
        if (!focus) {
            setValue(HSLAToRGBA(h, s, l, 1, true));
        }
    }, [props.h, props.s, props.l]);
    function handleChange(e) {
        let _value = e.target.value;
        let hsl = hexAToRGBA(_value, true);
        if (_value.match(/^(#[0-9a-fA-F]{6})|(#[0-9a-fA-F]{3})$/)) {
            props.change(hsl);
            refInput.current.style.borderColor = '#e9e9e9';
        }
        else {
            refInput.current.style.borderColor = 'red';
        }
        setValue(_value);
    }
    return (React.createElement(WColorPickerControl, null,
        React.createElement(WColorPickerControlValue, { color: value }),
        React.createElement("label", { htmlFor: 'wColorPickerValueHEX' }, " HEX "),
        React.createElement("input", { ref: refInput, type: 'text', id: 'wColorPickerValueHEX', value: value, onFocus: () => setFocus(true), onBlur: () => setFocus(false), onChange: handleChange })));
});

var ColorPicker = React.memo((props) => {
    const [hue, setHue] = useState(0);
    const [saturation, setSaturation] = useState(12);
    const [lightness, setLightness] = useState(47);
    useEffect(() => {
        props.hex(HSLAToRGBA(hue, saturation, lightness, 1, true)); // Return color for parent component
    }, [hue, saturation, lightness]);
    const changeColorSL = (s, l) => {
        setSaturation(s);
        setLightness(l);
    };
    const changeColorHex = (_hsl) => {
        setHue(_hsl.h);
        setSaturation(_hsl.s);
        setLightness(_hsl.l);
    };
    const changeColorHue = (h) => {
        setHue(h);
    };
    return (React.createElement(WColorPicker, null,
        React.createElement(WColorHeading, null, _t('Color picker')),
        React.createElement(Template, { h: hue, s: saturation, l: lightness, change: changeColorSL }),
        React.createElement(Slider, { h: hue, change: changeColorHue }),
        React.createElement(Control, { h: hue, s: saturation, l: lightness, change: changeColorHex })));
});

var Selector = React.memo((props) => {
    const [hex, setHex] = useState('#866969');
    const template = [
        '#54478c',
        '#2c699a',
        '#048ba8',
        '#0db39e',
        '#16db93',
        '#83e377',
        '#b9e769',
        '#efea5a',
        '#f1c453',
        '#f29e4c',
    ];
    const [colour, setColour] = useState([]);
    const [value, setValue] = useState(props.select || '#54478c');
    useEffect(() => {
        let _colour = [];
        if (localStorage.getItem('colour')) {
            _colour = _colour.concat(localStorage.getItem('colour').split(','));
        }
        setColour(_colour);
    }, []);
    useEffect(() => {
        props.fnSelected(value);
    }, [value]);
    function addToLocalStorage(color) {
        if (localStorage.getItem('colour')) {
            let _colour = localStorage.getItem('colour');
            localStorage.setItem('colour', _colour.concat(',', color));
        }
        else {
            localStorage.setItem('colour', color);
        }
    }
    function addColour(color) {
        setValue(color);
        if (template.indexOf(color) < 0 && colour.indexOf(color) < 0) {
            let _colour = [...colour, color];
            setColour(_colour);
            addToLocalStorage(color);
        }
    }
    function removeInLocalStorage(color) {
        let _colour = localStorage.getItem('colour');
        _colour = _colour.replace(color, '').replace(/(,,)/, ',');
        _colour = _colour[0] === ',' ? _colour.slice(1, _colour.length) : _colour;
        _colour =
            _colour[_colour.length - 1] === ','
                ? _colour.slice(0, _colour.length - 1)
                : _colour;
        localStorage.setItem('colour', _colour);
    }
    function removeColour(color) {
        let _colour = [...colour].filter((item) => item !== color);
        setColour(_colour);
        setValue('#54478c');
        removeInLocalStorage(color);
    }
    function selectColor(color) {
        setValue(color);
        props.fnSelected(color);
    }
    return (React.createElement(WColor, { dark: !!props.dark },
        React.createElement(ColorPicker, { hex: (color) => setHex(color) }),
        React.createElement(WColorHeading, null,
            _t('Recent'),
            React.createElement(WColorAdd, { type: 'button', onClick: () => addColour(hex) },
                React.createElement("img", { src: img, alt: 'w-color' }))),
        React.createElement(Container, { colour: [...template, ...colour], select: value, fnSelected: selectColor, fnRemove: removeColour })));
});

function App(props) {
    const [value, setValue] = useState("#54478c");
    const [show, setShow] = useState(false);
    const refWrap = useRef();
    const refMenu = useRef();
    const posScreen = useMemo(() => ({
        x: 0,
        y: 0,
        height: window.innerHeight,
        width: window.innerWidth,
    }), []);
    /**
     * @param e
     */
    const handleClick = useCallback((e) => {
        const path = e.path || (e.composedPath && e.composedPath()) || [];
        // Hide path when click outside
        !path.some((item) => refWrap.current.contains(item.parentNode)) &&
            hiddenDropdownWhenClick();
    }, []);
    /**
     */
    const hiddenDropdownWhenClick = useCallback(() => {
        setShow(false);
        document.removeEventListener("mouseup", handleClick);
    }, [handleClick]);
    const handleChange = useCallback((color) => {
        setValue(color);
        props.onChange(color);
    }, [props.onChange]);
    useEffect(() => {
        function display() {
            var _a;
            if (((_a = refMenu === null || refMenu === void 0 ? void 0 : refMenu.current) === null || _a === void 0 ? void 0 : _a.clientHeight) > 0) {
                const posElement = refMenu.current.getBoundingClientRect();
                let transform = [];
                let transformOriginY = "left";
                let transformOriginX = "top";
                if (posElement.x < 0) {
                    transform.push("translateX(100%)");
                    transformOriginY = "top";
                }
                else if (posElement.right > posScreen.width - 10) {
                    transform.push("translateX(-100%)");
                    transformOriginY = "bottom";
                }
                if (posElement.top < 0) {
                    transform.push(`translateY(calc(100% + ${props.height || 35})`);
                    transformOriginX = "left";
                }
                else if (posElement.bottom > posScreen.height) {
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
    return (React.createElement(MainWrap, { ref: refWrap },
        React.createElement(MainValue, { color: value, height: props.height || 30, width: props.width || 30, onClick: () => setShow(!show) }),
        show && (React.createElement(MainSelector, { ref: refMenu, show: true },
            React.createElement(Selector, { fnSelected: handleChange, select: value })))));
}
const MainWrap = styled.div `
  display: block;
  overflow: hidden;
`;
const MainValue = styled.div `
  cursor: pointer;
  border-radius: 5px;
  ${(props) => `
    width: ${props.width}px;
    height: ${props.height}px;
    background-color: ${props.color};
  `}
`;
const MainSelector = styled.div `
  position: absolute;
  z-index: -1;
  visibility: hidden;

  ${({ show }) => show &&
    `
    z-index: 999;
  `};
`;

export default App;
//# sourceMappingURL=index.es.js.map
