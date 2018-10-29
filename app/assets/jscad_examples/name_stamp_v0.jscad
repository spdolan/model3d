// title: Basic Stamp
// author: Sean Dolan
// license: MIT License
// description: testing solidCylinderToStamp

function getParameterDefinitions() {
  return [
  { name: 'text', initial: 'SPD', type: 'text', caption: 'Insignia: '},
    { name: 'thickness', initial: 3, type: 'float', caption: 'Text Thickness: '},
  { name: 'height', caption: 'Height: ', type: 'float', default: 20 },
  ];
}

function main(param) {
  var o = []; // our stack of objects
  var l = []; // our stack of line segments (when rendering vector text)
  var p = []; // our stack of extruded line segments

  // -- render name & extrude
  l = vector_text(0, 0, param.text);
  
  l.forEach(function (s) {
    p.push(rectangular_extrude(s, {w: param.thickness, h: param.thickness}).rotateY(180));
  });
  o.push(union(p).setColor([1, 1, 0]).scale([1 / 3, 1 / 3, 1 / 3]).center([true, true, false]).translate([0, 0, param.height+(param.thickness/3)]));

 //o = [union(o)]; // neat: we combine name + title, and make it first entry of an array

 var b = o[0].getBounds();
 var m = 2;
 var w = b[1].x - b[0].x + m * 2;
 var h = b[1].y - b[0].y + m * 2;
 
 //create stacked cylinders for stamp body
 var seg = 6;
 o.push(cylinder({r1: w/3, r2: w/3, h: param.height/seg}).setColor(css2rgb('dodgerblue')).translate([0, 0, 0]));
 o.push(cylinder({r1: w/3, r2: w/4, h: param.height/seg}).setColor(css2rgb('dodgerblue')).translate([0, 0, param.height * (1/seg)]));
 o.push(cylinder({r1: w/4, r2: w/4, h: param.height/seg}).setColor(css2rgb('dodgerblue')).translate([0, 0, param.height * (2 * (1/seg))]));
 o.push(cylinder({r1: w/4, r2: w/3, h: param.height/seg}).setColor(css2rgb('dodgerblue')).translate([0, 0, param.height * (3 * (1/seg))]));
 o.push(cylinder({r1: w/3, r2: w/2, h: param.height/seg}).setColor(css2rgb('dodgerblue')).translate([0, 0, param.height * (4 * (1/seg))]));
 o.push(cylinder({r1: w/2, r2: w/2, h: param.height/seg}).setColor(css2rgb('dodgerblue')).translate([0, 0, param.height * (5 * (1/seg))]));
 
 return union(o);
  
}