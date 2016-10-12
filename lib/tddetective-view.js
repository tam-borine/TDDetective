'use babel';

export default class TddetectiveView {

  constructor(serializedState) {
    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('tddetective');


    // Create message element
    const message = document.createElement('div');
    message.textContent = 'The Tddetective package is Alive! It\'s ALIVE!';
    message.classList.add('message');
    this.element.appendChild(message);


  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  getElement() {
    return this.element;
  }


  highlightText(selection) {
   editor = atom.workspace.getActiveTextEditor()
   range = editor.getSelectedBufferRange(selection)
   marker = editor.markBufferRange(range)

   decoration = editor.decorateMarker(marker, {type: 'line', class: 'highlights'})

  //  var audio = new Audio('/Users/James/Desktop/klaxon_horn_blast.mp3');
  //  audio.play();
  }
}
