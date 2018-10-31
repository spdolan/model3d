// title      : Name Plate
// author     : Sean Dolan
// license    : MIT License
// description: magnet with text
// date       : 2018/10/31
// file       : name_magnet_v0.jscad

function getParameterDefinitions () {
  return [
    {name: 'text', initial: 'I <3 Model3d', type: 'text', caption: 'Your Text', size: 30},
    {name: 'title', initial: '', type: 'text', caption: 'Your Subtext', size: 30},
    {name: 'thickness', initial: 3, type: 'float', caption: 'Thickness'}
  ];
}

function main (param) {
  var o = []; // our stack of objects
  var l = []; // our stack of line segments (when rendering vector text)
  var p = []; // our stack of extruded line segments

  // -- render name & extrude
  l = vector_text(0, 0, param.text);
  l.forEach(function (s) {
    p.push(rectangular_extrude(s, {w: param.thickness, h: param.thickness}));
  });
  o.push(union(p).setColor([0.2, 0.8, 0]).scale([1 / 3, 1 / 3, 1 / 3]).center([true, true, false]).translate([0, 0, param.thickness]));

  if (param.title.length) {
    // -- render title & extrude
    l = vector_text(0, 0, param.title);
    p = [];
    l.forEach(function (s) {
      p.push(rectangular_extrude(s, {w: param.thickness, h: param.thickness}));
    });
    o.push(union(p).setColor([0.2, 0.8, 0]).scale([1 / 8, 1 / 8, 1 / 3]).center([true, true, false]).translate([0, -8, param.thickness]));
  }
  o = [union(o)]; // neat: we combine name + title, and make it first entry of an array

  var b = o[0].getBounds();
  var m = 2;
  var w = b[1].x - b[0].x + m * 2;
  var h = b[1].y - b[0].y + m * 2;

  o.push(difference(
      cylinder({r1: w/2, r2: w/2, h: param.thickness}),
      cylinder({r1: w/4, r2: w/4, h: (param.thickness - (param.thickness * .1))})));


  return union(o);
}
