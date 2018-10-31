// title      : Name Plate
// author     : Sean Dolan/Rene K. Mueller
// license    : MIT License
// description: create your own name plate
// date       : 2018/10/27
// file       : name_keychain_v0.jscad

function getParameterDefinitions () {
  return [
    {name: 'text', initial: 'Sean Dolan', type: 'text', caption: 'Your name', size: 30},
    {name: 'title', initial: 'Ruby on Rails Developer', type: 'text', caption: 'Your title', size: 30},
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
      cube({size: [w, h, param.thickness], round: true, radius: 0.5}).translate([b[0].x - m, b[0].y - m, 0]),
      cylinder({r1: h/10, r2: h/10, h: param.thickness}).translate([b[0].x + m, b[0].y + m, 0])
      ).setColor([0.6, 0.1, 0.7]));

  return union(o);
}
