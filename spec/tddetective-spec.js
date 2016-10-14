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
    helper = new HelperModule();
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('tddetective');
    var editor = helper.createMockEditor();

//not actually returning prmoise obj need to construct one?
    spyOn(Tddetective, "listenToChanges").andCallFake(function(editor){
      // changePromise = editor.emitter.emit('did-change', true);
      console.log(editor) //why is this undefined????????? how to inject editor here?
            // waitsForPromise(() => {
            //   return changePromise;
            // });

            // runs(() => {
              spyOn(editor, "onDidChange");
              spyOn(Tddetective, "_pickUpChanges");
            // })
    })
  });

    it("listenToChanges is called by toggle command", () => {
      atom.commands.dispatch(workspaceElement, 'tddetective:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        expect(Tddetective.listenToChanges).toHaveBeenCalled();
      });
    });

});
