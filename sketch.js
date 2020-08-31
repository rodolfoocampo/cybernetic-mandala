var resolution;
var cols;
var rows;
var grid;
var soundObjects;
var synth;
var time;
var framerate;
var color_factor;
var rComponentBackground
var gComponentBackground
var adjustableB_background
var shiftFactor;
var canvas;
var running;
var midi_note_selected;
var scale_type_selected;
var consonantbackground;
var color_offset;
var roundness;



function setup() {

  // SET UP LAYOUT


  noLoop()
  running = 0;
  // SOME INITIAL BOARD CONFIGURATION
  canvas = createCanvas(1000, 1000);
  strokeWeight(4);
  stroke(51);


  // attach events

  canvas.mouseOver(prompt);
  canvas.mouseOut(titleBack);




  // APPEND TO PARENT IN DOM

  canvas.parent('canvas')

  strokeWeight(0);


  // get notes to use
  midi_note_selected = document.getElementById('midi_note').value;
  scale_type_selected = document.getElementById('scale_type').value;

  notes = get_scale(midi_note_selected, scale_type_selected, 1)



  time = 0

  // store the played notesas a list because we will play them like chords



  // DEFINE GLOBAL VARIABLES USED THROUGHOUT THE PROGRAM
  resolution = 20;
  cols = width / resolution
  rows = width / resolution
  grid = make2Darray(cols, rows);



  ///// SET INITIAL STATE



  Tone.Transport.toggle()


  //// COLOR CONFIGURATION

  color_factor = 25
  consonant_color = (3 * notes[0]) / 2 % 255
  shiftFactor = 100




  //// SET THIS TO AN OBJECT

  sounds = {
    note_frequency: notes,
    velocity: [.3],
    instrument: [1, 2, 3],
    duration: [1]
  }

  ///INITIALIZE SYNTH
  // get yo' Synth
  //polySynth = new p5.PolySynth();

  Tone.Transport.toggle


  synth = new Tone.PolySynth(2, Tone.Synth).toMaster();
  //synth = new Tone.Synth();
  //set the attributes using the set interface
  synth.set("detune", -1200);
  //play a chord



  synth.set({
    "filter": {
      "type": "lowpass"
    },

    "envelope": {
      "attack": 3,
      "sustain": 2,
      "decay": 1,
      "release": 11
    }
  });

}

function titleBack() {
  let heading = select('#title');
  heading.html("Cybernetic Mandala");
}

function prompt() {

  let heading = select('#title');

  heading.html("Tap anywhere to plant cell");

}

function isInsideCanvas() {
  var testDiv = document.getElementById("canvas");
  if (mouseX > 0 && mouseY < height && mouseX < width && mouseY > 0) {
    return true;
  } else {
    return false;
  }

}

function mouseClicked() {

  // check if mouse is over canvas  by calculating distance to center. If greater than half of the side it is outside


  //dist(mouseX,mouseY,canvas)


  if (isInsideCanvas()) {
    let new_seed = placeSeed(mouseX, mouseY)
    grid[new_seed[0]][new_seed[1]] = 1

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        centX = resolution * i
        centY = resolution * j
        if (grid[i][j] == 1) {
          roundness = document.getElementById('roundness').value;
        square(centX, centY, resolution, roundness)
          let how_many_notes = sounds.note_frequency.length
          let note = sounds.note_frequency[i % how_many_notes]
          ////. SCALE DOWN TO A RANGE 
          color_value = note


          //fill(color_value%100,80,210)
          
          fill(random(255), random(255), random(255))

        }
      }
    }
  }
}

function placeSeed(xmouse, ymouse) {
  let mindist = 100000;
  var current;
  let minX, minY;
  let mintuple;
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      // find minimum distance cell from mouseclick
      centX = resolution * i
      centY = resolution * j
      current = dist(centX, centY, xmouse, ymouse)


      if (current < mindist) {
        mindist = current;
        minX = i;
        minY = j;
      }

    }
  }
  mintuple = [minX, minY]

  return mintuple;
}

function doubleClicked() {



}


function get_scale(midi_number, name, octaves) {
  /// TO GET A SCALE IN A CERTAIN KEY, YOU TAKE THE KEY AND TAKE STEPS FROM IT. HOW YOU TAKES THOSE STEPS DEFINED THE 
  // SCALE, THEY ARE USUALLY WHOLE OR HALF STEPS. A WHOLE NOTE STAPE IS GOING TWO NUMBERS TWO IN THE NOTES, OR TWO KEY TO THE RIGHT IN THE PIANO, TAKING INTO ACCOUNT THE BLACK KEYS. A HALF STEP IS GOING UP JUST ONE.

  // Minor scale is defined as WHOLE, HALF, WHOLE, WHOLE, HALF, WHOLE, WHOLE, WHOLE, SO YOU TAKE 2,1,2,2,1,2,2 FROM THE GIVEN KEY BY SUMMING 1 OR 2

  midi_number = int(midi_number)
  var notes = [];
  switch (name) {
    case 'minor_natural':
      //     
      for (let i = 0; i < octaves; i++) {
        notes.push(midiToFreq(midi_number))
        midi_number += 2

        notes.push(midiToFreq(midi_number + (8 * i)))
        midi_number += 1
        notes.push(midiToFreq(midi_number + (8 * i)))
        midi_number += 2
        notes.push(midiToFreq(midi_number + (8 * i)))
        midi_number += 2
        notes.push(midiToFreq(midi_number + (8 * i)))
        midi_number += 1
        notes.push(midiToFreq(midi_number + (8 * i)))
        midi_number += 2
        notes.push(midiToFreq(midi_number + (8 * i)))
        midi_number += 2
        notes.push(midiToFreq(midi_number + (8 * i)))
      }
      break;
    case 'major_natural':
      for (let i = 0; i < octaves; i++) {
        notes.push(midiToFreq(midi_number))
        midi_number += 2
        notes.push(midiToFreq(midi_number + (8 * i)))
        midi_number += 2
        notes.push(midiToFreq(midi_number + (8 * i)))
        midi_number += 1
        notes.push(midiToFreq(midi_number + (8 * i)))
        midi_number += 2
        notes.push(midiToFreq(midi_number + (8 * i)))
        midi_number += 2
        notes.push(midiToFreq(midi_number + (8 * i)))
        midi_number += 2
        notes.push(midiToFreq(midi_number + (8 * i)))
        midi_number += 1
        notes.push(midiToFreq(midi_number + (8 * i)))
      }
      break;
    case 'major_pentatonic':

      for (let i = 0; i < octaves; i++) {
        notes.push(midiToFreq(midi_number + (8 * i)))
        midi_number += 4
        notes.push(midiToFreq(midi_number + (8 * i)))
        midi_number += 3
        notes.push(midiToFreq(midi_number + (8 * i)))
        midi_number += 2
        notes.push(midiToFreq(midi_number + (8 * i)))
      }
      break;
    case 'minor_pentatonic':
      //     
      for (let i = 0; i < octaves; i++) {
        notes.push(midiToFreq(midi_number))
        midi_number += 2

        midi_number += 1
        notes.push(midiToFreq(midi_number + (8 * i)))
        midi_number += 2
        notes.push(midiToFreq(midi_number + (8 * i)))

        midi_number += 2
        notes.push(midiToFreq(midi_number + (8 * i)))

        midi_number += 1
        midi_number += 2
        notes.push(midiToFreq(midi_number + (8 * i)))
        midi_number += 2
        notes.push(midiToFreq(midi_number + (8 * i)))
      }
      break;
    case 'major_chord':


      for (let i = 0; i < octaves; i++) {
        notes.push(midiToFreq(midi_number))
        midi_number += 4
        notes.push(midiToFreq(midi_number))
        midi_number += 3;
        notes.push(midiToFreq(midi_number))
        midi_number += 4;
        notes.push(midiToFreq(midi_number))

      }
      break;
    case 'minor_chord':


      for (let i = 0; i < octaves; i++) {
        notes.push(midiToFreq(midi_number))
        midi_number += 3
        notes.push(midiToFreq(midi_number))
        midi_number += 4;
        notes.push(midiToFreq(midi_number))
        midi_number += 3;
        notes.push(midiToFreq(midi_number))

      }
      break;

    default:
      // code block
  }

  return notes;
}



function make2Darray(rows, cols) {
  var matrix = new Array(rows);

  for (i = 0; i < cols; i++) {
    matrix[i] = new Array(cols).fill(0);
  }
  return matrix;
}

function neighborCount(matrix, x, y) {
  let nsum = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      let col = (x + i + cols) % cols;
      let row = (y + i + rows) % rows;
      nsum += matrix[col][row];
    }
  }
  nsum -= matrix[x][y];
  return nsum
}

function countNeighbors(grid, x, y) {
  let sum = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      let col = (x + i + cols) % cols;
      let row = (y + j + rows) % rows;
      sum += grid[col][row];
    }
  }
  sum -= grid[x][y];
  return sum;
}

function draw() {

  time = Tone.Transport.seconds.toFixed(1)

  var framerate_input = document.getElementById('framerate')

  framerate_sel = document.getElementById('framerate').value / 60;
  frameRate(framerate_sel)
  framerate_input.innerHTML = framerate_sel


  //select notes
  midi_note_selected = document.getElementById('midi_note').value;
  scale_type_selected = document.getElementById('scale_type').value;

  notes = get_scale(midi_note_selected, scale_type_selected, 1)

  sounds.note_frequency = notes



  ///// CONSONANCE TRANSFER: GET THE PERFECT FIFTH OF THE LAST NOTE IN THE SCALE AND USE IT AS BACKGROUND


  consonantbackground = consonant_color

  color_offset = 50
  background(30, 1, 100)

  let playednotes = [];
  let how_many_living = 0
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      centX = resolution * i
      centY = resolution * j
      if (grid[i][j] == 1) {
        how_many_living += 1

        //////////// -------------------------------------///////////////////////////////////
        ///////////////////////-----------------------------------------/////////////////////////////
        ///////////  ----------------------- PLAY AND COLOR  ------------------------------------- /////////////////
        ////////////////////////////////////// -------------------------------------//////////////////////
        //////////// -------------------------------------///////////////////////////////////
        ////////////////////////////////////// -------------------------------------////////////////
        ///////////////////////////////////////////// -------------------------------------////////////////
        ////////////////////////////////////////////////// ----------------------////////////////

        let how_many_notes = sounds.note_frequency.length
        let how_many_vels = sounds.velocity.length
        let how_many_durs = sounds.duration.length
        var note = sounds.note_frequency[i % how_many_notes]

        let velocity = sounds.velocity[j % how_many_vels]
        let duration = sounds.duration[i % how_many_durs]


        playednotes.push(note);

        //polySynth.setADSR(30,20,10,70)
        //polySynth.play(note, 0, time + 1, 1);


        if (how_many_living < 10) {
          Tone.Transport.schedule(synth.triggerAttackRelease(note, '16n'), time + .1)
        }


        roundness = document.getElementById('roundness').value;
        square(centX, centY, resolution, roundness)

        ////. SCALE DOWN TO A RANGE WITH HIGH COLOR VARIABILITY
        for (let h = 0; h < how_many_notes - 1; h++) {

          if (note == sounds.note_frequency[h]) {
            color_value = 255 / how_many_notes * h
          }
        }

        

        fill(random(255), random(255), random(255))


      }
    }

  }



  let newmat = make2Darray(rows, cols);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      // traverse neighbors
      let state = grid[i][j];


      let neighbors = countNeighbors(grid, i, j)

      var die = document.getElementById('dieinput').value;

      var born = document.getElementById('borninput').value;
      
      var survive = document.getElementById('surviveinput').value;

      // we will not add a mantain state rule
      //var survive = document.getElementById('surviveinput').value;
      
      
       // SURVIVE
      
     let surviverules = survive.split(',');
      for (let g = 0; g < surviverules.length; g++) {
        let current_rule = surviverules[g];
        if (document.getElementById('comparesurvive').value == "equal") {

          if (neighbors == current_rule) {

            newmat[i][j] = state;
          }
        } else if (document.getElementById('comparesurvive').value == "more") {
          if (neighbors > current_rule) {
            newmat[i][j] = state;
          }
        } else {
          if (neighbors < current_rule) {
            newmat[i][j] = state;
          }
        }

      }


      let dierules = die.split(',');

      if (document.getElementById('comparedie').value == "equal") {

        if (neighbors == dierules) {

          newmat[i][j] = 0;
        }
      } else if (document.getElementById('comparedie').value == "more") {
        if (neighbors > dierules) {
          newmat[i][j] = 0;
        }
      } else {
        if (neighbors < dierules) {
          newmat[i][j] = 0;

        }
      }


      let bornrules = born.split(',');
      for (let g = 0; g < bornrules.length; g++) {
        let current_rule = bornrules[g];
        if (document.getElementById('compareborn').value == "equal") {

          if (neighbors == current_rule) {

            newmat[i][j] = 1;
          }
        } else if (document.getElementById('compareborn').value == "more") {
          if (neighbors > current_rule) {
            newmat[i][j] = 1;
          }
        } else {
          if (neighbors < current_rule) {
            newmat[i][j] = 1;
          }
        }

      }

     

      /*
       if (document.getElementById('comparesurvive').value == "equal") {
        
        if  (neighbors == survive){
          
          newmat[i][j] = state;
          } 
        } else if (document.getElementById('comparesurvive').value == "more"){
          if  (neighbors > survive){
          newmat[i][j] = state;
          } 
        } else {
          if  (neighbors < survive){
            newmat[i][j] = state;
          
      } 
           
        }
      */

    }
  }

  grid = newmat;

}



function create() {
  loop()
}

function restart() {
  noLoop()
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = 0;
    }
  }
}