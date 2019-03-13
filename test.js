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
  let actual = ['test', 'testing'];
  let expected = logic.deleteTodo(actual, 'testing');
  t.notEqual(actual.length, expected.length, 'should remove at least one element from actual');
  t.end();
});

test('deleteTodo returns an error message', function(t) {
  let actual = logic.deleteTodo([]);
  let expected = 'error: cannot handle empty array';
  t.equals(actual, expected, 'should return error when given empty array');
  t.end();
})
