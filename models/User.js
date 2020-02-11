module.exports = {
    "email": {
        type: 'string',
        required: true,
        unique: true,
        primary: true
    },
    "name": {
        type: 'string',
        required: true
    },
    password: {
        type: 'string',
        required: true
    },
    avatar: {
        type: 'string'
    },
    role: {
        type: 'string'
    },
    userID: {
        type: 'uuid'
    },
    date: {
        type: 'date',
        default: () => new Date()
    }
};