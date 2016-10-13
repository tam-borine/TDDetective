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

  describe("listening functionality", () => {
    it("listenToChanges is called by toggle command", () => {
      atom.commands.dispatch(workspaceElement, 'tddetective:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        expect(Tddetective.listenToChanges).toHaveBeenCalled();
      })
    })

    it("listens on changes and calls pickUpChanges", () => {
      // spyOn(Tddetective, "listenToChanges").and.callFake(function(){
      //
      // })

      atom.commands.dispatch(workspaceElement, 'tddetective:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        expect(Tddetective.listenToChanges).toHaveBeenCalled();
        expect(Tddetective._pickUpChanges).toHaveBeenCalled();
      })
    })

    xit("it calls toggle and pass class name, when class name is found", () => {

    })

    xit("scan is called on buffer", () => {
      spyOn(Tddetective, "runScanFunction")

      // atom.commands.dispatch(workspaceElement, 'tddetective:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        expect(Tddetective.runScanFunction()).toHaveBeenCalled();
      })


    })

    xit("find the class names in the active text editor", () => {

      helperModule.createMockEditor()
      helperModule.addDataToMockEditor()
        //
        // var buffer = editor.getBuffer()
        // var classNames = []
        //
      var selection = Tddetective.findClassNames(editor);
      expect(selection.includes("Bike")).toEqual(true)


    })
  })


  describe('CLASS NAME FIND', () => {

    it('checks whether aClassName is a filename in spec dir', () => {
      // This is an activation event, triggering it causes the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'tddetective:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        // let tddetectiveElement = workspaceElement.querySelector('.tddetective');
        var dir = atom.config.configDirPath + "/packages/TDDetective/spec" ;
        spyOn(Tddetective, '_getSpecPath').andReturn(dir);
        expect(Tddetective._hasSpecFileName("tddetective")).toEqual(true)

      });
    });
  });
});
