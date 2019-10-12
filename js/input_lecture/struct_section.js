function struct_section(struct) {
  const name=struct[0];
  let parameters={};
  if (name=='C') {
    const name_param=['w','l','p']; // width,length,power
    this.setup(name_param);
  }
  else if (name=='E') {
    const name_param=['p']; // power
    setup(name_param);
  }
  else if (name=='B') {
    const name_param=['a']; // angle
    setup(name_param);
  }
  else if (name=='F') {
    const name_param=['l']; // length
    setup(name_param);
  }
  else if (name=='I') {
    const name_param=[]; //
    //this.setup(name_param);
  }
  else if (name=='R') {
    const name_param=['i']; // index
    setup(name_param);
  }
  
  function setup() {
    let compt_param=0;
    let ptr=2;
    while (struct[ptr]!=')') {
      let temp_val="";
      while (struct[ptr]!=',') {
        temp_val+=struct[ptr];
      }
      parameters[name_param[compt_param]]=parseInt(temp_val);
      compt_param++;
      ptr+=temp_val+1;
    }
  }
}