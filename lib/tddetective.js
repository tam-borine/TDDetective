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

  listenToChanges(editor){
    console.log("listen to changes was called")
    var editor = editor ? editor : atom.workspace.getActiveTextEditor()
    console.log(editor)
    console.log("above was console logged from function call")
    var self = this
    editor.onDidChange(function() {
      classNames = []
      self.tddetectiveView.removeAllDecorations(editor);
      self._pickUpChanges(editor);
    });
  },

  _pickUpChanges(editor) {
    var self = this
    this._findClassLine(editor);
    classNames.forEach(function(aClassName) {
      var classRange = self._findClassObjRange(aClassName);
      var className = self._findClassObjName(aClassName);
      self._manageChanges(className, classRange, editor);
    })
  },

  _findClassLine(editor) {
    var buffer = editor.getBuffer();
    this._runScanFunction(buffer)
  },

  _runScanFunction(buffer){
    buffer.scan(/class /g, function(obj) { classNames.push(obj) })
  },

  _findClassObjRange(aClassName){
    return classRange = aClassName.computedRange;
  },

  _findClassObjName(aClassName){
    return className = aClassName.lineText.substring(6);
  },

  _manageChanges(aClassName, classRange, editor) {
    let selection = this._hasSpecFileName(aClassName)
    if (!selection) {
      this.tddetectiveView.highlightText(aClassName, classRange, editor)
    }
  },

  _hasSpecFileName(aClassName) {
    var path = this._getSpecPath() + '/' + aClassName.toLowerCase() + '-spec.js'
    return fs.existsSync(path)
  },

  _getSpecPath() {  //STUBBED IN TEST
    var root = atom.project.getDirectories()
    return root[0].lowerCasePath + "/spec"
  }

// code below is an option for easier testing

  // _runScanFunction(buffer){
  //   buffer.scan(/class /g, this._createArrayOfClassNames(obj))
  // },
  // _createArrayOfClassNames(obj) {
  //   classNames.push(obj.lineText)
  // }
  //
};
