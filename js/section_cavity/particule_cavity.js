function particule_cavity(E,x,y,l,d,a,color) {
  this.E=E;
  this.id="C0";
  this.x=x;
  this.y=y;
  this.x_f=x+l*Math.cos(a);
  this.y_f=y+l*Math.sin(a);
  this.x_p=x+l/2*Math.cos(a); // center position of the particule creation
  this.y_p=y+l/2*Math.sin(a);
  this.l=l;
  this.d=d;
  this.a=a;
  this.a_f=a;
  this.p=[];
  this.color=color;

  this.start_point=function(bloc) {
    this.x_f=this.x+this.l*Math.cos(a);
    this.y_f=this.y+this.l*Math.sin(a);

    // center of production of particule
    this.x_p=this.x+this.l/2*Math.cos(a);
    this.y_p=this.y+this.l/2*Math.sin(a);

    const x1=this.x+this.d/2*Math.sin(this.a),y1=this.y-this.d/2*Math.cos(this.a);
    this.p.push([x1,y1]);
    const x2=x1+this.l*Math.cos(this.a),y2=y1+this.l*Math.sin(this.a);
    this.p.push([x2,y2]);
    const x3=x2-this.d*Math.sin(this.a),y3=y2+this.d*Math.cos(this.a);
    this.p.push([x3,y3]);
    const x4=x3-this.l*Math.cos(this.a),y4=y3-this.l*Math.sin(this.a);
    this.p.push([x4,y4]);
  }

  this.plot=function(ctx) {
    const p=this.p;
    const x1=p[0][0],y1=p[0][1];
    const x2=p[1][0],y2=p[1][1];
    const x3=p[2][0],y3=p[2][1];
    const x4=p[3][0],y4=p[3][1];

    draw_circle(context,this.x,this.y,2,"red");
    draw_circle(context,this.x_f,this.y_f,2,"green");

    draw_single_line(ctx,x1,y1,x2,y2,this.color);
    draw_single_line(ctx,x2,y2,x3,y3,this.color);
    draw_single_line(ctx,x3,y3,x4,y4,this.color);
    draw_single_line(ctx,x4,y4,x1,y1,this.color);
  }

  this.inside=function(x,y) {
    if (inside_polygon(x,y,this.p)==1) {
      return(1);
    }
    else {return(0);}
  }
}
