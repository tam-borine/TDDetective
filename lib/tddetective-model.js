'use babel';
const fs = require('fs')


export default class TddetectiveModel {

  _onDoneChange(self, editor){
      classNames = []
      methodNames = []
      specFileNames = []
      console.log(self)
      console.log("LOOK ABOVE")
      self.tddetectiveView.removeAllDecorations(editor);
      self.tddetectiveView.removeAllNotifications();
      this._pickUpChanges(self, editor);
  }

  _pickUpChanges(self, editor) {
    var self = this
    this._findClassAndMethodLine(editor);
    classNames.forEach(function(aClassName) {
      var classRange = this._findClassObjRange(aClassName);
      var className = this._findClassObjName(aClassName);
      self._manageClassChanges(className, classRange, editor);
    })
    methodNames.forEach(function(aMethodName) {
      var methodRange = this._findMethodObjRange(aMethodName);
      var methodName = this._findMethodObjName(aMethodName);
      this._manageMethodChanges(methodName, methodRange, editor)
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
    return classRange = aClassName.computedRange;
  }

  _findClassObjName(aClassName){
    return className = aClassName.lineText.substring(6);
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

  _manageClassChanges(self, aClassName, classRange, editor) {
    let selection = this._hasSpecFileName(aClassName)
    if (!selection) {
      self.tddetectiveView.updateView(aClassName, classRange, editor)
    }
  }

  _hasSpecFileName(aClassName) {
    var path = this._getSpecPath() + '/' + aClassName.toLowerCase() + '-spec.js'
    if (fs.existsSync(path)) {
      specFileNames.push(path);
    }
    return fs.existsSync(path)
  }

  _getSpecPath() {  //STUBBED IN TEST
    var root = atom.project.getDirectories()
    return root[0].lowerCasePath + "/spec"
  }

  _manageMethodChanges(aMethodName, methodRange, editor) {
    var selection = this._hasMethodNameInSpecFile(aMethodName);
    if (!selection) {
      this.tddetectiveView.updateView(aMethodName, methodRange, editor)
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