module.exports = {
    title: {
        type: 'string'
    },
    desc: {
        type: 'string'
    },
    city: {
        type: 'string'
    },
    state: {
        type: 'string'
    },
    zip: {
        type: 'string'
    },
    contract_id: {
        type: 'uuid',
        required: true
    },
    duration: {
        type: 'string'
    },
    value: {
        type: 'float'
    },
    dbe_utilization: {
        type: 'float'
    },
    closed: {
        type: 'string',
        default: false
    }

};