'use babel';

export default class HelperModule {

  createMockEditor(){
    var dir = atom.config.configDirPath + "/packages/TDDetective/spec/tddetective-spec.rb"
    var editor = atom.workspace.buildTextEditor();
  }

  addDataToMockEditor(testString){
    editor.buffer.cachedDiskContents = testString
    editor.buffer.cachedText = testString
    // console.log(dir)
    editor.buffer.file = new File([], false)
    editor.buffer.file.cachedContents = "class Bike"
    // console.log(editor)
  }


  // console.log(buffer)
  // console.log(classNames)
};


// BTW:

// Attaching the workspaceElement to the DOM is required to allow the
// `toBeVisible()` matchers to work. Anything testing visibility or focus
// requires that the workspaceElement is on the DOM. Tests that attach the
// workspaceElement to the DOM are generally slower than those off DOM.
//jamsmine.attachToDOM(workspaceElement)
