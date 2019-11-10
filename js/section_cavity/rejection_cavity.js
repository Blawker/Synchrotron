function rejection_cavity(B,l1,l2,theta,d,color) { // insertion & rejection
  this.B=B;
  this.state=1;
    // 0: the magnetic field is not active, insertion possible
    // 1: the magnetic field is active, insersion possible
  this.id="R";
  this.x;
  this.y;
  this.a;
  this.d=d;
  this.theta=theta;
  this.l1=l1;
  this.l2=l1/2;
  this.x_c; // center of the sector
  this.y_c;
  this.x_f; // link coordonnates
  this.y_f;
  this.x_e; // exit coordonnates
  this.y_e;
  this.a_f;
  this.p=[];
  this.color=color;

  this.start_point=function(bloc) {
    const x=bloc.x_f,y=bloc.y_f,a=bloc.a_f;
    this.x=x;
    this.y=y;
    this.a=a;
    // Point to exit the Synchrotron
    this.x_e=x+this.l1*Math.cos(a);
    this.y_e=y+this.l1*Math.sin(a);

    /*if (this.theta<0) {this.r=-Math.abs(this.r);}
    else {this.r=Math.abs(this.r)};*/

    this.x_f=x+this.l2*Math.cos(a)-this.l1/2*Math.cos(a+this.theta);
    this.y_f=y+this.l2*Math.sin(a)-this.l1/2*Math.sin(a+this.theta);
    this.a_f=modulo(Math.PI+a+this.theta,2*Math.PI);
    /*this.x_f=x+this.l1*Math.cos(a);
    this.y_f=y+this.l1*Math.sin(a);
    this.a_f=a+this.theta;*/
    this.x_c=x+this.l2*Math.cos(a);
    this.y_c=y+this.l2*Math.sin(a);

    const r_ext=Math.abs(this.l1/2*Math.tan(Math.abs(this.theta/2))-this.d/2);
    const r_int=Math.abs(this.l1/2*Math.tan(Math.abs(Math.PI/2+this.theta/2))-this.d/2);

    const x1=this.x-this.d/2*Math.sin(this.a),y1=this.y+this.d/2*Math.cos(this.a);
    //const x2=x1+(this.l2-this.d/(2*Math.abs(Math.tan(this.theta/2))))*Math.cos(this.a),y2=y1+(this.l2-this.d/(2*Math.abs(Math.tan(this.theta/2))))*Math.sin(this.a);
    const x2=x1-r_ext*Math.sin(this.a),y2=y1+r_ext*Math.cos(this.a);
    this.p.push([x1,y1]);
    this.p.push([x2,y2]);
    //const x3=x2-(this.l1/2-this.d/(2*Math.abs(Math.tan(this.theta/2))))*Math.cos(this.theta+this.a),y3=y2-(this.l1/2-this.d/(2*Math.abs(Math.tan(this.theta/2))))*Math.sin(this.theta+this.a);
    const x3=x2-r_ext*Math.sin(this.theta+this.a),y3=y2+r_ext*Math.cos(this.theta+this.a);
    this.p.push([x3,y3]);
    const x4=x3-this.d*Math.sin(this.theta+this.a),y4=y3+this.d*Math.cos(this.theta+this.a);
    this.p.push([x4,y4]);
    //const x5=x4+(this.l1/2-this.d/(2*Math.abs(Math.tan(Math.PI/2-this.theta/2))))*Math.cos(this.theta+this.a),y5=y4+(this.l1/2-this.d/(2*Math.abs(Math.tan(Math.PI/2-this.theta/2))))*Math.sin(this.theta+this.a);
    const x5=x4-r_int*Math.sin(this.theta+this.a),y5=y4+r_int*Math.cos(this.theta+this.a);
    this.p.push([x5,y5]);
    const x6=x1+this.l1*Math.cos(this.a),y6=y1+this.l1*Math.sin(this.a);
    this.p.push([x6,y6]);
    const x7=x6+this.d*Math.sin(this.a),y7=y6-this.d*Math.cos(this.a);
    this.p.push([x7,y7]);
    const x8=this.x+this.d/2*Math.sin(this.a),y8=this.y-this.d/2*Math.cos(this.a);
    this.p.push([x8,y8]);
  }

  /*this.plot=function(ctx) {
    draw_circle(context,this.x,this.y,2,"red");
    draw_circle(context,this.x_c,this.y_c,2,"yellow");
    draw_circle(context,this.x_f,this.y_f,2,"green");

    const x1=this.x-this.d/2*Math.sin(this.a),y1=this.y+this.d/2*Math.cos(this.a);
    const x2=x1+(this.l2-this.d/(2*Math.abs(Math.tan(this.theta/2))))*Math.cos(this.a),y2=y1+(this.l2-this.d/(2*Math.abs(Math.tan(this.theta/2))))*Math.sin(this.a);
    this.p.push([x1,y1]);
    this.p.push([x2,y2]);
    draw_single_line(ctx,x1,y1,x2,y2,this.color);
    const x3=x2-(this.l1/2-this.d/(2*Math.abs(Math.tan(this.theta/2))))*Math.cos(this.theta+this.a),y3=y2-(this.l1/2-this.d/(2*Math.abs(Math.tan(this.theta/2))))*Math.sin(this.theta+this.a);
    this.p.push([x3,y3]);
    draw_single_line(ctx,x2,y2,x3,y3,this.color);
    const x4=x3-this.d*Math.sin(this.theta+this.a),y4=y3+this.d*Math.cos(this.theta+this.a);
    this.p.push([x4,y4]);
    draw_single_line(ctx,x3,y3,x4,y4,this.color);
    const x5=x4+this.l1*Math.cos(this.theta+this.a),y5=y4+this.l1*Math.sin(this.theta+this.a);
    this.p.push([x5,y5]);
    draw_single_line(ctx,x4,y4,x5,y5,this.color);
    const x6=x5+this.d*Math.sin(this.theta+this.a),y6=y5-this.d*Math.cos(this.theta+this.a);
    this.p.push([x6,y6]);
    draw_single_line(ctx,x5,y5,x6,y6,this.color);
    const x7=x6-(this.l1/2-this.d/(2*Math.abs(Math.tan(Math.PI/2-this.theta/2))))*Math.cos(this.theta+this.a),y7=y6-(this.l1/2-this.d/(2*Math.abs(Math.tan(Math.PI/2-this.theta/2))))*Math.sin(this.theta+this.a);
    this.p.push([x7,y7]);
    draw_single_line(ctx,x6,y6,x7,y7,this.color);
    const x8=this.x+this.d/2*Math.sin(this.a),y8=this.y-this.d/2*Math.cos(this.a);
    this.p.push([x8,y8]);
    draw_single_line(ctx,x7,y7,x8,y8,this.color);
    draw_single_line(ctx,x8,y8,x1,y1,this.color);
  }*/

  this.plot=function(ctx) {
    const p=this.p;
    const r_ext=Math.abs(this.l1/2*Math.tan(Math.abs(this.theta/2))-this.d/2);
    const r_int=Math.abs(this.l1/2*Math.tan(Math.abs(Math.PI/2+this.theta/2))-this.d/2);

    //draw_circle(ctx,this.x,this.y,2,"red");
    //draw_circle(ctx,this.x_c,this.y_c,2,"yellow");
    //draw_circle(ctx,this.x_f,this.y_f,2,"green");

    const x1=p[0][0],y1=p[0][1];
    const x2=p[1][0],y2=p[1][1];
    const x3=p[2][0],y3=p[2][1];
    const x4=p[3][0],y4=p[3][1];
    const x5=p[4][0],y5=p[4][1];
    const x6=p[5][0],y6=p[5][1];
    const x7=p[6][0],y7=p[6][1];
    const x8=p[7][0],y8=p[7][1];

    draw_single_line(ctx,x3,y3,x4,y4,this.color);
    draw_single_line(ctx,x6,y6,x7,y7,this.color);
    draw_single_line(ctx,x7,y7,x8,y8,this.color);
    draw_single_line(ctx,x8,y8,x1,y1,this.color);

    draw_arc(ctx,x2,y2,r_ext,-Math.PI/2+this.a,Math.PI-Math.abs(this.theta),this.color);
    draw_arc(ctx,x5,y5,r_int,this.a+this.theta-Math.PI/2,Math.abs(this.theta),this.color);
    //draw_circle(ctx,x2,y2,2,"green");
    //draw_circle(ctx,x5,y5,2,"red");

    //draw_circle(ctx,x7,y7,2,"green");

    //draw_circle(ctx,this.x_e,this.y_e,2,"green");
  }

  this.inside=function(x,y) { // check if a point is inside the cavity
    const r_ext=this.l1/2*Math.tan(Math.abs(this.theta/2))-this.d/2;
    const r_int=this.l1/2*Math.tan(Math.abs(Math.PI/2+this.theta/2))-this.d/2;
    if (inside_polygon(x,y,this.p)==1) {
      if (norme(x-this.p[1][0],y-this.p[1][1])>=r_ext && norme(x-this.p[4][0],y-this.p[4][1])>=r_int) {
        return(1);
      }
      else {return(0);}
    }
    else {return(0);}
  }

  this.switch_state=function() {
    if (this.state==1) {
      this.state=0;
      document.getElementById("text_state_rejection_exit").innerHTML="ON";
    }
    else if (this.state==0) {
      this.state=1;
      document.getElementById("text_state_rejection_exit").innerHTML="OFF";
    }
    console.log(this.state);
  }

  this.change_magnetic_field=function(v_p,m,q) {
    if (this.state==1) {
      const r=this.l1/2*Math.tan(Math.abs(this.theta/2));
      this.B=this.theta/Math.abs(this.theta)*m*v_p/(q*r);
    }
    else if (this.state==0){
      this.B=0;
    }
  }
}
