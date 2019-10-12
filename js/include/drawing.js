function draw_single_line(context,x1,y1,x2,y2,color) {
  context.fillStyle=color;
  context.strokeStyle=color;
  context.beginPath();
  context.moveTo(x1,y1);
  context.lineTo(x2,y2);
  context.stroke();
}

function draw_circle(context,x,y,r,color) {
  context.fillStyle=color;
  context.strokeStyle=color;
  context.beginPath();
  context.arc(x,y,r,0,2*Math.PI);
  context.stroke();
}

function draw_arc(context,x,y,r,a1,a2,color) { // a1=offset angle; a2=angle of the arc
  context.fillStyle=color;
  context.strokeStyle=color;
  context.beginPath();
  context.arc(x,y,r,a1,a1+a2);
  context.stroke();
}

function draw_text(context,text,x,y,color,size) {
  context.fillStyle=color;
  context.strokeStyle=color;
  context.font=String(size)+'px helvetica';
  context.fillText(text,x,y);
}
