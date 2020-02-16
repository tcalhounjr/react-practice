module.exports = {
    name: {
        type: 'string'
    },
    phone: {
        type: 'string'
    },
    website: {
        type: 'string'
    },
    naics: {
        type: 'string'
    },
    dbe: {
        type: 'string'
    },
    certs: {
        type: 'string'
    },
    company_id: {
        type: 'uuid',
        required: true
    },
    capacity: {
        type: 'float'
    },

    street_one: {
        type: 'string',
        required: true
    },
    street_two: {
        type: 'string'
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

    owned_by: {
        type: 'relationship',
        target: 'User',
        relationship: 'OWNED_BY',
        direction: 'out',
        properties: {
            name: 'string'
        }
    },
    located_in: {
        type: 'relationship',
        target: 'Metro',
        relationship: 'LOCATED_IN',
        direction: 'out',
        properties: {
            name: 'string'
        }
    },
    recommended_by: {
        type: 'relationship',
        target: 'Officer',
        relationship: 'RECOMMENDED_BY',
        direction: 'out',
        properties: {
            name: 'string'
        }
    },
    recommended_to: {
        type: 'relationship',
        target: 'Subcntractor',
        relationship: 'RECOMMENDED_TO',
        direction: 'out',
        properties: {
            name: 'string',
            hired: false
        }
    },
    performed_on: {
        type: 'relationship',
        target: 'Contract',
        relationship: 'PERFORMED_ON',
        direction: 'out',
        properties: {
            name: 'string',
            from: 'string',
            to: 'string',
            role: 'string'
        }
    }


};