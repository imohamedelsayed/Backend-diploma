const {DataSource} = require("typeorm");
const User = require("./entities/user");
const Note = require("./entities/note");

const AppDataSource = new DataSource({ 
    type: "postgres",  
    port: 5432,
    host: "localhost",
    username: "postgres",
    password: "1234",
    database: "testdb",
    synchronize: true, // until production, set to false in production , it's for auto sync the database with entities
    entities: [User, Note],     
    
});  

module.exports = AppDataSource;