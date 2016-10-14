'use babel';

import Tddetective from '../lib/tddetective';
import TddetectiveView from '../lib/tddetective-view';
import TddetectiveModel from '../lib/tddetective-model';
import HelperModule from './helper-spec';


describe('Tddetective Model', () => {
  let workspaceElement, activationPromise;


  beforeEach(() => {
    helper = new HelperModule();
    tddetectiveModel = new TddetectiveModel();
    tddetectiveView = new TddetectiveView();
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('tddetective');
    var editor = helper.createMockEditor();
    editor = helper.addDataToMockEditor("I am test string for mock editor");
  });

  it("_getSpecPath is called by hasSpecFileName", () => {
    spyOn(tddetectiveModel, "_getSpecPath")
    tddetectiveModel.hasSpecFileName("Bike");

    expect(tddetectiveModel._getSpecPath).toHaveBeenCalled();
  })

  it("_hasMethodNameInSpecFile is called by manageMethodChanges", () => {
    spyOn(tddetectiveModel, "_hasMethodNameInSpecFile").andReturn(true)
    tddetectiveModel.manageMethodChanges("dock", new Range, editor);
    expect(tddetectiveModel._hasMethodNameInSpecFile).toHaveBeenCalled();
  })

  it ("_runScanFunction is called by findClassAndMethodLine", () => {
    spyOn(tddetectiveModel, "_runScanFunction")
    tddetectiveModel.findClassAndMethodLine(editor);

    expect(tddetectiveModel._runScanFunction).toHaveBeenCalled();
  });

  describe('findMethodObjName', () => {
    it('find the method object name without argument', () => {
      var buffer = editor.getBuffer();
      var aMethodName;
      buffer.scan("", function(obj) {aMethodName = obj})
      aMethodName.lineText = 'def testing';
      expect(tddetectiveModel.findMethodObjName(aMethodName)).toEqual('testing');
    });

    it('find the method object name with an argument declared inside brackets', () => {
      var buffer = editor.getBuffer();
      var aMethodName;
      buffer.scan("", function(obj) {aMethodName = obj})
      aMethodName.lineText = 'def testing(args)';
      expect(tddetectiveModel.findMethodObjName(aMethodName)).toEqual('testing');
    });

    it('find the method object name with an argument declared ouside brackets', () => {
      var buffer = editor.getBuffer();
      var aMethodName;
      buffer.scan("", function(obj) {aMethodName = obj})
      aMethodName.lineText = 'def testing args';
      expect(tddetectiveModel.findMethodObjName(aMethodName)).toEqual('testing');
    });
  });

    it("listens on changes and calls pickUpChanges", () => {

      atom.commands.dispatch(workspaceElement, 'tddetective:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        expect(Tddetective.listenToChanges).toHaveBeenCalled();
        expect(Tddetective.pickUpChanges).toHaveBeenCalled();
      });
    });





    xit("finds the class and method line in editor", () => {

      helperModule.createMockEditor()
      helperModule.addDataToMockEditor()

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

    xit('checks whether aClassName is a filename in spec dir', () => {
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
        expect(Tddetective.hasSpecFileName("tddetective")).toEqual(true)

      });
    });


});
