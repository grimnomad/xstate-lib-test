const { createMachine, assign, spawn } = require('xstate');

function processMessage(context) {
    return (send) => {
        if(context.user.id !== '1234') {

            send('SUCCESS')
        } else {
            send('FAILED')
        }
    }
}

function createTestMachine(user) {
    const machine = createMachine({
        id: 'test',
        initial: 'processing',
        context: {
            processRef: null,
            user
        },
        states: {
            processing: {
                entry: 'onEntry',
                on: {
                    SUCCESS: {
                        target: 'success'
                    },
                    FAILED: {
                        target: 'failed'
                    }
                }
            },
            success: {
                type: 'final'
            },
            failed: {
                type: 'final'
            }
        }
    }, {
        actions: {
            onEntry: assign({
                processRef: (context) => spawn(processMessage(context))
            })
        }
    })

    return machine;
}

module.exports = {
    createTestMachine
}
