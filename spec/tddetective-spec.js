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
  //   helper = new HelperModule();
  //   workspaceElement = atom.views.getView(atom.workspace);
  //   activationPromise = atom.packages.activatePackage('tddetective');
    var editor = helper.createMockEditor();
    editor = helper.addDataToMockEditor("I am test string for mock editor");
  });

    it("listenToChanges is called by toggle command", () => {
      spyOn(Tddetective, "listenToChanges").andReturn("hello")
      Tddetective.toggle();
      expect(Tddetective.listenToChanges).toHaveBeenCalled();
    });

    it("onDoneChange is called by listenToChanges", () =>{
      console.log(editor);
      console.log(Tddetective)
      console.log(Tddetective.makeEditor)
      var spy = spyOn(Tddetective, "makeEditor").andReturn(editor)
      console.log(spy)

      setTimeout(function(){Tddetective.toggle(); }, 1000);

      expect(Tddetective.tddetectiveModel._onDoneChange).toHaveBeenCalled();
    })

});
