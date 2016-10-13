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

    this.allDecorations = []
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

  updateView(name, range, editor) {
    this.highlightText(range, editor);
    this.playSound();
    // this.showNotification(aClassName);
  }

  highlightText(range, editor) {
    marker = editor.markBufferRange(range)
    decoration = editor.decorateMarker(marker, {type: 'line', class: 'highlights'})
    this.allDecorations.push(decoration)
  }

  playSound() {
    var audioFile = atom.config.configDirPath + "/packages/TDDetective/public/audio/klaxon_horn_blast.mp3"
    var audio = new Audio(audioFile);
    audio.play();
  }

  showNotification(name) {
    atom.notifications.addWarning("Missing spec file for " + name)
    atom.notifications.getNotifications
  }

  removeAllDecorations(editor) {
    var decorationsInEditor = editor.decorationManager.getDecorations()
    this.allDecorations.forEach(function(decoration) {
      if (decorationsInEditor.indexOf(decoration)) {
        decoration.destroy()
      }
    })
    this.allDecorations = []
  }

  removeAllNotifications() {
    atom.workspace.notificationManager.notifications = []
  }
}
