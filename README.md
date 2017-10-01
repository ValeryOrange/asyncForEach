# Асинхронный forEach

## Пример реализации
```js
console.log('Before');
asyncForEach([1, 2, 3], function(item, index, next) {
  console.log('Item %s at %s', item, index);
  setTimeout(next, 10);
}).then(function() {
  console.log('Done');
});
console.log('After');
```

В консоль выводится:

```
> Before
> After
> Processing item 1 at 0
> Processing item 2 at 1
> Processing item 3 at 2
> Done
```

## Тесты

Тесты написаны по методике BDD c использованием chai и mocha.