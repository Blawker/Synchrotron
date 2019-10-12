function Synchrotron() {
  let time=0;
  let c=[];
  let col_c=1;
  let C=[],E=[],B=[],I=[],R=[],F=[];
  const cavity_E_length=50,cavity_F_length=500;
  const d=100; // width of the tube of the synchrotron
  const cavity_E_strength=-0.5;

  let loop_list=[]; // list of the sub-structure
  let line_list=[];

  /*** Create a function to configure any synchrotron by the user ***/
  const config=-1;
  if (config==0) { // test configuration
    c=[[0   ,"E0",0   ,0   ,0   ,0   ],
       [0   ,0   ,"F0",0   ,0   ,0   ],
       [0   ,0   ,0   ,"I0",0   ,0   ,0   ],
       [0   ,0   ,0   ,0   ,"E1",0   ,0   ],
       [0   ,0   ,0   ,0   ,0   ,"F1",0   ],
       [0   ,0   ,0   ,0   ,0   ,0   ,"E2"],
       [0   ,0   ,0   ,0   ,0   ,0   ,0   ,"B0"],
       [0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,"E3"],
       [0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,"E4"],
       [0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,"F2"],
       [0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,"E5"],
       [0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,"B1"],
       [0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,"E6"],
       [0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,"F3"],
       [0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,"E7"],
       [0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,"B2"],
       [0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,"E8"],
       [0   ,0   ,0   ,"I0",0   ,0   ]
    ];

    C=[new particule_cavity(-0.01,x,y,50,30*3,a,"gray")]; // injector
    E=[new electric_cavity(-0.1,40,20*5,"white"),new electric_cavity(-0.1,20,160,"white"),new electric_cavity(-0.1,20,160,"white"),new electric_cavity(-0.1,20,160,"white"),new electric_cavity(-0.1,20,160,"white"),new electric_cavity(-0.1,20,160,"white"),new electric_cavity(-0.1,20,160,"white"),new electric_cavity(-0.1,20,160,"white"),new electric_cavity(-0.1,20,160,"white")];
    B=[new magnetic_cavity(2e-7,80,Math.PI/2,160,"lightblue"),new magnetic_cavity(2e-7,80,Math.PI/2,160,"lightblue"),new magnetic_cavity(2e-7,80,Math.PI/2,160,"lightblue")];
    I=[new insertion_cavity(1,350,300,-Math.PI/4,80,"red")];
    F=[new focale_cavity(-2e-7,2e-7,100,160,"royalblue"),new focale_cavity(-2e-7,2e-7,150,160,"royalblue"),new focale_cavity(-2e-7,2e-7,160,160,"royalblue"),new focale_cavity(-2e-7,2e-7,350,160,"royalblue")];
  }
  else if (config==1) { // configuration of a Cyclotron
    c=[[0   ,"E0",0   ,0   ,0   ,0   ], // C0
       [0   ,0   ,"E1",0   ,0   ,0   ], // E0
       [0   ,0   ,0   ,"B0",0   ,0   ], // E1
       [0   ,0   ,0   ,0   ,"E2",0   ], // B0
       [0   ,0   ,0   ,0   ,0   ,"B1"], // E2
       [0   ,0   ,"E1",0   ,0   ,0   ]  // B1
    ];

    C=[new particule_cavity(-0.01,x,y,100,30,Math.PI/2,"gray")]; // injector
    E=[new electric_cavity(-0.2,80,20,"white"),new electric_cavity(-0.1,40,160,"white"),new electric_cavity(-0.1,40,160,"white")];
    B=[new magnetic_cavity(0.0000002,80,4*Math.PI/4,160,"lightblue"),new magnetic_cavity(0.0000002,80,2*Math.PI/2,160,"lightblue")];
    I=[new insertion_cavity(1,1,36,160,60,-Math.PI/4,"red")];
  }
  else if (config==2) { // configuration of a Cyclotron with a focale cavity
    c=[[0   ,"E0",0   ,0   ,0   ,0   ],
       [0   ,0   ,"E1",0   ,0   ,0   ],
       [0   ,0   ,0   ,"F0",0   ,0   ],
       [0   ,0   ,0   ,0   ,"E2",0   ],
       [0   ,0   ,0   ,0   ,0   ,"B0",0   ],
       [0   ,0   ,0   ,0   ,0   ,0   ,"E3"],
       [0   ,0   ,0   ,0   ,0   ,0   ,0   ,"F1"],
       [0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,"E4"],
       [0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,"B1"],
       [0   ,0   ,"E1",0   ,0   ,0   ]
    ];

    C=[new particule_cavity(-0.01,x,y,100,30*3,a,"gray")]; // injector
    E=[new electric_cavity(-0.1,80,20*5,"white"),new electric_cavity(-0.1,20,160,"white"),new electric_cavity(-0.1,20,160,"white"),new electric_cavity(-0.1,20,160,"white"),new electric_cavity(-0.1,20,160,"white")];
    B=[new magnetic_cavity(2e-7,80,2*Math.PI/2,160,"lightblue"),new magnetic_cavity(2e-7,80,Math.PI,160,"lightblue")];
    I=[new insertion_cavity(1,1,36,160,60,-Math.PI/4,"red")];
    F=[new focale_cavity(-2e-7,2e-7,180,160,"royalblue"),new focale_cavity(-2e-7,2e-7,180,160,"royalblue")];
  }
  else if (config==3) { // configuration of a 3-Synchrotron with a focale cavity
    c=[[0   ,"E0",0   ,0   ,0   ,0   ],
       [0   ,0   ,"E1",0   ,0   ,0   ],
       [0   ,0   ,0   ,"F0",0   ,0   ],
       [0   ,0   ,0   ,0   ,"E2",0   ],
       [0   ,0   ,0   ,0   ,0   ,"B0",0   ],
       [0   ,0   ,0   ,0   ,0   ,0   ,"E3"],
       [0   ,0   ,0   ,0   ,0   ,0   ,0   ,"F1"],
       [0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,"E4"],
       [0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,"B1"],
       [0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,"E5"],
       [0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,"F2"],
       [0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,"E6"],
       [0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,"B2"],
       [0   ,0   ,"E1",0   ,0   ,0   ]
    ];

    C=[new particule_cavity(-0.01,x,y,100,30*3,a,"gray")]; // injector
    E=[new electric_cavity(-0.1,80,20*5,"white"),new electric_cavity(-0.1,20,160,"white"),new electric_cavity(-0.1,20,160,"white"),new electric_cavity(-0.1,20,160,"white"),new electric_cavity(-0.1,20,160,"white"),new electric_cavity(-0.1,20,160,"white"),new electric_cavity(-0.1,20,160,"white")];
    B=[new magnetic_cavity(2e-7,80,2*Math.PI/3,160,"lightblue"),new magnetic_cavity(2e-7,80,2*Math.PI/3,160,"lightblue"),new magnetic_cavity(2e-7,80,2*Math.PI/3,160,"lightblue")];
    I=[new insertion_cavity(1,1,36,160,60,-Math.PI/4,"red")];
    F=[new focale_cavity(-2e-7,2e-7,180,160,"royalblue"),new focale_cavity(-2e-7,2e-7,180,160,"royalblue"),new focale_cavity(-2e-7,2e-7,180,160,"royalblue")];
  }
  else if (config==4) { // configuration of a 4-Synchrotron with a focale cavity
    c=[[0   ,"E0",0   ,0   ,0   ,0   ],
       [0   ,0   ,"E1",0   ,0   ,0   ],
       [0   ,0   ,0   ,"F0",0   ,0   ],
       [0   ,0   ,0   ,0   ,"E2",0   ],
       [0   ,0   ,0   ,0   ,0   ,"B0"],
       [0   ,0   ,0   ,0   ,0   ,0   ,"E3"],
       [0   ,0   ,0   ,0   ,0   ,0   ,0   ,"F1"],
       [0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,"E4"],
       [0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,"B1"],
       [0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,"E5"],
       [0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,"F2"],
       [0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,"E6"],
       [0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,"B2"],
       [0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,"E7"],
       [0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,"F3"],
       [0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,"E8"],
       [0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,"B3"],
       [0   ,0   ,"E1",0   ,0   ,0   ]
    ];

    C=[new particule_cavity(-0.01,x,y,100,30*3,a,"gray")]; // injector
    E=[new electric_cavity(-0.1,100,20*5,"white"),new electric_cavity(-0.1,20,160,"white"),new electric_cavity(-0.1,20,160,"white"),new electric_cavity(-0.1,20,160,"white"),new electric_cavity(-0.1,20,160,"white"),new electric_cavity(-0.1,20,160,"white"),new electric_cavity(-0.1,20,160,"white"),new electric_cavity(-0.1,20,160,"white"),new electric_cavity(-0.1,20,160,"white")];
    B=[new magnetic_cavity(2e-7,80,Math.PI/2,160,"lightblue"),new magnetic_cavity(2e-7,80,Math.PI/2,160,"lightblue"),new magnetic_cavity(2e-7,80,Math.PI/2,160,"lightblue"),new magnetic_cavity(2e-7,80,Math.PI/2,160,"lightblue")];
    I=[new insertion_cavity(1,36,160,60,-Math.PI/4,"red")];
    F=[new focale_cavity(-2e-7,2e-7,180,160,"royalblue"),new focale_cavity(-2e-7,2e-7,180,160,"royalblue"),new focale_cavity(-2e-7,2e-7,180,160,"royalblue"),new focale_cavity(-2e-7,2e-7,180,160,"royalblue")];
  }
  else if (config==5) { // configuration of synchrotron with insertion
    c=[[0   ,"E0",0   ,0   ,0   ,0   ],
       [0   ,0   ,"F0",0   ,0   ,0   ],
       [0   ,0   ,0   ,"I0",0   ,0   ,0   ],
       [0   ,0   ,0   ,0   ,"E1",0   ,0   ],
       [0   ,0   ,0   ,0   ,0   ,"B0",0   ],
       [0   ,0   ,0   ,0   ,0   ,0   ,"E2"],
       [0   ,0   ,0   ,0   ,0   ,0   ,0   ,"F1"],
       [0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,"E3"],
       [0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,"B1"],
       [0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,"E4"],
       [0   ,0   ,0   ,"I0",0   ,0   ]
    ];

    C=[new particule_cavity(-0.01,x,y,100,30*3,a,"gray")]; // injector
    E=[new electric_cavity(-0.1,80,20*5,"white"),new electric_cavity(-0.1,20,160,"white"),new electric_cavity(-0.1,20,160,"white"),new electric_cavity(-0.1,20,160,"white"),new electric_cavity(-0.1,20,160,"white")];
    B=[new magnetic_cavity(2e-7,80,Math.PI,160,"lightblue"),new magnetic_cavity(2e-7,80,Math.PI,160,"lightblue")];
    I=[new insertion_cavity(1,500,300,160,-Math.PI/3,"red")];
    F=[new focale_cavity(-2e-7,2e-7,100,160,"royalblue"),new focale_cavity(-2e-7,2e-7,500,160,"royalblue")];
  }
  else if (config==6) { // configuration of synchrotron with insertion and double focale cavity
    c=[[0   ,"E0",0   ,0   ,0   ,0   ],
       [0   ,0   ,"F0",0   ,0   ,0   ],
       [0   ,0   ,0   ,"I0",0   ,0   ,0   ],
       [0   ,0   ,0   ,0   ,"E1",0   ,0   ],
       [0   ,0   ,0   ,0   ,0   ,"B0",0   ],
       [0   ,0   ,0   ,0   ,0   ,0   ,"E2"],
       [0   ,0   ,0   ,0   ,0   ,0   ,0   ,"F1"],
       [0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,"E3"],
       [0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,"E4"],
       [0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,"F2"],
       [0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,"E5"],
       [0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,"B1"],
       [0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,"E6"],
       [0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,"F3"],
       [0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,"E7"],
       [0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,"B2"],
       [0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,"E8"],
       [0   ,0   ,0   ,"I0",0   ,0   ]
    ];

    C=[new particule_cavity(-0.01,x,y,50,30*3,a,"gray")]; // injector
    E=[new electric_cavity(-0.1,40,20*5,"white"),new electric_cavity(-0.1,20,160,"white"),new electric_cavity(-0.1,20,160,"white"),new electric_cavity(-0.1,20,160,"white"),new electric_cavity(-0.1,20,160,"white"),new electric_cavity(-0.1,20,160,"white"),new electric_cavity(-0.1,20,160,"white"),new electric_cavity(-0.1,20,160,"white"),new electric_cavity(-0.1,20,160,"white")];
    B=[new magnetic_cavity(2e-7,80,Math.PI*2/3,160,"lightblue"),new magnetic_cavity(2e-7,80,Math.PI*2/3,160,"lightblue"),new magnetic_cavity(2e-7,80,Math.PI*2/3,160,"lightblue")];
    I=[new insertion_cavity(1,350,300,-Math.PI/3,160,"red")];
    F=[new focale_cavity(-2e-7,2e-7,100,160,"royalblue"),new focale_cavity(-2e-7,2e-7,150,160,"royalblue"),new focale_cavity(-2e-7,2e-7,160,160,"royalblue"),new focale_cavity(-2e-7,2e-7,350,160,"royalblue")];
  }

  let x,y,a;
  this.particules=[];


  this.set_structure=function(x_,y_,a_,struct,scale,context) {
    x=x_;y=y_;a=a_;
    // reset every parameters and list
    time=0;c=[];col_c=1;
    C=[];E=[];B=[];I=[];R=[];F=[];
    loop_list=[];line_list=[];

    this.construct_structure(struct);
    this.scale_dimension_down(scale);
    this.sector_id();
    this.sector_polygon_angle();
    this.plot(context);
  }

  this.scale_dimension_down=function(scale) {
    const liste=[C,E,B,I,R,F];
    for (let i=0; i<liste.length; i++) {
      for (let j=0; j<liste[i].length; j++) {
        const element=liste[i][j];
        if (element.l!=undefined) {
          element.l/=scale;
        }
        if (element.l1!=undefined) {
          element.l1/=scale;
        }
        if (element.l2!=undefined) {
          element.l2/=scale;
        }
        if (element.d!=undefined) {
          element.d/=scale;
        }
        if (element.r!=undefined) {
          element.r/=scale;
        }
      }
    }
    /*
    element.l/=scale;
    element.d/=scale;*/
  }

  this.construct_structure=function(struct) { // struct is a string that give the shape and the structure of the synchrotron
    function add_c(sub_c) { // a terminer, probleme colonne
      c=add_matrix_at_index(sub_c,c,col_c);
      col_c+=sub_c.length;
    }

    let expand_struct="C ";
    C.push(new particule_cavity(-0.5,x,y,200,200,a,"grey"));
    for (let i=2; i<struct.length; i++) {
      // if a number (product)
      if (isNaN(parseInt(struct[i]))!=1 && struct[i-1]==' ') {
        let temp_product_string="";
        let nb_parantheses=0;
        while (struct[i]!=')' || nb_parantheses>1) { // add all the parameters
          if (struct[i]=='(') {nb_parantheses++;}
          else if (struct[i]==')') {nb_parantheses--;}
          temp_product_string+=struct[i];
          i++;
        }
        temp_product_string+=')';
        //console.log("temp_product_string",temp_product_string);
        let sub_product=new struct_product(temp_product_string);
        const sub_product_result=sub_product.get_result();
        //console.log(sub_product_result);
        for (let j=0; j<sub_product_result.length; j++) {
          expand_struct+=sub_product_result[j];
        }
      }
      // if a { (loop) => end of a line
      else if (struct[i]=='{') {
        // add the line
        let line=new Line();
        //line.set_d(50);
        line.set_id(line_list.length);
        line.set(expand_struct);
        //console.log(line.get_c());
        add_c(line.get_c()); // a terminer, probleme colonne
        line_list.push(line);
        C.push.apply(C,line.get_C());
        E.push.apply(E,line.get_E());
        F.push.apply(F,line.get_F());
        B.push.apply(B,line.get_B());
        expand_struct="";

        // enter in the loop
        let temp_loop_string="";
        while (struct[i]!='}') { // add all the element of the loop
          temp_loop_string+=struct[i];
          i++;
        }
        temp_loop_string+='}';

        let loop=new Loop();
        loop.set(temp_loop_string);
        loop.set_id(loop_list.length);
        //loop.get_parameters();
        //console.log(loop.get_c());
        add_c(loop.get_c()); // !
        col_c=loop.get_rejection_index_in_c(col_c);
        loop_list.push(loop);
        E.push.apply(E,loop.get_E());
        B.push.apply(B,loop.get_B());
        F.push.apply(F,loop.get_F());
        I.push.apply(I,loop.get_I());
        R.push.apply(R,loop.get_R());
      }
      else {
        expand_struct+=struct[i];
      }
      //console.log(i,expand_struct);
    }
    //console.log(c);

    // reset the id of the sections on c matrix
    let compt_list_C=0,compt_list_E=0,compt_list_F=0,compt_list_B=0,compt_list_I=0,compt_list_R=0;
    for (let i=0; i<c.length; i++) {
      let id_section_letter="";
      let id_section_number=0;
      if (c[i][c[i].length-1][0]=='C') {id_section_letter="C";id_section_number=compt_list_C;compt_list_C++;}
      else if (c[i][c[i].length-1][0]=='E') {id_section_letter="E";id_section_number=compt_list_E;compt_list_E++;}
      else if (c[i][c[i].length-1][0]=='F') {id_section_letter="F";id_section_number=compt_list_F;compt_list_F++;}
      else if (c[i][c[i].length-1][0]=='B') {id_section_letter="B";id_section_number=compt_list_B;compt_list_B++;}
      else if (c[i][c[i].length-1][0]=='I') {
        id_section_letter="I";
        if (compt_list_I%2==1) {id_section_number=(compt_list_I-1)/2;}
        else {id_section_number=compt_list_I/2;}
        compt_list_I++;
      }
      else if (c[i][c[i].length-1][0]=='R') {id_section_letter="R";id_section_number=compt_list_R;compt_list_R++;}
      c[i][c[i].length-1]=id_section_letter+String(id_section_number);
    }
    //console.log(c);
  }

  this.sector_id=function() { // give an id to each sector
    for (let i=0; i<C.length; i++) {
      C[i].id="C"+String(i);
    }
    for (let i=0; i<E.length; i++) {
      E[i].id="E"+String(i);
    }
    for (let i=0; i<B.length; i++) {
      B[i].id="B"+String(i);
    }
    for (let i=0; i<I.length; i++) {
      I[i].id="I"+String(i);
    }
    for (let i=0; i<R.length; i++) {
      R[i].id="R"+String(i);
    }
    for (let i=0; i<F.length; i++) {
      F[i].id="F"+String(i);
    }
  }

  this.sector_polygon_angle=function() { //! pour prendre en compte la sortie R via la matrice c
    C[0].start_point();
    let bloc_temp=C[0];
    let bloc_R_temp=null;
    let compt_I=0;
    for (let i=0; i<c.length-1; i++) {
      for (let j=0; j<c[i].length; j++) {
        if (c[i][j]!=0) {
          const n=c[i][j].slice(1);
          if (c[i][j][0]==='E') {
            if (compt_I==2 && bloc_R_temp!=null) {
              E[n].exit_rejection_point(bloc_R_temp);
              bloc_R_temp=null;
              compt_I=0;
            }
            else {
              E[n].start_point(bloc_temp);
            }
            bloc_temp=E[n];
          }
          else if (c[i][j][0]==='B') {
            B[n].start_point(bloc_temp);
            bloc_temp=B[n];
          }
          else if (c[i][j][0]==='I') {
            if (compt_I!=1) {
              I[n].start_point(bloc_temp);
              bloc_temp=I[n];
            }
            compt_I++;
          }
          else if (c[i][j][0]==='R') { // add a R_bloc_temp with the ID of the next block (E); add a if () at the first place of condition
            R[n].start_point(bloc_temp);
            bloc_temp=R[n];
            if (bloc_R_temp==null) {
              bloc_R_temp=R[n];
            }
          }
          else if (c[i][j][0]==='F') {
            F[n].start_point(bloc_temp);
            bloc_temp=F[n];
          }
        }
      }
    }
  }

  this.plot=function(ctx) { // plot the synchrotron on a canvas
    C[0].plot(ctx);
    for (let i=0; i<c.length-1; i++) {
      for (let j=0; j<c[i].length; j++) {
        if (c[i][j]!=0) {
          const n=c[i][j].slice(1);
          if (c[i][j][0]==='E') {
            E[n].plot(ctx);
          }
          else if (c[i][j][0]==='B') {
            B[n].plot(ctx);
          }
          else if (c[i][j][0]==='I') {
            I[n].plot(ctx);
          }
          else if (c[i][j][0]==='R') {
            R[n].plot(ctx);
          }
          else if (c[i][j][0]==='F') {
            F[n].plot(ctx);
          }
        }
      }
    }
  }

  this.create_particules=function(n,m,q,r,color) { // create a list of n particules
    this.particules=[];
    for (let i=0; i<n; i++) {
      const xp=C[0].x+5*Math.cos(C[0].a)+0*Math.random()*Math.cos(2*Math.PI*Math.random());
      const yp=C[0].y+5*Math.sin(C[0].a)+0*Math.random()*Math.sin(2*Math.PI*Math.random());
      const vp=10000*Math.random();
      const ap=(Math.PI*(Math.random()-0.5)+C[0].a);
      var np=new particule(xp,yp,vp,ap,m,q,r,color);
      np.find_sector(C,E,B,I,R,F);
      this.particules.push(np);
    }
  }

  this.sector=function(particule) { // find in which sector is currently the particule, if not, the particule exit the synchrotron
    const x=particule.x,y=particule.y;
    for (let i=0; i<C.length; i++) {
      if (C[i].inside(x,y)==1) {
        return(C[i]);
      }
    }
    for (let i=0; i<E.length; i++) {
      if (E[i].inside(x,y)==1) {
        return(E[i]);
      }
    }
    for (let i=0; i<I.length; i++) {
      if (I[i].inside(x,y)==1) {
        return(I[i]);
      }
    }
    for (let i=0; i<R.length; i++) {
      if (R[i].inside(x,y)==1) {
        return(R[i]);
      }
    }
    for (let i=0; i<F.length; i++) {
      if (F[i].inside(x,y)==1) {
        return(F[i]);
      }
    }
    for (let i=0; i<B.length; i++) {
      if (B[i].inside(x,y)==1) {
        return(B[i]);
      }
    }
    return(0);
  }

  this.next_sector=function(sector) { // find the next sector (the current sector) in which the particule will be (is)
    const l_sector=[C,E,F,B,I,R];
    for (let i=0; i<c.length; i++) {
      for (let j=0; j<c[i].length; j++) {
        if (c[i][j]==sector.id) { // find the current sector in c-matrix // c[i][j][0]==sector.id[0] && c[i][j][1]==sector.id[1]) {
          if (c[i][j][0]=='R' && sector.state==0) {
            for (let k=i+1; k<c.length; k++) {
              if (c[k][j]!=0) {
                for (let l=0; l<l_sector.length; l++) { // find the sector parameters in the list
                  for (let m=0; m<l_sector[l].length; m++) {
                    if (c[k][j]==l_sector[l][m].id) {//c[i+1][k][0]==l_sector[l][m].id[0] && c[i+1][k][1]==l_sector[l][m].id[1]) {
                      return(l_sector[l][m]);
                    }
                  }
                }
              }
            }
          }
          else {
            for (let k=0; k<c[i+1].length; k++) {
              if (c[i+1][k]!=0) { // find the next sector id
                for (let l=0; l<l_sector.length; l++) { // find the sector parameters in the list
                  for (let m=0; m<l_sector[l].length; m++) {
                    if (c[i+1][k]==l_sector[l][m].id) {//c[i+1][k][0]==l_sector[l][m].id[0] && c[i+1][k][1]==l_sector[l][m].id[1]) {
                      return(l_sector[l][m]);
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

  this.find_final_particule_x_y_a_v=function(ctx,particule,sector) {
    // calculate the trajectory (final coordonnates at the end of the electric sector, velocity and angle of entry of a focale cavity)
    //console.log(sector.id[0],"find final");
    if (sector.id[0]=='E') {
      // initial values of the particule
      const a_p=particule.a,q=particule.q,m=particule.mr;
      const x0=particule.x,y0=particule.y;
      const vx=particule.v*Math.cos(a_p-sector.a),vy=particule.v*Math.sin(a_p-sector.a);

      const E=sector.E;

      // time to travel through the section
      const l=sector.l;
      const delta=Math.pow(vx,2)+2*q*E*l/m;
      const tf=(-vx+Math.sqrt(delta))/(q*E/m);

      // coordonnates at the end of the electric section
      const dist=norme(l,vy*tf);
      const velocity=norme((q*E*tf/m+vx),vy); // final speed
      const a_pf=vector_angle((q*E*tf/m+vx),vy);//+sector.a)%(2*Math.PI);
      const vxf=velocity*Math.cos(a_pf);
      const vyf=velocity*Math.sin(a_pf);
      const a_dist=vector_angle(l,vy*tf);
      const x_f=dist*Math.cos(a_dist+sector.a_f)+x0;
      const y_f=dist*Math.sin(a_dist+sector.a_f)+y0;
      //draw_circle(ctx,x_f,y_f,5,"green");
      //draw_circle(ctx,x0,y0,3,"red");
      return([x_f,y_f,a_pf,velocity]);
    }
    /*else if (sector.id[0]=='I') {
      // initial values of the particule
      const a_p=particule.a,q=particule.q,m=particule.mr;
      const x0=particule.x,y0=particule.y;
      const vx=particule.v*Math.cos(a_p),vy=particule.v*Math.sin(a_p);

      // time to travel through the section
      const l=sector.l1;
      const tf=l/vx;

      // coordonnates at the end of the electric section
      const dist=norme(l,vy*tf);
      const velocity=norme(vx,vy); // final speed
      const a_pf=a_p+sector.a_f;//+sector.a)%(2*Math.PI);
      const x_f=dist*Math.cos(a_p+sector.a_f)+x0;
      const y_f=dist*Math.sin(a_p+sector.a_f)+y0;
      draw_circle(ctx,x_f,y_f,5,"green");
      draw_circle(ctx,x0,y0,3,"red");
      return([x_f,y_f,a_pf,velocity]);
    }*/
  }

  this.adapt_beam_focale_magnet=function(ctx,curr_part,sector) {
    const ffp=this.find_final_particule_x_y_a_v(ctx,curr_part,sector); // final state particule at the exit of an Electric field which is before a focal cavity
    const sector_after_E=this.next_sector(sector,c,[C,E,B,I,F]);
    const x_f=ffp[0],y_f=ffp[1],a_pf=ffp[2],velocity=ffp[3];
    if (sector_after_E.id[0]=='F') {
      let F0=sector_after_E;
      F0.change_focale_field(ctx,x_f,y_f,a_pf,velocity,curr_part.mr,curr_part.q);

      // find the next sector after the focale cavity
      const next_sector_F=this.next_sector(F0);
      if (next_sector_F.id[0]=="E") {
        const E1=next_sector_F;
        // create a new fictive particule that represente the current particule after the focale field
        var fictiv_particule=new particule(F0.x_f,F0.y_f,velocity,F0.a,curr_part.m,curr_part.q,curr_part.r,curr_part.color); // hypothesis: a_pf in the focale cavity is equal to the direction angle of the focale cavity
        // calcule of the finale velocity after the two electric fields and the focale field
        const ffp_fict=this.find_final_particule_x_y_a_v(ctx,fictiv_particule,E1);
        const velocity_fict=ffp_fict[3];

        // adapt/update the magnetic field to recenter the flow of particule
        const next_sector_E1=this.next_sector(E1);
        if (next_sector_E1.id[0]=='B') {
          const B0=next_sector_E1;
          B0.change_magnetic_field(velocity_fict,fictiv_particule.m,fictiv_particule.q);
        }
        else if (next_sector_E1.id[0]=='I' || next_sector_E1.id[0]=='R') {
          const I0=next_sector_E1;
          if (I0.state==1) {
            I0.change_magnetic_field(velocity_fict,curr_part.mr,curr_part.q);
          }
        }
      }
      /*else if (next_sector_F.id[0]=="I") {
        /*
        const I0=next_sector_F;
        if (I0.state==1) {
          I0.change_magnetic_field(velocity,curr_part.mr,curr_part.q);
        }
        //
        const I0=next_sector_F;
        // create a new fictive particule that represente the current particule after the first electric field
        var fictiv_particule_I=new particule(x_f,y_f,velocity,a_pf,curr_part.m,curr_part.q,curr_part.r,curr_part.color);
        fictiv_particule_I.plot(ctx);
        // find parameters of the particule after the insertion cavity at the state 0
        const param_after_I=this.find_final_particule_x_y_a_v(ctx,fictiv_particule_I,I0);
      }*/
    }
    /*else if (sector_after_E.id[0]=='I') {
      /*
      const I0=sector_after_E;
      // create a new fictive particule that represente the current particule after the first electric field
      var fictiv_particule_I=new particule(x_f,y_f,velocity,a_pf,curr_part.m,curr_part.q,curr_part.r,curr_part.color);
      fictiv_particule_I.plot(ctx);
      // find parameters of the particule after the insertion cavity at the state 0
      const param_after_I=this.find_final_particule_x_y_a_v(ctx,fictiv_particule_I,I0);

      // create a new fictive particule that represente the first fictiv particule after the intersection cavity
      var fictiv_particule_E=new particule(param_after_I[0],param_after_I[1],param_after_I[3],param_after_I[2],curr_part.m,curr_part.q,curr_part.r,curr_part.color); // hypothesis: a_pf in the focale cavity is equal to the direction angle of the focale cavity
      fictiv_particule_E.plot(ctx);
      // calcule of the finale velocity after the two electric fields and the focale field
      const E1=this.next_sector(I0);
      const param_after_E=this.find_final_particule_x_y_a_v(ctx,fictiv_particule_E,E1);
      const x_fict=param_after_E[0],y_fict=param_after_E[1],velocity_fict=param_after_E[3];
      // adapt/update the magnetic field to recenter the flow of particule
      const B0=this.next_sector(E1);
      if (B0.id[0]=='B') {
        const R=(norme(B0.p[1][0]-x_fict,B0.p[1][1]-y_fict)+B0.r)/2;
        B0.change_magnetic_field(velocity_fict,fictiv_particule_E.m,fictiv_particule_E.q,R);
      }
    }*/
  }

  this.switch_rejection_state_list=function() {
    for (let i=0; i<R.length; i++) {
      R[i].switch_state();
    }
  }

  this.movement=function(ctx,dt) { // animate the particules in the synchrotron
    for (let i=0; i<this.particules.length; i++) {
      let curr_part=this.particules[i]; // ou const ?
      if (this.sector(curr_part)!=0) { // check if the particule doesn't exit the synchrotron
        curr_part.movement(dt);
        curr_part.plot(ctx);
        if (curr_part.in_sector()==0) { // if the particule exit the current sector
          if (curr_part.sector.id[0]=="C") { // the next sector after C0 must be E0
            curr_part.sector=E[0];
          }
          else if (curr_part.sector.id[0]=="I" && curr_part.sector.state==0) {
            curr_part.sector.state=1;
            //curr_part.sector.change_magnetic_field();
            curr_part.next_sector(c,[C,E,B,I,R,F]);
          }
          else {
            curr_part.next_sector(c,[C,E,B,I,R,F]);
          }
          const sector=curr_part.sector;
          if (sector.id[0]=='E' && (this.next_sector(sector).id[0]=='F' /*|| this.next_sector(sector).id[0]=='I'*/) && i==0) { // limit to the first particule created
            this.adapt_beam_focale_magnet(ctx,curr_part,sector);
          }
        }
        document.getElementById("text_particule_speed").innerHTML="Speed: "+String(parseInt(curr_part.v))+" m.s-1";
        document.getElementById("text_particule_speed_c").innerHTML="v= "+String(parseInt(curr_part.v/299792458*10000)/100)+"% of c";
        const energy_particule=(curr_part.m*Math.pow(299792458,2)+1/2*curr_part.mr*Math.pow(curr_part.v,2))/(1.602e-19);
        document.getElementById("text_particule_energy").innerHTML="E= "+String(parseInt(energy_particule))+" eV";
        document.getElementById("text_particule_masse").innerHTML="m= "+String(parseInt(curr_part.mr/curr_part.m*1000)/10)+"%";
      }
      else {
        console.log(String(curr_part.mr)+" kg",String(curr_part.v)+" m.s-1");
        console.log("Last Sector: ",curr_part.sector.id);
        return(0);
      }
    }
    // display th etime since the beginning of the simulation
    time+=dt;
    document.getElementById("time_simulation").innerHTML="Number of iterations: "+String(parseInt(time/dt));
  }
}
