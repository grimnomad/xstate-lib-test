// this works
// const { createTestMachine } = require('./createTestMachine');
// this doesn't
const { createTestMachine } = require('lib');
const { interpret } = require('xstate');

const service = interpret(createTestMachine({ id: 'test' }));

service.onTransition((state) => {
  console.log(state.value);
  console.log(state.context);
})

service.onDone(() => service.stop());

service.start();