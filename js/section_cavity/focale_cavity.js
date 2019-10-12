function focale_cavity(B1,B2,l,d,color) {
  this.B1=B1;
  this.B2=B2;
  this.id="F";
  this.x;
  this.y;
  this.x_f;
  this.y_f;
  this.l=l;
  this.d=d;
  this.a;
  this.a_f;
  this.p=[];
  this.color=color;

  this.start_point=function(bloc) {
    const x=bloc.x_f,y=bloc.y_f,a=bloc.a_f;
    this.x=x;
    this.y=y;
    this.a=a;

    this.x_f=x+this.l*Math.cos(a);
    this.y_f=y+this.l*Math.sin(a);
    this.a_f=a;

    const x1=this.x+this.d/2*Math.sin(this.a),y1=this.y-this.d/2*Math.cos(this.a);
    this.p.push([x1,y1]);
    const xm1=x1+this.l/2*Math.cos(this.a),ym1=y1+this.l/2*Math.sin(this.a);
    this.p.push([xm1,ym1]);
    const x2=x1+this.l*Math.cos(this.a),y2=y1+this.l*Math.sin(this.a);
    this.p.push([x2,y2]);
    const x3=x2-this.d*Math.sin(this.a),y3=y2+this.d*Math.cos(this.a);
    this.p.push([x3,y3]);
    const xm2=x3-this.l/2*Math.cos(this.a),ym2=y3-this.l/2*Math.sin(this.a);
    this.p.push([xm2,ym2]);
    const x4=x3-this.l*Math.cos(this.a),y4=y3-this.l*Math.sin(this.a);
    this.p.push([x4,y4]);
  }

  this.plot=function(ctx) {
    const p=this.p;
    const x1=p[0][0],y1=p[0][1];
    const xm1=p[1][0],ym1=p[1][1];
    const x2=p[2][0],y2=p[2][1];
    const x3=p[3][0],y3=p[3][1];
    const xm2=p[4][0],ym2=p[4][1];
    const x4=p[5][0],y4=p[5][1];

    draw_circle(context,this.x,this.y,2,"red");
    draw_circle(context,this.x_f,this.y_f,2,"green");

    draw_single_line(ctx,x1,y1,x2,y2,this.color);
    draw_single_line(ctx,x2,y2,x3,y3,this.color);
    draw_single_line(ctx,xm1,ym1,xm2,ym2,this.color);
    draw_single_line(ctx,x3,y3,x4,y4,this.color);
    draw_single_line(ctx,x4,y4,x1,y1,this.color);
  }

  this.inside=function(x,y) {
    if (inside_polygon(x,y,this.p)==1) {
      return(1);
    }
    else {return(0);}
  }

  this.change_magnetic_field=function(r1,r2,v,m,q) {
    if (r1=="Infinity") { // no B1 field
      this.B1=1e-30;
    }
    else {
      this.B1=-m*v/(q*r1);
    }
    if (r2=="Infinity") { // no B2 field
      this.B2=1e-30;
    }
    else {
      this.B2=-m*v/(q*r2);
    }
  }

  /*** Make the F.a=0 or PI case ***/
  this.change_focale_field=function(ctx,x_p,y_p,a_p,v_p,q,m) { // change the strength of two join magnetic field to adapt the two magnetic fields to correct the trajectory
    let case_entry="";
    const r1_min=-10000,r1_max=10000;
    let r1_sign=+1;
    const std_exit=2;
    const angle_inside_limit=0.1;
    const side_entry_vector=modulo(vector_angle(x_p-this.x,y_p-this.y)-this.a,2*Math.PI);
    if (a_p>=Math.PI && a_p<2*Math.PI-angle_inside_limit && side_entry_vector<Math.PI) { // si coté droit et a_p>Math.PI (rentre vers le centre de la cavité)
      // B1<0 et B2=0
      case_entry="inside";
      //console.log("right inside side");
    }
    else if (a_p>angle_inside_limit && a_p<=Math.PI && side_entry_vector>Math.PI) { // si coté gauche et a_p<Math.PI (rentre vers le centre de la cavité)
      // B1>0 et B2=0
      case_entry="inside";
      //console.log("left inside side");
    }
    else if ((a_p<=Math.PI || a_p>=2*Math.PI-angle_inside_limit) && side_entry_vector<=Math.PI) { // si coté droit et a_p>Math.PI (sort de la cavité)
      // B1>0 et B2<0
      case_entry="outside";
      //console.log("right outside side");
    }
    else if ((a_p<angle_inside_limit || a_p>=Math.PI) && side_entry_vector>=Math.PI) { // si coté gauche et a_p<Math.PI (sort de la cavité)
      // B1<0 et B2>0
      case_entry="outside";
      //console.log("left outside side");
    }

    //console.log(a_p,side_entry_vector);
    //console.log(this.id,case_entry);
    //console.log(a_p,side_entry_vector*180/Math.PI,this.a);
    if (this.a!=0 && this.a!=Math.PI) {
      if (case_entry=="inside") {
        const x_m1=this.p[1][0],y_m1=this.p[1][1];
        const x_m2=this.p[4][0],y_m2=this.p[4][1];

        const tan_a=Math.tan(a_p-Math.PI/2+this.a);

        const gamma1=(y_m2-y_m1)/(x_m2-x_m1);

        const xO1=(gamma1*x_m1-tan_a*x_p-y_m1+y_p)/(gamma1-tan_a);
        const yO1=tan_a*(xO1-x_p)+y_p;

        const r1=r1_sign*norme(x_p-xO1,y_p-yO1);
        const r2="Infinity";

        this.change_magnetic_field(r1,r2,v_p,q,m);
      }
      else if (case_entry=="outside") {
        const tan_a=Math.tan(a_p-Math.PI/2+this.a); // ok

        const x_m1=this.p[1][0],y_m1=this.p[1][1];
        const x_m2=this.p[4][0],y_m2=this.p[4][1];
        const x_p2=this.p[2][0],y_p2=this.p[2][1];
        const x_p3=this.p[3][0],y_p3=this.p[3][1];

        // if gamma1 & gamma3 != NaN
        const gamma1=(y_m2-y_m1)/(x_m2-x_m1);
        const gamma3=(y_p3-y_p2)/(x_p3-x_p2);

        //console.log(gamma1,gamma3);

        for (let r1=r1_min; r1<r1_max; r1+=0.5) {
          if (Math.abs(r1)>this.l/2) {
            // point O1, coordonnate of the first center
            const xO1=x_p-r1/Math.sqrt(1+Math.pow(tan_a,2)); // ok
            const yO1=y_p-r1*tan_a/Math.sqrt(1+Math.pow(tan_a,2)); // ok
            //draw_circle(ctx,xO1,yO1,3,"green");

            // point C
            const a=1+Math.pow(gamma1,2);
            const b=2*(gamma1*(y_m1-yO1-gamma1*x_m1)-xO1);
            const e=Math.pow(xO1,2)+Math.pow(gamma1*x_m1,2)-2*gamma1*x_m1*(y_m1-yO1)+Math.pow(y_m1-yO1,2)-Math.pow(r1,2);
            const delta=Math.pow(b,2)-4*a*e;

            if (delta>=0) {
              const point_c=circle_segment_intersection(x_m1,y_m1,x_m2,y_m2,this.d,a,b,delta,gamma1);
              if (point_c!=0) { // si le point c existe dans les limites de la cavité
                const x_c=point_c[0],y_c=point_c[1];
                //draw_circle(ctx,xO1,yO1,r1,"lightgreen");
                //draw_circle(ctx,x_c,y_c,3,"yellow");

                // point O2
                const gamma2=(y_c-yO1)/(x_c-xO1);

                const xO2=(gamma2*xO1-gamma3*x_p2-yO1+y_p2)/(gamma2-gamma3);
                const yO2=gamma2*(xO2-xO1)+yO1;
                //draw_circle(ctx,xO2,yO2,3,"blue");

                // point B
                let r2=norme(x_c-xO2,y_c-yO2);

                const a_=1+Math.pow(gamma3,2);
                const b_=2*(gamma3*(y_p2-yO2-gamma3*x_p2)-xO2);
                const e_=Math.pow(xO2,2)+Math.pow(gamma3*x_p2,2)-2*gamma3*x_p2*(y_p2-yO2)+Math.pow(y_p2-yO2,2)-Math.pow(r2,2);
                const delta_=Math.pow(b_,2)-4*a_*e_;

                if (delta_>=0) {
                  const point_b=circle_segment_intersection(x_p2,y_p2,x_p3,y_p3,this.d,a_,b_,delta_,gamma3);
                  if (point_b!=0) { // si le point c existe dans les limites de la cavité
                    const x_b=point_b[0],y_b=point_b[1];
                    //draw_circle(ctx,x_b,y_b,3,"purple");

                    if (norme(x_b-x_p2,y_b-y_p2)>this.d/2-std_exit && norme(x_b-x_p2,y_b-y_p2)<this.d/2+std_exit && norme(x_b-x_p3,y_b-y_p3)>this.d/2-std_exit && norme(x_b-x_p3,y_b-y_p3)<this.d/2+std_exit) {
                      //console.log(xO1,yO1,r1,-Math.abs(r1)/r1*r2);
                      /*draw_circle(ctx,xO1,yO1,3,"green");
                      draw_circle(ctx,xO1,yO1,Math.abs(r1),"lightgreen");
                      draw_circle(ctx,x_c,y_c,3,"yellow");
                      draw_circle(ctx,xO2,yO2,3,"blue");
                      draw_circle(ctx,xO2,yO2,Math.abs(r2),"lightblue");
                      draw_circle(ctx,x_b,y_b,3,"purple");*/

                      if (this.a<=Math.PI) {
                        this.change_magnetic_field(r1,-Math.abs(r1)/r1*r2,v_p,q,m);
                      }
                      else {
                        this.change_magnetic_field(-r1,Math.abs(r1)/r1*r2,v_p,q,m);
                      }
                      return(1);
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    else { // if the cavity is horizontal
      console.log(a_p,case_entry);
      if (case_entry=="inside") {
        const x_m1=this.p[1][0],y_m1=this.p[1][1];
        const x_m2=this.p[4][0],y_m2=this.p[4][1];

        const tan_a=Math.tan(a_p+this.a);

        const gamma1=(x_m2-x_m1)/(y_m2-y_m1);

        const yO1=(gamma1*y_m1-tan_a*y_p-x_m1+x_p)/(gamma1-tan_a);
        const xO1=tan_a*(yO1-y_p)+x_p;

        const r1=r1_sign*norme(x_p-xO1,y_p-yO1);
        const r2="Infinity";

        this.change_magnetic_field(r1,r2,v_p,q,m);
      }
      else if (case_entry=="outside") {
        const tan_a=Math.tan(a_p+this.a); // ok

        const x_m1=this.p[1][0],y_m1=this.p[1][1];
        const x_m2=this.p[4][0],y_m2=this.p[4][1];
        const x_p2=this.p[2][0],y_p2=this.p[2][1];
        const x_p3=this.p[3][0],y_p3=this.p[3][1];

        // if gamma1 & gamma3 != NaN
        const gamma1=(x_m2-x_m1)/(y_m2-y_m1);
        const gamma3=(x_p3-x_p2)/(y_p3-y_p2);

        //console.log(gamma1,gamma3);

        for (let r1=r1_min; r1<r1_max; r1+=0.5) {
          if (Math.abs(r1)>this.l/2) {
            // point O1, coordonnate of the first center
            const yO1=y_p-r1/Math.sqrt(1+Math.pow(tan_a,2)); // ok
            const xO1=x_p-r1*tan_a/Math.sqrt(1+Math.pow(tan_a,2)); // ok
            //draw_circle(ctx,xO1,yO1,3,"green");

            // point C
            const a=1+Math.pow(gamma1,2);
            const b=2*(gamma1*(x_m1-xO1-gamma1*y_m1)-yO1);
            const e=Math.pow(yO1,2)+Math.pow(gamma1*y_m1,2)-2*gamma1*y_m1*(x_m1-xO1)+Math.pow(x_m1-xO1,2)-Math.pow(r1,2);
            const delta=Math.pow(b,2)-4*a*e;

            if (delta>=0) {
              const point_c=circle_segment_intersection(y_m1,x_m1,y_m2,x_m2,this.d,a,b,delta,gamma1);
              if (point_c!=0) { // si le point c existe dans les limites de la cavité
                const y_c=point_c[0],x_c=point_c[1];
                //draw_circle(ctx,xO1,yO1,r1,"lightgreen");
                //draw_circle(ctx,x_c,y_c,3,"yellow");

                // point O2
                const gamma2=(x_c-xO1)/(y_c-yO1);

                const yO2=(gamma2*yO1-gamma3*y_p2-xO1+x_p2)/(gamma2-gamma3);
                const xO2=gamma2*(yO2-yO1)+xO1;
                //draw_circle(ctx,xO2,yO2,3,"blue");

                // point B
                let r2=norme(x_c-xO2,y_c-yO2);

                const a_=1+Math.pow(gamma3,2);
                const b_=2*(gamma3*(x_p2-xO2-gamma3*y_p2)-yO2);
                const e_=Math.pow(yO2,2)+Math.pow(gamma3*y_p2,2)-2*gamma3*y_p2*(x_p2-xO2)+Math.pow(x_p2-xO2,2)-Math.pow(r2,2);
                const delta_=Math.pow(b_,2)-4*a_*e_;

                if (delta_>=0) {
                  const point_b=circle_segment_intersection(y_p2,x_p2,y_p3,x_p3,this.d,a_,b_,delta_,gamma3);
                  if (point_b!=0) { // si le point c existe dans les limites de la cavité
                    const y_b=point_b[0],x_b=point_b[1];
                    //draw_circle(ctx,x_b,y_b,3,"purple");

                    if (norme(x_b-x_p2,y_b-y_p2)>this.d/2-std_exit && norme(x_b-x_p2,y_b-y_p2)<this.d/2+std_exit && norme(x_b-x_p3,y_b-y_p3)>this.d/2-std_exit && norme(x_b-x_p3,y_b-y_p3)<this.d/2+std_exit) {
                      //console.log(xO1,yO1,r1,-Math.abs(r1)/r1*r2);
                      /*draw_circle(ctx,xO1,yO1,3,"green");
                      //draw_circle(ctx,xO1,yO1,Math.abs(r1),"lightgreen");
                      draw_circle(ctx,x_c,y_c,3,"yellow");
                      draw_circle(ctx,xO2,yO2,3,"blue");
                      //draw_circle(ctx,xO2,yO2,Math.abs(r2),"lightblue");
                      draw_circle(ctx,x_b,y_b,3,"purple");*/

                      if (this.a<Math.PI) {
                        this.change_magnetic_field(-r1,Math.abs(r1)/r1*r2,v_p,q,m);
                      }
                      else {
                        this.change_magnetic_field(r1,-Math.abs(r1)/r1*r2,v_p,q,m);
                      }
                      return(1);
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
