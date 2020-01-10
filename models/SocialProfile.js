module.exports = {
    youtube: {
        type: 'string'
    },
    twitter: {
        type: 'string'
    },
    facebook: {
        type: 'string'
    },
    linkedIn: {
        type: 'string'
    },
    instagram: {
        type: 'string'
    },
    userEmail: {
        type: 'string',
        primary: true
    },

    //Relationships
    belongs_to: {
        type: 'relationship',
        target: 'User',
        relationship: 'BELONGS_TO',
        direction: 'out',
        properties: {
            name: 'string'
        }
    }
}