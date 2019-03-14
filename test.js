var test = require('tape');
var logic = require('./logic');

const dummyTodos = [{
    id: 0,
    description: 'smash avocados',
    done: true,
  },
  {
    id: 1,
    description: 'make coffee',
    done: false,
  },
];
const dummyNewTodo = {
  description: 'make smoothie out of things that should really be cooked'
};



test('Make sure Tape is working', function (t) {
  t.equal(1, 1, "1 should equal 1");
  t.end();
});

test('Test whether addTodo returns an array', function (t) {
  const actual = Array.isArray(logic.addTodo(dummyTodos, dummyNewTodo));
  const expected = true;
  t.deepEqual(actual, expected, "addTodo returns an array");
  t.end();
});

test("Don't change the original array", function (t) {
  const copyDummyTodos = dummyTodos.map(x => x);
  logic.addTodo(dummyTodos, dummyNewTodo);
  const actual = dummyTodos;
  const expected = copyDummyTodos;
  t.deepEqual(actual, expected, 'addTodo should not change original array');
  t.end();
});

test("addTodo adds new item to the array", function (t) {
  const actual = (logic.addTodo(dummyTodos, dummyNewTodo)).length;
  const expected = dummyTodos.length + 1;
  t.deepEqual(actual, expected, 'addTodo adds a new item');
  t.end();
});


test("check if addTodo function adds 'id' and 'done' to newTodo", function (t) {
  let a = logic.addTodo(dummyTodos, dummyNewTodo);
  const actual = Object.keys(a[a.length - 1]);
  const expected = ['id', 'description', 'done'];
  t.deepEqual(actual, expected, 'newTodo must have an id, description, done');
  t.end();
});

test('deleteTodo returns an array', function (t) {
  let actual = Array.isArray(logic.deleteTodo(['test', 'testing']));
  t.equals(actual, true, 'deleteTodo should return an array');
  t.end();
});

test('deleteTodo should not edit array todo', function (t) {
  let actual = ['edit', 'editing'];
  let expected = ['edit', 'editing'];
  logic.deleteTodo(actual);
  t.deepEqual(actual, expected, 'deleteTodo edit array');
  t.end();
});

test('deleteTodo removes an item', function (t) {
  let actual = logic.deleteTodo([{
    'id': 'test'
  }, {
    'id': 'testing'
  }, {
    'id': 'length'
  }], 'testing');
  let expected = [{
    'id': 'test'
  }, {
    'id': 'testing'
  }, {
    'id': 'length'
  }];
  t.notEqual(actual.length, expected.length, 'should remove at least one element from actual');
  t.end();
});

test('deleteTodo returns an error message', function (t) {
  let actual = logic.deleteTodo('string');
  let expected = 'error'
  t.equals(actual, expected, 'should return error when given string');
  t.end();
});

test('deleteTodo should be able to return without anything being deleted', function (t) {
  let actual = logic.deleteTodo(['any', 'anything'], "doesn't match");
  let expected = ['any', 'anything'];
  t.deepEqual(actual, expected, 'should return out anything being changed');
  t.end();

})

test('deleteTodo should delete correct item from array', function (t) {
  let actual = logic.deleteTodo([{
    'id': 'test'
  }, {
    'id': 'testing'
  }, {
    'id': 'deleting'
  }], 'testing');
  let expected = [{
    'id': 'test'
  }, {
    'id': 'deleting'
  }];
  t.deepEqual(actual, expected, 'when given array and thing to delete, should delete correct item');
  t.end();
})

test('deleteTodo should return error', function (t) {
  let actual = logic.deleteTodo(1);
  let expected = 'error';
  t.equals(actual, expected, 'when given number return error');
  t.end();
})

test('deleteTodo accesses object id inside array and deletes correct item', function (t) {
  let a = [{
    'id': 'test'
  }, {
    'id': 'testing'
  }];
  let actual = logic.deleteTodo(a, 'test');
  let expected = [{
    'id': 'testing'
  }];
  t.deepEqual(actual, expected, 'should delete correct object when given id');
  t.end();
})