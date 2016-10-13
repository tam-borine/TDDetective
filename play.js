it("calls doSomething", function() {
  var originalConstructor = MyCoolObject,
      spiedObj;
  spyOn(window, 'MyCoolObject').and.callFake(function() {
    spiedObj = new originalConstructor();
    spyOn(spiedObj, 'doSomething');
    return spiedObj;
  });
  MyFunction();
  expect(spiedObj.doSomething).toHaveBeenCalled();
});

function MyFunction() {
    var foo = new MyCoolObject();
    foo.doSomething();
};
