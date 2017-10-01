describe("asyncForEach", function() {

  beforeEach(function() { console.log('Before tests'); });
  afterEach(function() { console.log('After tests'); });

  const resolve = () => console.log('Done');

  
  it("принимает не пустой массив и коллбэк, перебирает элементы по одному", function() {
    let arr = [1,2,3,4];
    let testValue = ['Item 1 at 0','Item 2 at 1','Item 3 at 2','Item 4 at 3'];

    let resultArr = [];

    const fakeCallback = (item, index, next) => {
      let str = `Item ${item} at ${index}`;
      resultArr.push(str);
      setTimeout(next, 10);
    };

    let result = asyncForEach(arr, fakeCallback);

    return result.then(() => {
          for (let i = arr.length;i--;) {
            assert.equal(resultArr[i],testValue[i]);
          }
        })
        .then(resolve);
  });

  it("принимает пустой массив, коллбэк не отрабатывает", function() {
    let arr = [];

    let resultArr = [];

    const fakeCallback = (item, index, next) => {
      resultArr.push(`Item ${item} at ${index}`);
      setTimeout(next, 10);
    };

    let result = asyncForEach(arr, fakeCallback);

    return result.then(() => {
          for (let i = arr.length;i--;) {
            assert.equal(resultArr.length, 0);
          }
        })
        .then(resolve);
  });

  it("Принимает объект, коллбэк не отрабатывает", function() {
    let obj = {a: 1, b: 2};

    let resultArr = [];

    const fakeCallback = (item, index, next) => {
      resultArr.push(`Item ${item} at ${index}`);
      setTimeout(next, 10);
    };

    let result = asyncForEach(obj, fakeCallback);

    return result.then(() => assert.equal(resultArr.length, 0))
          .then(resolve);
  });

  it("Принимает число, коллбэк не отрабатывает", function() {
    let num = 1;
    let resultArr = [];

    const fakeCallback = (item, index, next) => {
      resultArr.push(`Item ${item} at ${index}`);
      setTimeout(next, 10);
    };

    let result = asyncForEach(num, fakeCallback);

    return result.then(() => assert.equal(resultArr.length, 0))
          .then(resolve);
  });

});