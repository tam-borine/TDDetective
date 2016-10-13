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

  updateView(selection, classRange, editor) {
    this.highlightText(classRange, editor);
    this.playSound();
    this.showNotification(selection);
  }

  highlightText(aClassName, classRange, editor) {
    marker = editor.markBufferRange(classRange)
    decoration = editor.decorateMarker(marker, {type: 'line', class: 'highlights'})
    this.playSound();
    this.showNotification(selection)
  }

  playSound() {
    var audioFile = atom.config.configDirPath + "/packages/TDDetective/public/audio/klaxon_horn_blast.mp3"
    var audio = new Audio(audioFile);
    audio.play();
  }

  showNotification(selection) {
    atom.notifications.addWarning("Missing spec file for " + selection)
    atom.notifications.getNotifications
  }

  removeAllDecorations(editor) {
    decorations = editor.decorationManager.getDecorations()
    decorations.forEach(function(decoration) {
      decoration.destroy();
    })
  }

  removeAllNotifications() {
    atom.workspace.notificationManager.notifications = []
  }
}
