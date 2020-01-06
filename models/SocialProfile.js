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
    linkedin: {
        type: 'string'
    },
    instagram: {
        type: 'string'
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