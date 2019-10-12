function norme(a,b) {
  return(Math.sqrt(Math.pow(a,2)+Math.pow(b,2)));
}

function modulo(n,z) {
  while (n<0) {
    n+=z;
  }
  return(n%z);
}

function add_matrix_at_index(mat_src,mat_dest,col) { // mat_src in mat_dest at the bottom
  for (let i=0; i<mat_src.length; i++) {
    let temp_row=[];
    for (let j=0; j<col; j++) {
      temp_row.push(0);
    }
    for (let j=0; j<mat_src[i].length; j++) {
      temp_row.push(mat_src[i][j]);
    }
    mat_dest.push(temp_row);
  }
  return(mat_dest);
}

function vector_angle(vx,vy) {
  if (vx>=0 && vy>=0) {
    return(Math.atan(vy/vx));
  }
  else if (vx<=0 && vy>=0) {
    return(Math.PI-Math.atan(-vy/vx));
  }
  else if (vx<=0 && vy<=0){
    return(Math.atan(vy/vx)+Math.PI);
  }
  else if (vx>=0 && vy<=0){
    return(2*Math.PI-Math.atan(-vy/vx));
  }
}

function affine_line(x1,y1,x2,y2, x) {
  return (((y2-y1)*x+(x2*y1-x1*y2))/(x2-x1));
}

function radius_arc(xc,yc,x,y) {
  return (Math.sqrt((xc-x)*(xc-x)+(yc-y)*(yc-y)));
}

function inBlock_magn(x,y,p) {
  const x1=p[0][0],x4=p[5][0],x_c=p[1][0];
  const y1=p[0][1],y4=p[5][1],y_c=p[1][1];
  if ((radius_arc(x_c,y_c,x1,y1)>=radius_arc(x_c,y_c,x,y) && radius_arc(x_c,y_c,x4,y4)<=radius_arc(x_c,y_c,x,y)) || (radius_arc(x_c,y_c,x1,y1)<=radius_arc(x_c,y_c,x,y) && radius_arc(x_c,y_c,x4,y4)>=radius_arc(x_c,y_c,x,y))) {
    //if ((y>=affine_line(x4,y4,x1,y1,x) && y<=affine_line(x3,y3,x2,y2,x)) || y<=affine_line(x4,y4,x1,y1,x) && y>=affine_line(x3,y3,x2,y2,x)) {
    if (inside_polygon(x,y,p)==1) {
      return(1);
    }
    return(0);
  }
  return(0);
}

function inside_polygon(x,y,p) {
  let x_p=[],y_p=[];
  for (let i=0; i<p.length; i++) {
    x_p.push(p[i][0]);
    y_p.push(p[i][1]);
  }
  let intersections=0;

  for (let i=0; i<p.length; i++) {
    let xi=x_p[i],yi=y_p[i];
    let xj=x_p[(i+1)%p.length],yj=y_p[(i+1)%p.length];
    if (yj==yi && yj==y && x>Math.min(xj,xi) && x<Math.max(xj,xi)) { // Check if point is on an horizontal polygon boundary
      return(1);
    }
    if (y>Math.min(yj,yi) && y<=Math.max(yj,yi) && x<=Math.max(xj,xi) && yj!=yi) {
      let temp=(y-yj)*(xi-xj)/(yi-yj)+xj;
      if (temp==x) { // Check if point is on the polygon boundary (other than horizontal)
        return(1);
      }
      if (xj==xi || x<=temp) {
        intersections++;
      }
    }
  }

  if (intersections%2!=0) {
    return(1); // true
  }
  else {
    return(0); // false
  }
}

/**
* determine le point d'un cercle qui intersecte dans un segment
* #param: x_m1,y_m1,x_m2,y_m2=coordonnées des points du segment
          dist_seg=longueur du segment
          a,b=coefficient d'ordre 2 et 1 d'un polynome du second ordre
          delta=discriment du polynome
          dirct_coef_lign=coefficient directeur de la droite formant le point d'intersection
*/
function circle_segment_intersection(x_m1,y_m1,x_m2,y_m2,dist_seg,a,b,delta,dirct_coef_lign) {
  const x_sol1=(-b+Math.sqrt(delta))/(2*a);
  const y_sol1=dirct_coef_lign*(x_sol1-x_m1)+y_m1;
  const x_sol2=(-b-Math.sqrt(delta))/(2*a);
  const y_sol2=dirct_coef_lign*(x_sol2-x_m1)+y_m1;
  if (norme(x_sol1-x_m1,y_sol1-y_m1)<dist_seg && norme(x_sol1-x_m2,y_sol1-y_m2)<dist_seg) {
    return([x_sol1,y_sol1]);
  }
  else if (norme(x_sol2-x_m1,y_sol2-y_m1)<dist_seg && norme(x_sol2-x_m2,y_sol2-y_m2)<dist_seg) {
    return([x_sol2,y_sol2]);
  }
  else {
    return(0);
  }
}
