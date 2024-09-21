// Imports

// Users Array
const users = [{
    id : 1,
    name : 'Parmod Yadav',
    email : 'parmodyadav@gmail.com',
    password : '88',
},
{
    id : 2,
    name : 'Rao Sahab',
    email : 'raosahab@gmail.com',
    password : 'rao',
}
];
export default class UserModel{
    constructor(name,email,password){
        this.name = name;
        this.email = email;
        this.password = password;
        this.id = users.length+1;
    }

    // Function to get all users
    static getAllUsers()
    {
        return users;
    }

    // Function to add a user
    static signUp(name,email,password)
    {
        const newUser = new UserModel(name,email,password);
        users.push(newUser);
        return newUser;
    }

    // Function to confirm user login
    static signIn(email,password)
    {
        const user = users.find(u=>u.email==email && u.password==password);
        return user;
    }
}