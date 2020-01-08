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
    // experience: [
    //     {
    //         title: {
    //             type: 'string',
    //             required: true
    //         },
    //         company: {
    //             type: 'string',
    //             required: true
    //         },
    //         location: {
    //             type: 'string'
    //         },
    //         from: {
    //             type: 'date',
    //             default: () => new Date()
    //         },
    //         to: {
    //             type: 'date',
    //             default: () => new Date()
    //         },
    //         current: {
    //             type: 'boolean',
    //             default: false
    //         },
    //         description: {
    //             type: 'string'
    //         }
    //     }
    // ],
    // education: [
    //     {
    //         fieldOfStudy: {
    //             type: 'string',
    //             required: true
    //         },
    //         company: {
    //             type: 'string',
    //             required: true
    //         },
    //         location: {
    //             type: 'string'
    //         },
    //         from: {
    //             type: 'date',
    //             default: () => new Date()
    //         },
    //         to: {
    //             type: 'date',
    //             default: () => new Date()
    //         },
    //         current: {
    //             type: 'boolean',
    //             default: false
    //         },
    //         description: {
    //             type: 'string'
    //         }
    //     }
    // ],

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