module.exports = {
    company: {
        type: 'string'
    },
    website: {
        type: 'string'
    },
    location: {
        type: 'string'
    },
    status: {
        type: 'string',
        required: true
    },
    skills: {
        type: 'string',
        required: true
    },
    bio: {
        type: 'string',
    },
    githubusername: {
        type: 'string',
        primary: true
    },
    date: {
        type: 'date',
        default: () => new Date()
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

};