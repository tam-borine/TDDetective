'use babel';

import TddetectiveView from './tddetective-view';
import { CompositeDisposable } from 'atom';

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
    console.log('Tddetective was toggled!');
    let editor
    if (editor = atom.workspace.getActiveTextEditor()) {
      let selection = editor.getSelectedText()
      let result = this.hasSpecFileName()
      this.getSpecPath()

    }

  },

  hasSpecFileName(selection) {
    this.getSpecPath()
    // find current spec directory in a format of array
    // for each file split on '/' symbol
    // grep pattern match the selection that comes in and returns true or false based on array
    let editor = atom.workspace.getActiveTextEditor()

  },

  getSpecPath() {
    root = atom.project.getDirectories()
    return root[0].lowerCasePath + "/spec"
  }


};
