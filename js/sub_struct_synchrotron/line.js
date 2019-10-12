function Line() {
  let id="l";
  let c=[];
  let C=[],E=[],B=[],F=[]; // list of the sections
  let d=200; // width of the sub-struct
  let pattern="";


  function setup_c(expand_struct) {
    function add_c(element,index) {
      let temp=[];
      for (let i=0; i<c.length; i++) {
        temp.push(0);
      }
      temp.push(element+String(index));
      c.push(temp);
    }

    for (let i=0; i<expand_struct.length; i++) {
      if (expand_struct[i]=='E') {
        if (expand_struct[i+1]=='(') {
          let ptr=i+2;
          let power_E="";
          while (expand_struct[ptr]!=')') {
            power_E+=expand_struct[ptr];
            ptr++;
          }
          E.push(new electric_cavity(parseInt(power_E),50,d,"white"));
        }
        else {
          E.push(new electric_cavity(-0.5,50,d,"white"));
        }
        add_c("E",E.length-1);
      }
      else if (expand_struct[i]=='F') {
        if (expand_struct[i+1]=='(') {
          let ptr=i+2;
          let length_F="";
          while (expand_struct[ptr]!=')') {
            length_F+=expand_struct[ptr];
            ptr++;
          }
          F.push(new focale_cavity(-2e-7,2e-7,parseInt(length_F),d,"royalblue"));
        }
        else {
          F.push(new focale_cavity(-2e-7,2e-7,500,d,"royalblue"));
        }
        add_c("F",F.length-1);
      }
      else if (expand_struct[i]=='B') {
        if (expand_struct[i+1]=='(') {
          let ptr=i+2;
          let theta_B="";
          while (expand_struct[ptr]!=')') {
            theta_B+=expand_struct[ptr];
            ptr++;
          }
          const theta=parseFloat(theta_B)*Math.PI/180;
          B.push(new magnetic_cavity(2e-7,d*2,theta,d,"lightblue"));
        }
        else {
          B.push(new magnetic_cavity(2e-7,d*2,Math.PI/6,d,"lightblue"));
        }
        add_c("B",B.length-1);
      }
    }
  }

  function setup_pattern(struct_line) {
    for (let i=0; i<struct_line.length; i++) {
      pattern+=struct_line[i];
    }
  }


  this.set=function(struct_line) {
    setup_pattern(struct_line);
    setup_c(struct_line);
  }

  this.set_id=function(id_index) {
    id+=String(id_index);
  }

  this.set_d=function(d_) {
    d=d_;
  }

  this.get_c=function() {
    return(c);
  }

  this.get_C=function() {
    return(C);
  }

  this.get_E=function() {
    return(E);
  }

  this.get_B=function() {
    return(B);
  }

  this.get_F=function() {
    return(F);
  }
}
