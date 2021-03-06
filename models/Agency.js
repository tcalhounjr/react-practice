module.exports = {
    name: {
        type: 'string',
        required: true
    },
    street_one: {
        type: 'string',
        required: true
    },
    street_two: {
        type: 'string',
    },
    city: {
        type: 'string',
        required: true
    },
    state: {
        type: 'string',
        required: true
    },
    zip: {
        type: 'string',
        required: true
    },
    funding: {
        type: 'number'
    },
    agency_id: {
        type: 'uuid',
        required: true
    },

    //RELATIONSHIPS
    located_in: {
        type: 'relationship',
        target: 'Metro',
        relationship: 'LOCATED_IN',
        direction: 'out',
        properties: {
            name: 'string'
        }
    }

};