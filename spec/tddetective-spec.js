'use babel';

import Tddetective from '../lib/tddetective';
import HelperModule from './helper-spec';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.



describe('Tddetective', () => {
  let workspaceElement, activationPromise;


  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('tddetective')
    var editor = helper.createMockEditor();
    editor = helper.addDataToMockEditor("I am test string for mock editor");
  });

    it("listenToChanges is called by toggle command", () => {
      spyOn(Tddetective, "listenToChanges").andReturn("hello")
      Tddetective.toggle();
      expect(Tddetective.listenToChanges).toHaveBeenCalled();
    });

    it("onDoneChange is called by listenToChanges when a change is made", () =>{
      spyOn(Tddetective, "makeEditor").andReturn(editor)
      atom.commands.dispatch(workspaceElement, 'tddetective:toggle');
      activationPromise.then(function(){
        atom.commands.dispatch(workspaceElement, 'tddetective:toggle');
        spyOn(Tddetective.tddetectiveModel, "onDoneChange")
        editor.emitter.emit('did-change');
        expect(Tddetective.tddetectiveModel.onDoneChange).toHaveBeenCalled();
        alert("hi")
      })


    });

});
