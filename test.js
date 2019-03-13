var test = require('tape');
var logic = require('./logic');

const dummyTodos = [
  {
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



test('Make sure Tape is working', function(t) {
  t.equal(1,1,"1 should equal 1");
  t.end();
});

test('Test whether addTodo returns an array', function(t) {
  const actual = Array.isArray(logic.addTodo([]));
  const expected = true;
  t.deepEqual(actual,expected,"addTodo returns an array");
  t.end();
});

test("Don't change the original array" , function(t) {
  const actual = logic.addTodo(dummyTodos, '');
  const expected = [
    {
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
  t.deepEqual(actual,expected,'addTodo should not change original array');
  t.end();
});

test("addTodo adds new item to the array" , function(t) {
  
  const actual = (logic.addTodo(dummyTodos, dummyNewTodo)).length;
  const expected = dummyTodos.length +1;
  t.deepEqual(actual,expected,'addTodo adds a new item');
  t.end();
});


test("check if newtodo has an id" , function(t) {
  const actual = logic.addTodo(dummyTodos, dummyNewTodo);
 
  const expected = [
    {
      id: 0,
      description: 'smash avocados',
      done: true,
    },
    {
      id: 1,
      description: 'make coffee',
      done: false,
    },
    {
      id: 3,
      description: 'make smoothie out of things that should really be cooked',
      done: false,
    }
  ];
  t.deepEqual(actual,expected,'newTodo must have an id, description, done');
  t.end();
});
