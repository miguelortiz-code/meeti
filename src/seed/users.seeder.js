import bcrypt from 'bcrypt';

const users = [
    // Usuarios de Prueba

    {
        name: 'prueba',
        email: 'prueba@gmail.com',
        password: bcrypt.hashSync('Prueba123', 10),
        token: null,
        active: 1
    },

     {
        name: 'prueba',
        email: 'prueba2@gmail.com',
        password: bcrypt.hashSync('Prueba123', 10),
        token: null,
        active: 1
    }
];

export default users