const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({

    name: "Note", // Entity name

    tableName: "notes", 

    columns: {

        id: {
            type: "int",
            primary: true,
            generated: true,
        },

        title: {
            type: "varchar",
            length: 100,
        },

        content: {
            type: "text",
        },
    },

    relations: {

        user: {
            target: "User",
            type: "many-to-one",
            inverseSide: "notes",
            joinColumn: true, 
        },
    },
});