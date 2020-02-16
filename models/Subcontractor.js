module.exports = {
    name: {
        type: 'string',
        required: true
    },
    phone: {
        type: 'string',
        required: true
    },
    website: {
        type: 'string',
        required: true
    },
    poc: {
        type: 'string',
        required: true
    },
    naics: {
        type: 'string',
        required: true
    },
    designation: {
        type: 'string',
        required: true
    },
    certs: {
        type: 'string'
    },
    company_id: {
        type: 'uuid'
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
        target: 'GeneralContractor',
        relationship: 'RECOMMENDED_TO',
        direction: 'out',
        properties: {
            name: 'string'
        }
    },
    performed_on: {
        type: 'relationship',
        target: 'Project',
        relationship: 'PERFORMED_ON',
        direction: 'out',
        properties: {
            date: 'string'
        }
    },
    hired_by: {
        type: 'relationship',
        target: 'GeneralContractor',
        relationship: 'HIRED_BY',
        direction: 'out',
        properties: {
            name: 'string',
            date: 'string'
        }
    },

    submitted: {
        type: 'relationship',
        target: 'Quote',
        relationship: 'SUBMITTED',
        direction: 'out',
        properties: {
            amount: 'string',
        }
    }


};