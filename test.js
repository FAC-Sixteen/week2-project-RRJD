const test = require('tape');
const logic = require('./logic');

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
  const a = logic.addTodo(dummyTodos, dummyNewTodo);
  const actual = Object.keys(a[a.length - 1]);
  const expected = ['id', 'description', 'done'];
  t.deepEqual(actual, expected, 'newTodo must have an id, description, done');
  t.end();
});

test('deleteTodo returns an array', function (t) {
  const actual = Array.isArray(logic.deleteTodo(['test', 'testing']));
  t.equals(actual, true, 'deleteTodo should return an array');
  t.end();
});

test('deleteTodo should not edit array todo', function (t) {
  const actual = ['edit', 'editing'];
  const expected = ['edit', 'editing'];
  logic.deleteTodo(actual);
  t.deepEqual(actual, expected, 'deleteTodo edit array');
  t.end();
});

test('deleteTodo removes an item', function (t) {
  const actual = logic.deleteTodo([{
    'id': 'test'
  }, {
    'id': 'testing'
  }, {
    'id': 'length'
  }], 'testing');
  const expected = [{
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
  const actual = logic.deleteTodo('string');
  const expected = 'error'
  t.equals(actual, expected, 'should return error when given string');
  t.end();
});

test('deleteTodo should be able to return without anything being deleted', function (t) {
  const actual = logic.deleteTodo(['any', 'anything'], "doesn't match");
  const expected = ['any', 'anything'];
  t.deepEqual(actual, expected, 'should return out anything being changed');
  t.end();

})

test('deleteTodo should delete correct item from array', function (t) {
  const actual = logic.deleteTodo([{
    'id': 'test'
  }, {
    'id': 'testing'
  }, {
    'id': 'deleting'
  }], 'testing');
  const expected = [{
    'id': 'test'
  }, {
    'id': 'deleting'
  }];
  t.deepEqual(actual, expected, 'when given array and thing to delete, should delete correct item');
  t.end();
})

test('deleteTodo should return error', function (t) {
  const actual = logic.deleteTodo(1);
  const expected = 'error';
  t.equals(actual, expected, 'when given number return error');
  t.end();
})

test('deleteTodo accesses object id inside array and deletes correct item', function (t) {
  const a = [{
    'id': 'test'
  }, {
    'id': 'testing'
  }];
  const actual = logic.deleteTodo(a, 'test');
  const expected = [{
    'id': 'testing'
  }];
  t.deepEqual(actual, expected, 'should delete correct object when given id');
  t.end();
})


// <-----------------MARKTODO----------------->

const testArray = [{
    'id': 'test',
    'done': false
  },
  {
    'id': 'testing',
    'done': false
  },
  {
    'id': 'testoo',
    'done': true
  }
];

test('markTodo does not change argument todo', function (t) {
  logic.markTodo(testArray, 'test')
  const actual = [...testArray];
  const expected = [{
    'id': 'test',
    'done': false
  }, {
    'id': 'testing',
    'done': false
  }, {
    'id': 'testoo',
    'done': true
  }];
  t.deepEqual(actual, expected, 'testArray should not be changed by markTodo');
  t.end();
});

test('markTodo returns an array', function (t) {
  const actual = Array.isArray(logic.markTodo(testArray));
  t.equals(actual, true, 'markTodo should return an array');
  t.end();
})

test('markTodo returns an array of objects', function (t) {
  const a = logic.markTodo(testArray);
  const actual = typeof a[0] === 'object';
  const expected = true;
  t.equals(actual, expected, 'markTodo should return an array of objects');
  t.end();
})

test('markTodo should edit the array of objects', function (t) {
  const actual = logic.markTodo(testArray, 'testing');
  const expected = [...testArray];
  t.notDeepEqual(actual, expected, 'markTodo should edit the array of objects');
  t.end();
})

test('markTodo should return an object with same ids', function (t) {
  const a = logic.markTodo(testArray);
  const actual = [a[0].id, a[1].id, a[2].id];
  const expected = ['test', 'testing', 'testoo'];
  t.deepEqual(actual, expected, 'markTodo should return an object with same ids');
  t.end();
})

test('markTodo should change the done status of the given id to true', function (t) {
  const actual = logic.markTodo(testArray, 'testing');
  const expected = [{
      'id': 'test',
      'done': false
    },
    {
      'id': 'testing',
      'done': true
    },
    {
      'id': 'testoo',
      'done': true
    }
  ];
  t.deepEqual(actual, expected, 'should change the value of done on id testing to true');
  t.end();
})

test('markTodo should change the done status of the given id to false', function (t) {
  const actual = logic.markTodo(testArray, 'testoo');
  const expected = [{
      'id': 'test',
      'done': false
    },
    {
      'id': 'testing',
      'done': false
    },
    {
      'id': 'testoo',
      'done': false
    }
  ];
  t.deepEqual(actual, expected, 'should change the done status of the given id to false');
  t.end();
})

test('markTodo should return error', function (t) {
  const actual = logic.markTodo('give me an error');
  const expected = 'error';
  t.equals(actual, expected, 'when given non array return error');
  t.end();
})