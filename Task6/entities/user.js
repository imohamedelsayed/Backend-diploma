const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({

    name: "User", // Entity name

    tableName: "users",

    columns: {

        id: {
            type: "int",
            primary: true,
            generated: true,
        },

        name: {
            type: "varchar",
            length: 100,
            unique: true,
        },

        email: {
            type: "varchar",
            length: 100,
            unique: true,
            nullable: true,
        },
    },

    relations: {
        notes: {
            target: "Note",
            type: "one-to-many",
            inverseSide: "user", 
            cascade: true, 
        },
    },
});