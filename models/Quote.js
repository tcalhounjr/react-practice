module.exports = {
    title: {
        type: 'string'
    },
    supply_types: {
        type: 'string'
    },
    sub_types: {
        type: 'string'
    },
    date: {
        type: 'date',
        default: () => new Date()
    },
    bid_id: {
        type: 'uuid',
        required: true
    }


};