let canvas=document.getElementById("canvas");
let context=canvas.getContext("2d");

const height=canvas.height,width=canvas.width;

let dt;//=2e-7;
let scale;//=20; // scale the size of the synchrotron through the scale of the grid

let x;//=width*0.05;
let y;//=height*0.05;
let a;//=Math.PI/10;

var synchrotron=new Synchrotron();

let m_particules=9.109e-31; // masse (in kg) of the particules
let q_particules=-1.602e-19; // charge (in C) of the particules
let n_particules=1; // number of particules

// examples struct
//const struct="C 10(E(-1)) F E B(-20) E F E {I 200:500:6(E F E) R[0]} 10(E(-1) F(200)) E B(120) 12(E(-1) F(200)) E {I 250:1500:10(E F E) R[0]}"; // one inserstion and 6-side 100 radius synchrotron composed of E->F->E->B
//const struct="C E F E B(20) E F E {I 200:500:6(E F(500) E) R[0]} E F E B(-20) 10(E(-1)) F E {I 300:2000:10(E F E) R[0]}"; // par convention, on place un B à la fin du pattern, si R a un indice correspondant à la génération de la boucle alors on a un R à la fin du pattern
//const struct="C E 2(F(10)) E(10) 2(3(E(10))) 4(E(10) F(50) E(10))";
//const struct="C 10(E(-1)) F E B(-20) E F E {I 200:500:6(E F E) R[0]} 5(E(-1) F(200)) E {I 400:3000:10(10(E(-2)) F(500) E(-2)) R[0]}";
//const struct="C E F E B(120) E F E {I 200:500:6(E F(500) E) R[0]} E F E B(-180) E F E B(180) E F 18(E(-0.5)) F E {I 280:1100:8(E(-2) F E) R[8]}"
//const struct="C 10(E(-0.5)) F E {I 200:500:6(E F(500) E) R[0]} 10(E(-0.1)) F E B(60) E F E {I 200:500:6(E F(500) E) R[0]} E F E B(60) E F 18(E(-0.5)) F E {I 280:1000:8(6(E(-3)) F E) R[8]}";
let struct="";

function set_struct() {
  context.clearRect(0,0,width,height);
  dt=parseFloat(document.getElementById("dt_synchrotron").value);
  scale=parseFloat(document.getElementById("scale_synchrotron").value);
  x=parseFloat(document.getElementById("x_synchrotron").value);
  y=parseFloat(document.getElementById("y_synchrotron").value);
  a=parseFloat(document.getElementById("a_synchrotron").value)*Math.PI/180;

  struct=document.getElementById("structure_synchrotron").value;

  m_particules=parseFloat(document.getElementById("m_particules").value);
  q_particules=parseFloat(document.getElementById("q_particules").value);

  synchrotron.set_structure(x,y,a,struct,scale,context);
}

set_struct();


let compt=0;

function change_rejection_state() {
  synchrotron.switch_rejection_state_list();
}

function run() {
  function movement() {
    if (compt>=10) {
      context.clearRect(0,0,width,height);
      synchrotron.plot(context); // problem: stop the simulation at the begining
      compt=0;
    }
    else {compt++;}
    if(synchrotron.movement(context,dt)==0) {
      clearInterval(interval);
    }
  }

  synchrotron.create_particules(n_particules,m_particules,q_particules,0.5,"white");
  var interval=setInterval(movement,10);
}




/* to do list
take relativitic restrictions
create to railways clockwise and counterclockwise
*/
