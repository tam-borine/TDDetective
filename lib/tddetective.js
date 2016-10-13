'use babel';

import TddetectiveView from './tddetective-view';
import { CompositeDisposable } from 'atom';
const fs = require('fs')
var classNames = []
var methodNames = []
var specFileNames = []

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

  listenToChanges(){
    let editor = atom.workspace.getActiveTextEditor()
    var self = this
    editor.onDidChange(function() {
      classNames = []
      specFileNames = []
      self.tddetectiveView.removeAllDecorations(editor);
      // self.tddetectiveView.removeAllNotifications();
      self._pickUpChanges(editor);
    });
  },

  _pickUpChanges(editor) {
    var self = this
    this._findClassAndMethodLine(editor);
    classNames.forEach(function(aClassName) {
      var classRange = self._findClassObjRange(aClassName);
      var className = self._findClassObjName(aClassName);
      self._manageClassChanges(className, classRange, editor);
    })
    methodNames.forEach(function(aMethodName) {
      var methodRange = self._findMethodObjRange(aMethodName);
      var methodName = self._findMethodObjName(aMethodName);
      self._manageMethodChanges(methodName, methodRange, editor)
    })
  },

  _findClassAndMethodLine(editor) {
    var buffer = editor.getBuffer();
    this._runScanFunction(buffer)
  },

  _runScanFunction(buffer){
    buffer.scan(/class /g, function(obj) { classNames.push(obj) })
    buffer.scan(/def /g, function(obj) { methodNames.push(obj) })
  },

  _findClassObjRange(aClassName){
    return classRange = aClassName.computedRange;
  },

  _findClassObjName(aClassName){
    return className = aClassName.lineText.substring(6);
  },

  _manageClassChanges(aClassName, classRange, editor) {
    let selection = this._hasSpecFileName(aClassName)
    if (!selection) {
      this.tddetectiveView.updateView(aClassName, classRange, editor)
    }
  },

  _hasSpecFileName(aClassName) {
    var path = this._getSpecPath() + '/' + aClassName.toLowerCase() + '_spec.rb'
    if (fs.existsSync(path)) {
      specFileNames.push(path);
    }
    return fs.existsSync(path)
  },

  _getSpecPath() {  //STUBBED IN TEST
    var root = atom.project.getDirectories()
    return root[0].lowerCasePath + "/spec"
  },

  _manageMethodChanges(aMethodName, methodRange, editor) {
    var selection = this._hasMethodNameInSpecFile(aMethodName);
    if (!selection) {
      this.tddetectiveView.updateView(aMethodName, methodRange, editor)
    }
  },

  _hasMethodNameInSpecFile(aMethodName) {

  }

};
