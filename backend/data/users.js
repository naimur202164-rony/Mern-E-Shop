import bcrypt from 'bcryptjs'
const users  = [
    {
        name: 'Admin user',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: 'Aneta Przetakiewicz',
        email: 'anetaprzetakiewicz@example.com',
        password: bcrypt.hashSync('123456', 10),

    },
    {
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: bcrypt.hashSync('123456', 10),

    },
    {
        name: 'Jane Doe',
        email: 'janedoe@example.com',
        password: bcrypt.hashSync('123456', 10),

    },
]

export default users