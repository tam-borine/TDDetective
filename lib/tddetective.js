'use babel';

import TddetectiveView from './tddetective-view';
import { CompositeDisposable } from 'atom';
const fs = require('fs')
var classNames = []

export default {


  tddetectiveView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.tddetectiveView = new TddetectiveView(state.tddetectiveViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.tddetectiveView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'tddetective:toggle': () => this.toggle()
    }));
    this.listenToClassNames();
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.tddetectiveView.destroy();
  },

  serialize() {
    return {
      tddetectiveViewState: this.tddetectiveView.serialize()
    };
  },

  toggle() {
    console.log('Tddetective was toggled!');
    let editor
    if (editor = atom.workspace.getActiveTextEditor()) {
      let selection = selection || editor.getSelectedText()
      let result = this.hasSpecFileName(selection)
      // if (!result) {
      //   selection = selection.split("").reverse().join("");
      //   editor .insertText(selection)
      //  }

    return result
    }

  },

  hasSpecFileName(selection) {
    var path = this.getSpecPath() + '/' + selection.toLowerCase() + '-spec.js'
    return fs.existsSync(path)

  },

  getSpecPath() {  //STUBBED IN TEST
    root = atom.project.getDirectories()
    return root[0].lowerCasePath + "/spec"
  },

  listenToClassNames() {
    // LISTEN
    var classNames = this.findClassNames();
    classNames.forEach(function(className) {
      this.toggle(className);
    })
  },
  findClassNames(receivedEditor) {
    var editor = receivedEditor === undefined ? atom.workspace.getActiveTextEditor() : receivedEditor
    var buffer = editor.getBuffer();
    this.runScanFunction(buffer)
    return classNames
  },
  runScanFunction(buffer){
    buffer.scan(/class /g, this.createArrayOfClassNames(obj))
  },
  createArrayOfClassNames(obj) {
    classNames.push(obj.lineText)
  }


};
