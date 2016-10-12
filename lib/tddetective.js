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
    this.listenToChanges();
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
    let editor;
    if (editor = atom.workspace.getActiveTextEditor()) {
      this.removeAllDecorations();
      let selection = selection || editor.getSelectedText()
      let result = this.hasSpecFileName(selection)
      if (!result) {
        this.tddetectiveView.highlightText(selection)
       }
    // return result
    }
  },

  removeAllDecorations() {
    editor = atom.workspace.getActiveTextEditor();
    decorations = editor.decorationManager.getDecorations()
    decorations.forEach(function(decoration) {
      decoration.destroy();
    })
  },

  hasSpecFileName(selection) {
    var path = this.getSpecPath() + '/' + selection.toLowerCase() + '-spec.js'
    return fs.existsSync(path)
  },

  getSpecPath() {  //STUBBED IN TEST
    var root = atom.project.getDirectories()
    return root[0].lowerCasePath + "/spec"
  },

  listenToChanges(){
    // self = this
    var editor = atom.workspace.getActiveTextEditor()
    editor.onDidChange(this.findClassNamesAndCallToggle);
  },

  findClassNamesAndCallToggle(receivedEditor) {
    var editor = receivedEditor === undefined ? atom.workspace.getActiveTextEditor() : receivedEditor
    var classNames = this.findClassNames(editor);
    classNames.forEach(function(className) {
      this.toggle(className);
    })
  },

  _findClassNames(editor) {
    var buffer = editor.getBuffer();
    this.runScanFunction(buffer)
    return classNames
  },
  _runScanFunction(buffer){
    console.log(buffer)
    buffer.scan(/class /g, this.createArrayOfClassNames(obj))
  },
  _createArrayOfClassNames(obj) {
    classNames.push(obj.lineText)
  }

};
