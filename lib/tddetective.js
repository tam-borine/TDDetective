'use babel';

import TddetectiveView from './tddetective-view';
import TddetectiveModel from './tddetective-model';
import { CompositeDisposable } from 'atom';
const fs = require('fs')
var classNames = []
var methodNames = []
var specFileNames = []

export default {

  tddetectiveView: null,
  tddetectiveModel: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.tddetectiveView = new TddetectiveView(state.tddetectiveViewState);
    console.log(state)
    this.tddetectiveModel = new TddetectiveModel(state.tddetectiveModelState);
    console.log(this.tddetectiveModel)
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
    this.tddetectiveModel.destroy();
  },

  serialize() {
    return {
      tddetectiveViewState: this.tddetectiveView.serialize(),
      tddetectiveModelState: this.tddetectiveModel.serialize()
    };
  },

  toggle() {
    this.listenToChanges();
  },

  makeEditor(){
    return atom.workspace.getActiveTextEditor()
  },

  listenToChanges(){
    var editor = this.makeEditor()
    var self = this
    editor.onDidChange(function(){self.tddetectiveModel.onDoneChange(self, editor)});
  }

};
