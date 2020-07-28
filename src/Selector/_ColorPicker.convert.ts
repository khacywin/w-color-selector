/*
 * Color Value Converter
 */

// Convert HSLA to RGBA
let HSLAToRGBA: any = function (h: number, s: number, l: number, a: number, toHex: boolean) {
  s /= 100;
  l /= 100;

  let c = (1 - Math.abs(2 * l - 1)) * s,
    x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
    m = l - c / 2,
    r = 0,
    g = 0,
    b = 0;

  if (0 <= h && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= h && h < 360) {
    r = c;
    g = 0;
    b = x;
  }

  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  if (toHex === true) {
    return RGBAToHexA(r, g, b, a);
  } else {
    return {
      r: r,
      g: g,
      b: b,
      a: a
    };
  }
};

// Convert RGBA to HSLA
let RGBAToHSLA: any = function (r: number, g: number, b: number, a: number) {
  r /= 255;
  g /= 255;
  b /= 255;
  a = a == undefined ? 1 : a;

  let cmin = Math.min(r, g, b),
    cmax = Math.max(r, g, b),
    delta = cmax - cmin,
    h = 0,
    s = 0,
    l = 0;

  if (delta == 0) h = 0;
  else if (cmax == r) h = ((g - b) / delta) % 6;
  else if (cmax == g) h = (b - r) / delta + 2;
  else h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  if (h < 0) h += 360;

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
let RGBAToHexA: any = function (r: number, g: number, b: number, a: number) {
  let _r: string = r.toString(16);
  let _g: string = g.toString(16);
  let _b: string = b.toString(16);
  let _a: string = Math.round(a * 255).toString(16);

  if (_r.length == 1) _r = '0' + _r;
  if (_g.length == 1) _g = '0' + _g;
  if (_b.length == 1) _b = '0' + _b;
  if (_a.length == 1) _a = '0' + _a;

  if (_a == 'ff') {
    return '#' + _r + _g + _b;
  } else {
    return '#' + r + g + -b + _a;
  }
};

// Convert HexA to RGBA
let hexAToRGBA: any = function (h: string, toHSL: boolean) {
  if (h.length == 7) h += 'ff';
  else if (h.length == 4) h += h.substring(1, 4) + 'ff';

  let r: any = 0,
    g: any = 0,
    b: any = 0,
    a: any = 1;

  if (h.length == 5) {
    r = '0x' + h[1] + h[1];
    g = '0x' + h[2] + h[2];
    b = '0x' + h[3] + h[3];
    a = '0x' + h[4] + h[4];
  } else if (h.length == 9) {
    r = '0x' + h[1] + h[2];
    g = '0x' + h[3] + h[4];
    b = '0x' + h[5] + h[6];
    a = '0x' + h[7] + h[8];
  }

  a = +(a / 255).toFixed(3);

  if (toHSL === true) {
    return RGBAToHSLA(+r, +g, +b, a);
  } else {
    return 'rgba(' + +r + ',' + +g + ',' + +b + ',' + a + ')';
  }
};

export {
  HSLAToRGBA,
  RGBAToHSLA,
  RGBAToHexA,
  hexAToRGBA
}
