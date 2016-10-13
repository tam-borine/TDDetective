'use babel';

import Tddetective from '../lib/tddetective';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('Tddetective', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('tddetective');
  });

  describe("listening function", () => {
    it("the listening function is called in activate function", () => {
      spyOn(Tddetective, 'listenToChanges');
      atom.commands.dispatch(workspaceElement, 'tddetective:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        expect(Tddetective.listenToChanges).toHaveBeenCalled();
      })
    })

    it("listens on changes and calls findClassNamesAndCallToggle", () => {
      spyOn(Tddetective, 'findClassNamesAndCallToggle').andCallThrough();
      atom.commands.dispatch(workspaceElement, 'tddetective:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        expect(Tddetective.findClassNamesAndCallToggle).toHaveBeenCalled();
      })
    })

    xit("it calls toggle and pass class name, when class name is found", () => {

    })

    xit("scan is called on buffer", () => {
      spyOn(Tddetective, "runScanFunction")

      atom.commands.dispatch(workspaceElement, 'tddetective:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        expect(Tddetective.runScanFunction()).toHaveBeenCalled();
      })


    })

    xit("find the class names in the active text editor", () => {
      var testString = "class Bike"

      var dir = atom.config.configDirPath + "/packages/TDDetective/spec/tddetective-spec.rb"
      var editor = atom.workspace.buildTextEditor();
      editor.buffer.cachedDiskContents = testString
      editor.buffer.cachedText = testString
      console.log(dir)
      editor.buffer.file = new File([], false)
      editor.buffer.file.cachedContents = "class Bike"
      console.log(editor)

      var buffer = editor.getBuffer()
      var classNames = []


      console.log(buffer)
      console.log(classNames)
      var selection = Tddetective.findClassNames(editor);
      expect(selection.includes("Bike")).toEqual(true)


    })
  })


  describe('when the tddetective:toggle event is triggered', () => {
    xit('hides and shows the modal panel', () => {
      // Before the activation event the view is not on the DOM, and no panel
      // has been created
      expect(workspaceElement.querySelector('.tddetective')).not.toExist();

      // This is an activation event, triggering it will cause the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'tddetective:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        expect(workspaceElement.querySelector('.tddetective')).toExist();

        let tddetectiveElement = workspaceElement.querySelector('.tddetective');
        expect(tddetectiveElement).toExist();

        let tddetectivePanel = atom.workspace.panelForItem(tddetectiveElement);
        expect(tddetectivePanel.isVisible()).toBe(true);
        atom.commands.dispatch(workspaceElement, 'tddetective:toggle');
        expect(tddetectivePanel.isVisible()).toBe(false);
      });
    });

    it('checks whether aClassName is a filename in spec dir', function(){

      let tddetectiveElement = workspaceElement.querySelector('.tddetective');
    })

    it('checks whether aClassName is a filename in spec dir', () => {
      // This test shows you an integration test testing at the view level.

      // Attaching the workspaceElement to the DOM is required to allow the
      // `toBeVisible()` matchers to work. Anything testing visibility or focus
      // requires that the workspaceElement is on the DOM. Tests that attach the
      // workspaceElement to the DOM are generally slower than those off DOM.

      // This is an activation event, triggering it causes the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'tddetective:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        // let tddetectiveElement = workspaceElement.querySelector('.tddetective');
        var dir = atom.config.configDirPath + "/packages/TDDetective/spec" ;
        spyOn(Tddetective, 'getSpecPath').andReturn(dir);

        expect(Tddetective.hasSpecFileName("tddetective")).toEqual(true)

      });
    });
  });
});
