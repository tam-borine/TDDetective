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
    this.listenToChanges();
  },

  manageChanges(selection, classRange, editor) {
    let result = this.hasSpecFileName(selection)
    if (!result) {
      this.tddetectiveView.highlightText(selection, classRange, editor)
    }
  },

  removeAllDecorations(editor) {
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
    let editor = atom.workspace.getActiveTextEditor()

    var self = this
    editor.onDidChange(function() {
      classNames = []
      self.removeAllDecorations(editor);
      self._findClassNamesAndCallToggle(editor);
    });
  },

  _findClassNamesAndCallToggle(editor) {
    var self = this
    this._findClassNames(editor);
    classNames.forEach(function(className) {
      var classRange = className.computedRange
      className = className.lineText.substring(6);
      self.manageChanges(className, classRange, editor);
    })
  },

  _findClassNames(editor) {
    var buffer = editor.getBuffer();
    this._runScanFunction(buffer)
  },
  _runScanFunction(buffer){
    buffer.scan(/class /g, function(obj) { classNames.push(obj) })
  }

  // _runScanFunction(buffer){
  //   buffer.scan(/class /g, this._createArrayOfClassNames(obj))
  // },
  // _createArrayOfClassNames(obj) {
  //   classNames.push(obj.lineText)
  // }
  //
};
