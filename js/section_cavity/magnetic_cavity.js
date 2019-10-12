function magnetic_cavity(B,r,theta,d,color) {
  this.B=B;
  this.id="B";
  this.x;
  this.y;
  this.x_f;
  this.y_f;
  this.x_c;
  this.y_c;
  this.r=r;
  this.theta=theta; // give a negative angle to turn the cavity left and positive to turn the cavity right
  this.d=d;
  this.a; // direction angle at the entry of the cavity
  this.a_f; // direction angle at the exit of the cavity
  this.p=[];
  this.color=color;

  this.start_point=function(bloc) { // find the begin point and the end point of the sector
    const x=bloc.x_f,y=bloc.y_f,a=bloc.a_f;
    this.x=x;
    this.y=y;
    this.a=a;
    if (this.theta<0) {this.r=-Math.abs(this.r);}
    else {this.r=Math.abs(this.r)};

    this.x_f=x-this.r*Math.sin(a)+this.r*Math.sin(a+this.theta);
    this.y_f=y+this.r*Math.cos(a)-this.r*Math.cos(a+this.theta);
    this.a_f=(2*Math.PI+a+this.theta)%(2*Math.PI);
    this.x_c=x-this.r*Math.sin(a);
    this.y_c=y+this.r*Math.cos(a);

    const x1=this.x+this.d/2*Math.sin(this.a),y1=this.y-this.d/2*Math.cos(this.a);
    const x4=this.x-this.d/2*Math.sin(this.a),y4=this.y+this.d/2*Math.cos(this.a);
    const x2=this.x_f+this.d/2*Math.sin(this.a+this.theta),y2=this.y_f-this.d/2*Math.cos(this.a+this.theta);
    const x3=this.x_f-this.d/2*Math.sin(this.a+this.theta),y3=this.y_f+this.d/2*Math.cos(this.a+this.theta);

    if (this.theta<0) {
      const x5=x4-(-this.r+this.d/2)*Math.tan(this.theta/2)*Math.cos(this.a),y5=y4+(-this.r+this.d/2)*Math.tan(this.theta/2)*Math.sin(this.a);
      this.p.push([x1,y1]);
      this.p.push([this.x_c,this.y_c]);
      this.p.push([x2,y2]);
      this.p.push([x3,y3]);
      this.p.push([x5,y5]);
      this.p.push([x4,y4]);
    }
    else {
      const x5=x1+(this.r+this.d/2)*Math.tan(this.theta/2)*Math.cos(this.a),y5=y1+(this.r+this.d/2)*Math.tan(this.theta/2)*Math.sin(this.a);
      this.p.push([x4,y4]);
      this.p.push([this.x_c,this.y_c]);
      this.p.push([x3,y3]);
      this.p.push([x2,y2]);
      this.p.push([x5,y5]);
      this.p.push([x1,y1]);
    }
  }

  this.center=function() { // plot point center and others
    draw_circle(context,this.x,this.y,2,"red");
    draw_circle(context,this.x_c,this.y_c,2,this.color);
    draw_circle(context,this.x_f,this.y_f,2,"green");
  }

  this.plot=function(ctx) {
    if (this.theta<0) {
      const p=this.p;
      const x1=p[0][0],y1=p[0][1];
      const x2=p[2][0],y2=p[2][1];
      const x3=p[3][0],y3=p[3][1];
      const x4=p[5][0],y4=p[5][1];
      const x5=p[4][0],y5=p[4][1];

      draw_single_line(ctx,x4,y4,x1,y1,this.color);
      draw_single_line(ctx,x2,y2,x3,y3,this.color);
      draw_arc(ctx,this.x_c,this.y_c,Math.abs(this.r+this.d/2),Math.PI/2+this.a+this.theta,-this.theta,this.color);
      draw_arc(ctx,this.x_c,this.y_c,Math.abs(this.r-this.d/2),Math.PI/2+this.a+this.theta,-this.theta,this.color);
      draw_circle(ctx,this.x_c,this.y_c,2,"red");
      draw_circle(ctx,x4,y4,2,"red");
      draw_circle(ctx,x5,y5,2,"red");
    }
    else {
      const p=this.p;
      const x1=p[5][0],y1=p[5][1];
      const x2=p[3][0],y2=p[3][1];
      const x3=p[2][0],y3=p[2][1];
      const x4=p[0][0],y4=p[0][1];
      const x5=p[4][0],y5=p[4][1];

      draw_single_line(ctx,x4,y4,x1,y1,this.color);
      draw_single_line(ctx,x2,y2,x3,y3,this.color);
      draw_arc(ctx,this.x_c,this.y_c,Math.abs(this.r+this.d/2),-Math.PI/2+this.a,this.theta,this.color);
      draw_arc(ctx,this.x_c,this.y_c,Math.abs(this.r-this.d/2),-Math.PI/2+this.a,this.theta,this.color);
      draw_circle(ctx,this.x_c,this.y_c,2,"red");
      draw_circle(ctx,x1,y1,2,"red");
      draw_circle(ctx,x2,y2,2,"yellow");
      draw_circle(ctx,x5,y5,2,"red");
    }
  }

  this.inside=function(x,y) {
    if (inBlock_magn(x,y,this.p)==1) {
      return(1);
    }
    else {return(0);}
  }

  this.change_magnetic_field=function(v_p,m,q,R) { // adapt the two magnetic fields to correct the trajectory
    if (R==undefined) {
      this.B=-m*v_p/(q*this.r);
    }
    else {
      this.B=-m*v_p/(q*R);
    }
  }
}
