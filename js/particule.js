function particule(x,y,v,a,m,q,r,color) {
  this.x=x; // position x
  this.y=y; // position y
  this.v=v; // velocity
  this.a=a; // direction angle
  this.m=m; // mass
  this.mr=m; // relativistic mass
  this.q=q; // charge
  this.t=0;
  this.sector;

  this.r=r; // radius on canvas
  this.color=color; // color on canvas

  this.plot=function(context) {
    draw_circle(context,this.x,this.y,this.r,this.color);
  }

  this.find_sector=function(C,E,B,I,R,F) { // find the current sector in which the particules is at the beginning
    const x=this.x,y=this.y;
    for (let i=0; i<C.length; i++) {
      if (C[i].inside(x,y)==1) {
        this.sector=C[i];
      }
    }
    for (let i=0; i<E.length; i++) {
      if (E[i].inside(x,y)==1) {
        this.sector=E[i];
      }
    }
    for (let i=0; i<I.length; i++) {
      if (I[i].inside(x,y)==1) {
        this.sector=I[i];
      }
    }
    for (let i=0; i<R.length; i++) {
      if (R[i].inside(x,y)==1) {
        this.sector=R[i];
      }
    }
    for (let i=0; i<F.length; i++) {
      if (F[i].inside(x,y)==1) {
        this.sector=F[i];
      }
    }
    for (let i=0; i<B.length; i++) {
      if (B[i].inside(x,y)==1) {
        this.sector=B[i];
      }
    }
    return(0);
  }

  this.in_sector=function() { // check if the particule is still in the sector
    const sector=this.sector;
    if (sector.id[0]=='C' || sector.id[0]=='E' || sector.id[0]=='I' || sector.id[0]=='R' || sector.id[0]=='B' || sector.id[0]=='F') {
      if (sector.inside(this.x,this.y)==1) {
        return(1);
      }
    }
    else {
      return(0);
    }
    return(0);
  }

  this.next_sector=function(c,l_sector) { // find the next sector (the current sector) in which the particule will be (is)
    for (let i=0; i<c.length; i++) {
      for (let j=0; j<c[i].length; j++) {
        if (c[i][j]==this.sector.id) { //c[i][j][0]==this.sector.id[0] && c[i][j][1]==this.sector.id[1]) {
          if (c[i][j][0]=='R' && this.sector.state==0) {
            for (let k=i+1; k<c.length; k++) {
              if (c[k][j]!=0) {
                for (let l=0; l<l_sector.length; l++) { // find the sector parameters in the list
                  for (let m=0; m<l_sector[l].length; m++) {
                    if (c[k][j]==l_sector[l][m].id) {//c[i+1][k][0]==l_sector[l][m].id[0] && c[i+1][k][1]==l_sector[l][m].id[1]) {
                      this.sector=l_sector[l][m];
                      //console.log(this.sector.id);
                      return(1);
                    }
                  }
                }
              }
            }
          }
          else {
            for (let k=0; k<c[i+1].length; k++) {
              if (c[i+1][k]!=0) {
                for (let l=0; l<l_sector.length; l++) {
                  for (let m=0; m<l_sector[l].length; m++) {
                    if (c[i+1][k]==l_sector[l][m].id) { //c[i+1][k][0]==l_sector[l][m].id[0] && c[i+1][k][1]==l_sector[l][m].id[1]) {
                      this.sector=l_sector[l][m];
                      //console.log(this.sector.id);
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

  this.movement=function(dt) { // animate the particule
    //console.log(this.x,this.y,this.v);
    const sector=this.sector;
    this.color=sector.color;
    if (sector.id[0]=='C' || sector.id[0]=='E') {
      const Ex=sector.E*Math.cos(sector.a),Ey=sector.E*Math.sin(sector.a);
      const vx=this.v*Math.cos(this.a),vy=this.v*Math.sin(this.a);
      this.x=this.q*Ex*dt*dt/(2*this.m)+vx*dt+this.x;
      this.y=this.q*Ey*dt*dt/(2*this.m)+vy*dt+this.y;
      const vxf=this.q*Ex*dt/this.m+vx,vyf=this.q*Ey*dt/this.m+vy;
      this.v=norme(vxf,vyf);
      this.mr=this.m/Math.sqrt(1-Math.pow(this.v/299792458,2));
      this.a=vector_angle(vxf,vyf);
    }
    else if (sector.id[0]=='B') {
      const mu=this.q*sector.B/this.mr;
      const vx=this.v*Math.cos(this.a),vy=this.v*Math.sin(this.a);
      this.x=this.x+vx/mu*Math.sin(mu*dt)+vy/mu*(1-Math.cos(mu*dt));
      this.y=this.y+vx/mu*(Math.cos(mu*dt)-1)+vy/mu*Math.sin(mu*dt);
      const vxf=vx*Math.cos(mu*dt)+vy*Math.sin(mu*dt),vyf=-vx*Math.sin(mu*dt)+vy*Math.cos(mu*dt);
      this.a=vector_angle(vxf,vyf);
    }
    else if (sector.id[0]=='I' || sector.id[0]=='R') {
      if (sector.state==1) { // magnetic fielf to curve the trajectory
        const mu=this.q*sector.B/this.mr;
        const vx=this.v*Math.cos(this.a),vy=this.v*Math.sin(this.a);
        this.x=this.x+vx/mu*Math.sin(mu*dt)+vy/mu*(1-Math.cos(mu*dt));
        this.y=this.y+vx/mu*(Math.cos(mu*dt)-1)+vy/mu*Math.sin(mu*dt);
        const vxf=vx*Math.cos(mu*dt)+vy*Math.sin(mu*dt),vyf=-vx*Math.sin(mu*dt)+vy*Math.cos(mu*dt);
        this.a=vector_angle(vxf,vyf);
      }
      else if (sector.state==0) { // no field, insersion or exit of the particule
        const vx=this.v*Math.cos(this.a),vy=this.v*Math.sin(this.a);
        this.x=vx*dt+this.x;
        this.y=vy*dt+this.y;
        const vxf=vx,vyf=vy;
        this.v=norme(vxf,vyf);
        this.mr=this.m/Math.sqrt(1-Math.pow(this.v/299792458,2));
        this.a=vector_angle(vxf,vyf);
      }
    }
    else if (sector.id[0]=='F') {
      let mu=0;
      if (Math.abs(norme(this.x-sector.x,this.y-sector.y)*Math.cos(vector_angle(this.x-sector.x,this.y-sector.y)-sector.a))<=sector.l/2) { // B1 section
        mu=this.q*sector.B1/this.mr;
        this.color="green";
      }
      else { // B2 section
        mu=this.q*sector.B2/this.mr;
        this.color="red";
      }
      const vx=this.v*Math.cos(this.a),vy=this.v*Math.sin(this.a);
      this.x=this.x+vx/mu*Math.sin(mu*dt)+vy/mu*(1-Math.cos(mu*dt));
      this.y=this.y+vx/mu*(Math.cos(mu*dt)-1)+vy/mu*Math.sin(mu*dt);
      const vxf=vx*Math.cos(mu*dt)+vy*Math.sin(mu*dt),vyf=-vx*Math.sin(mu*dt)+vy*Math.cos(mu*dt);
      this.a=vector_angle(vxf,vyf);
    }
  }
}
