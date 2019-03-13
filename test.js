var test = require('tape');
var logic = require('./logic');

test('Example test', function(t) {
  t.pass();
  t.end();
});


// <------------- DELETETODO ----------------->

test('deleteTodo returns an array', function(t) {
  let actual = Array.isArray(logic.deleteTodo(['test', 'testing']));
  t.equals(actual, true, 'deleteTodo should return an array');
  t.end();
});

test('deleteTodo should not edit array todo', function(t) {
  let actual = ['edit', 'editing'];
  let expected = ['edit', 'editing'];
  logic.deleteTodo(actual);
  t.deepEqual(actual, expected, 'deleteTodo edit array');
  t.end();
});

test('deleteTodo removes an item', function(t) {
  let actual = logic.deleteTodo([{'id':'test'}, {'id':'testing'}, {'id':'length'}], 'testing');
  let expected = [{'id':'test'}, {'id':'testing'}, {'id':'length'}];
  t.notEqual(actual.length, expected.length, 'should remove at least one element from actual');
  t.end();
});

test('deleteTodo returns an error message', function(t) {
  let actual = logic.deleteTodo('string');
  let expected = 'error'
  t.equals(actual, expected, 'should return error when given string');
  t.end();
});

test('deleteTodo should be able to return without anything being deleted', function(t) {
  let actual = logic.deleteTodo(['any', 'anything'], "doesn't match");
  let expected = ['any', 'anything'];
  t.deepEqual( actual, expected, 'should return out anything being changed');
  t.end();

})

test('deleteTodo should delete correct item from array', function(t) {
  let actual = logic.deleteTodo([{'id':'test'}, {'id':'testing'}, {'id':'deleting'}], 'testing');
  let expected = [{'id':'test'}, {'id':'deleting'}];
  t.deepEqual(actual, expected, 'when given array and thing to delete, should delete correct item');
  t.end();
})

test('deleteTodo should return error', function(t) {
let actual = logic.deleteTodo(1);
let expected = 'error';
t.equals(actual, expected, 'when given number return error');
t.end();
})

test('deleteTodo accesses object id inside array and deletes correct item', function(t) {
  let a = [{'id': 'test'}, {'id': 'testing'}];
  let actual = logic.deleteTodo(a, 'test');
  let expected = [{'id': 'testing'}];
  t.deepEqual(actual, expected, 'should delete correct object when given id');
  t.end();
})


// <-----------------MARKTODO----------------->

let  testArray = [{'id': 'test', 'done': false}, {'id': 'testing', 'done': false}, {'id': 'testoo', 'done': true}];

test('markTodo does not change argument todo', function(t) {
  logic.markTodo(testArray, 'test')
  let actual = [...testArray];
  let expected = [{'id': 'test', 'done': false}, {'id': 'testing', 'done': false}, {'id': 'testoo', 'done': true}];
  t.deepEqual(actual, expected, 'testArray should not be changed by markTodo');
  t.end();
});

// test('markTodo does  ')
