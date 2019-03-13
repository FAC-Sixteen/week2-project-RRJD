var test = require('tape');
var logic = require('./logic');

test('Example test', function(t) {
  t.pass();
  t.end();
});

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
  let actual = logic.deleteTodo(['test', 'testing', 'length'], 'testing');
  let expected = ['test', 'testing', 'length'];
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
  let actual = logic.deleteTodo(['test', 'testing', 'deleting'], 'testing');
  let expected = ['test', 'deleting'];
  t.deepEqual(actual, expected, 'when given array and thing to delete, should delete correct item');
  t.end();
})

test('deleteTodo should return error', function(t) {
let actual = logic.deleteTodo(1);
let expected = 'error';
t.equals(actual, expected, 'when given number return error');
t.end();
})

test('deleteTodo should delete all matching', function(t) {
  let a = ['delete', 'something', 'delete', 'many', 'delete', 'all']
  let actual = logic.deleteTodo(a, 'delete');
  let expected = ['something', 'many', 'all'];
  t.deepEqual(actual, expected, 'should delete all instances of word delete');
  t.end();
})

