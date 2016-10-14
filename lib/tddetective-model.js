'use babel';
const fs = require('fs')


export default class TddetectiveModel {

  _onDoneChange(self, editor){
      classNames = []
      methodNames = []
      specFileNames = []
      self.tddetectiveView.removeAllDecorations(editor);
      self.tddetectiveView.removeAllNotifications();
      this._pickUpChanges(self, editor);
  }

  _pickUpChanges(self, editor) {
    var selfy = this;
    this._findClassAndMethodLine(editor);
    classNames.forEach(function(aClassName) {
      var classRange = selfy._findClassObjRange(aClassName);
      var className = selfy._findClassObjName(aClassName);
      selfy._manageClassChanges(className, classRange, editor, self);
    })
    methodNames.forEach(function(aMethodName) {
      var methodRange = selfy._findMethodObjRange(aMethodName);
      var methodName = selfy._findMethodObjName(aMethodName);
      selfy._manageMethodChanges(methodName, methodRange, editor, self)
    })
  }

  _findClassAndMethodLine(editor) {
    var buffer = editor.getBuffer();
    this._runScanFunction(buffer)
  }

  _runScanFunction(buffer){
    buffer.scan(/class /g, function(obj) { classNames.push(obj) })
    buffer.scan(/def /g, function(obj) { methodNames.push(obj) })
  }

  _findClassObjRange(aClassName){
    return aClassName.computedRange;
  }

  _findClassObjName(aClassName){
    return aClassName.lineText.substring(6);
  }

  _findMethodObjRange(aMethodName){
    return aMethodName.computedRange;
  }

  _findMethodObjName(aMethodName){
    var spacePosition = aMethodName.lineText.indexOf("def") + 4
    var methodName = aMethodName.lineText.substring(spacePosition);
    if (methodName.indexOf("(") != -1) {
      var charPosition = methodName.indexOf("(")
      methodName = methodName.substring(0, charPosition)
    } else if (methodName.indexOf(" ") != -1) {
      var charPosition = methodName.indexOf(" ")
      methodName = methodName.substring(0, charPosition)
    }
    return methodName
  }

  _manageClassChanges(aClassName, classRange, editor, self) {
    let selection = this._hasSpecFileName(aClassName)
    if (!selection) {
      self.tddetectiveView.updateView(aClassName, classRange, editor)
    }
  }

  _hasSpecFileName(aClassName) {
    var path = this._getSpecPath() + '/' + aClassName.toLowerCase() + '_spec.rb'
    if (fs.existsSync(path)) {
      specFileNames.push(path);
    }
    return fs.existsSync(path)
  }

  _getSpecPath() {  //STUBBED IN TEST
    var root = atom.project.getDirectories()
    return root[0].lowerCasePath + "/spec"
  }

  _manageMethodChanges(aMethodName, methodRange, editor, self) {
    var selection = this._hasMethodNameInSpecFile(aMethodName);
    if (!selection) {
      self.tddetectiveView.updateView(aMethodName, methodRange, editor)
    }
  }

  _hasMethodNameInSpecFile(aMethodName) {
    var searchResult = false
    specFileNames.forEach(function(specFile) {
      var fileContent = fs.readFileSync(specFile, "utf-8")
      if (fileContent.indexOf(aMethodName) != -1) {
        searchResult = true
      }
    })
    return searchResult
  }

}
