module.exports = {
    name: {
        type: 'string',
        required: true
    },
    phone: {
        type: 'string',
        required: true
    },
    email: {
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
    disadvantage: {
        type: 'string',
        required: true
    },
    cert_num: {
        type: 'string',
        required: true
    },
    cert_date: {
        type: 'string',
        required: true
    },
    company_id: {
        type: 'uuid'
    },
    capabilities: {
        type: 'string'
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
        target: 'Profile',
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
    },

    belongs_to: {
        type: 'relationship',
        target: 'Profile',
        relationship: 'BELONGS_TO',
        direction: 'out',
        properties: {
            name: 'string'
        }
    },

    classified_as: {
        type: 'relationship',
        target: 'Naics',
        relationship: 'CLASSIFIED_AS',
        direction: 'out',
        properties: {
            dbe: 'string',
            mbe: 'string',
            sbe: 'string',
            acdbe: 'string'
        }
    }


};