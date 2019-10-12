# Synchrotron

This program allows you to see and understand how a synchrotron work in a simplified simulation.

The synchrotron is composed of a few specialzed sections:
- Electric cavity:            letter E, white block 
- Magnetic cavity:            letter M, lightblue curved block
- Focale cavity:              letter F, blue block
- Insersion cavity:           letter I, red y-shape block
- Rejection cavity:           letter R, orange y-shape block
- Creation particules cavity: letter C, grey block

Each of these block have a specific letter that can be use to create your own synchrotron structure.

Block parameters:
- Electric cavity: E or E(-1) (electric field with a strength of -1 V
- Magnetic cavity: B(20) (curved block with an angle of 20°degrees)
- Focale cavity: F or F(100) (block with a length of 100*scale pixels)

Make product: a number next to parantheses, every block must be set with the parameters
- 6(E(-1)) = E(-1) E(-1) E(-1) E(-1) E(-1) E(-1)
- 2(E(-0.5) F(50)) = E(-0.5) F(50) E(-0.5) F(50)

Make a line: a sequence of block E,F,B
- If you use a B-block:
  - The sequence before the B-block must be: E F E (example: E(-1) F(100) E B(20) or E F E B(180))
  - The angle must be positive, begin at 0°degree and can end at 360°degree
- If you use a F-block, you must place a E-block before the F-block

Make loop: {I w:r:n(pattern) R[i]}
- I is the insertion block which represent the enter point of the synchrotron
- w is the width of the loop
- r is the radius of the loop
- n is the number of side of the loop
- pattern is your pattern between every magnetic block (example: E F E or E F E(-1) or 4(E(-2) F(150)) E(-1))
      (!!! your pattern must end with a E-block !!!)
- R[i] is the rejection block which represent the exit point of the synchrotron, it is place at the corner i of the loop
      (!!! i begin at zero and end at n-1 !!!)

To create your particule accelerator, you have to enter a sequence in the textarea:
- Every letter must be in capital letter 
- It must begin by a C
- You can add line and loop without restrictions

To exit a loop, you have to push the button "Exit of a Synchrotron Loop" before the particule enter in the R-block.

Enjoy your simulation !
