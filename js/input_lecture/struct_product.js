function struct_product(struct) {
  let n=0;
  let pattern="";
  let result="";
  
  setup_n();
  setup_pattern();
  setup_result();
  
  function setup_n() {
    let ptr=0;
    let temp_n="";
    while (struct[ptr]!='(') {
      temp_n+=struct[ptr];
      ptr++;
    }
    n=parseInt(temp_n);
    //console.log(n);
  }
  
  function setup_pattern() {
    let ptr=1;
    while (struct[ptr]!='(') {
      ptr++;
    }
    ptr++;
    //console.log(struct[ptr]);
    const section_list=['C','E','B','F','I','R'];
    while (struct[ptr]!=')') {
      if (isNaN(parseInt(struct[ptr]))!=1) { // if a number (product)
        let temp_product_string="";
        let nb_parantheses=0;
        while (struct[ptr]!=')' || nb_parantheses>0) { // add all the parameters
          if (struct[ptr]=='(') {nb_parantheses++;}
          else if (struct[ptr]==')') {nb_parantheses--;}
          temp_product_string+=struct[ptr];
          ptr++;
        }
        temp_product_string+=')';
        //console.log("temp_product_string",temp_product_string);
        let sub_product=new struct_product(temp_product_string);
        sub_product_result=sub_product.get_result();
        for (let j=0; j<sub_product_result.length; j++) {
          pattern+=sub_product_result[j];
        }
      }
      else if (struct[ptr]==' ') { // if a space 
        pattern+=' ';
        ptr++;
      }
      else { // if a letter (section)
        for (let i=0; i<section_list.length; i++) { // find section from the list
          if (struct[ptr]==section_list[i] && struct[ptr+1]=='(') {
            while (struct[ptr]!=')') { // add all the parameters
              pattern+=struct[ptr];
              ptr++;
            }
            pattern+=')';
            ptr++;
            break;
          }
        }
      }
    }
    //console.log("pattern",pattern);
  }
  
  function setup_result() {
    for (let i=0; i<n; i++) {
      for (let j=0; j<pattern.length; j++) {
        result+=pattern[j];
      }
      if (i!=n-1) {result+=" ";}
    }
    //console.log("result",result);
  }
  
  this.get_result=function() {
    return(result);
  }
}