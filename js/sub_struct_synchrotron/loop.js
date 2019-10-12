function Loop() {
  let id="o";
  let c=[];
  let E=[],B=[],I=[],R=[],F=[]; // list of the sections
  let pattern="";
  let rejection_index_list=[];
  let d=0; // width of the sub-struct
  let r=0; // radius of the loop
  let n=0; // number of edge
  let expand_struct="";


  function setup_parameters(struct_loop) {
    //console.log("struct loop",struct_loop);
    let variable_select=0;
    let temp_variable="";
    for (let i=3; i<struct_loop.length; i++) {
      if (struct_loop[i]=='(') {
        if (variable_select==2) {n=parseInt(temp_variable);}
        break;
      }
      if (struct_loop[i]==':') {
        if (variable_select==0) {d=parseInt(temp_variable);}
        else if (variable_select==1) {r=parseInt(temp_variable);}
        temp_variable="";
        variable_select++;
      }
      else {
        temp_variable+=struct_loop[i];
      }
    }
    //console.log("d",d,"r",r,"n",n);
  }

  function setup_pattern(struct_loop) {
    let ptr=0;
    while (struct_loop[ptr]!='(') {ptr++;}
    ptr++;

    let nb_paranthese=1;
    let temp_pattern=" ";
    while (struct_loop[ptr]!=')' || nb_paranthese>1) {
      //console.log(struct[ptr],nb_paranthese);
      if (struct_loop[ptr]=='(') {nb_paranthese++;}
      else if (struct_loop[ptr]==')') {nb_paranthese--;}
      temp_pattern+=struct_loop[ptr];
      ptr++;
    }

    //console.log("temp_pattern",temp_pattern);
    for (let i=0; i<temp_pattern.length; i++) {
      if (isNaN(parseInt(temp_pattern[i]))!=1 && temp_pattern[i-1]==' ') {
        let temp_product_string="";
        let nb_parantheses=0;
        while (temp_pattern[i]!=')' || nb_parantheses>1) { // add all the parameters
          if (temp_pattern[i]=='(') {nb_parantheses++;}
          else if (temp_pattern[i]==')') {nb_parantheses--;}
          temp_product_string+=temp_pattern[i];
          i++;
        }
        temp_product_string+=')';
        //console.log("temp_product_string",temp_product_string);
        let sub_product=new struct_product(temp_product_string);
        const sub_product_result=sub_product.get_result();
        //console.log(sub_product_result);
        for (let j=0; j<sub_product_result.length; j++) {
          pattern+=sub_product_result[j];
        }
      }
      else {
        pattern+=temp_pattern[i];
      }
    }
  }

  function setup_rejection_list(struct_loop) {
    let ptr=0;
    while (struct_loop[ptr]!='R') {ptr++;}

    while (ptr<struct_loop.length) {
      if (struct_loop[ptr]=='[') {
        ptr++;
        let temp_index_rej="";
        while (struct_loop[ptr]!=']') {
          temp_index_rej+=struct_loop[ptr];
          ptr++;
        }
        rejection_index_list.push(parseInt(temp_index_rej));
        ptr++;
      }
      ptr++;
    }
  }

  function setup_expand_struct() {
    expand_struct+="I";
    for (let i=0; i<n; i++) {
      for (let j=0; j<pattern.length; j++) {
        expand_struct+=pattern[j];
      }
      expand_struct+=' ';
      if (i!=n-1) {
        let curve_end_pattern="B";
        for (let j=0; j<rejection_index_list.length; j++) {
          if (rejection_index_list[j]==i) {
            curve_end_pattern="R";
            break;
          }
        }
        expand_struct+=curve_end_pattern;
      }
    }
    //console.log("expand_struct",expand_struct);
  }

  function setup_c() {
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
        B.push(new magnetic_cavity(2e-7,r,2*Math.PI/n,d,"lightblue"));
        add_c("B",B.length-1);
      }
      else if (expand_struct[i]=='R') {
        const l2=r*Math.tan(Math.abs(Math.PI/n));
        R.push(new rejection_cavity(0,2*l2,l2,-(Math.PI-2*Math.PI/n),d,"coral"));
        add_c("R",R.length-1);
      }
      else if (expand_struct[i]=='I') {
        const l2=r*Math.tan(Math.abs(Math.PI/n));
        I.push(new insertion_cavity(0,2*l2,l2,-2*Math.PI/n,d,"red"));
        add_c("I",I.length-1);
      }
    }
    c.push(["I0"]);
  }


  this.set=function(struct_loop) {
    setup_parameters(struct_loop);
    setup_rejection_list(struct_loop);
    setup_pattern(struct_loop);
    setup_expand_struct();
    setup_c();
  }

  this.set_id=function(id_index) {
    id+=String(id_index);
  }

  this.get_parameters=function() { // a refaire
    console.log("d=",d," r=",r," n=",n);
  }

  this.get_rejection_index_in_c=function(col_c) { // !!! Ne retourne que le premier index, multi sorties impossible dans cette configuration
    let compt_R=0;
    let compt_section=2; // +1 from the I and +1 from the R
    for (let i=0; i<expand_struct.length; i++) {
      if (expand_struct[i]=='R') {
        compt_R++;
        break;
      }
      if (expand_struct[i]=='E' || expand_struct[i]=='F' || expand_struct[i]=='B') {
        compt_section++;
      }
    }
    return(compt_section+col_c-(c.length+1));
  }

  this.get_c=function() {
    return(c);
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

  this.get_I=function() {
    return(I);
  }

  this.get_R=function() {
    return(R);
  }
}
