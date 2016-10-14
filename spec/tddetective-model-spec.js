'use babel';

import Tddetective from '../lib/tddetective';
import TddetectiveModel from '../lib/tddetective-model';
import HelperModule from './helper-spec';


describe('Tddetective Model', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    helper = new HelperModule();
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('tddetective');
  });

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
      });
    });

    xit("finds the class and method line in editor", () => {

      helperModule.createMockEditor()
      helperModule.addDataToMockEditor()
      //
      // var buffer = editor.getBuffer()
      // var classNames = []
      //
      var selection = Tddetective.findClassNames(editor);
      expect(selection.includes("Bike")).toEqual(true)
    });

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
