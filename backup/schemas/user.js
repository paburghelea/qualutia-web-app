// icon: MdLocalMovies,


export default {
    name: "user",
    title: "User",
    type: "document",
    fields: [
        {
            name: "name",
            title: "Name",
            type: "string"
        },

        {
            name: "position",
            title: "Position",
            type: "string"
        },

        {
            name: "description",
            title: "Description",
            type: "array",
            of: [
                    {
                        type: "object",
                        fields: [
                            {
                                name: "language",
                                title: "Language",
                                type: "string",
                                options: {
                                    list: ["Romanian", "English", "Italian"]
                                }
                            },

                            {
                                name: "text",
                                title: "Text",
                                type: "array",
                                of: [
                                        {
                                            title: "Block",
                                            type: "block",
                                            styles: [{title: "Normal", value: "normal"}],
                                            lists: []
                                        }
                                    ]
                        
                            },
                        ]
                    }
                ]
        },

        {
            name: "skills",
            title: "Skills",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        {
                            name: "name",
                            title: "Name",
                            type: "string",
                        },

                        {
                            name: "type",
                            title: "Type",
                            type: "string",
                            options: {
                                list: ["Design", "Computation", "Data"]
                            }
                        },

                        {
                            name: "icon",
                            title: "Icon",
                            type: "image"
                        },

                        {
                            name: "description",
                            title: "Description",
                            type: "array",
                            of: [
                                    {
                                        title: "Block",
                                        type: "block",
                                        styles: [{title: "Normal", value: "normal"}],
                                        lists: []
                                    }
                                ]
                    
                        },

                        {
                            name: "proficiency",
                            title: "Proficiency",
                            type: "string",
                            options: {
                                list: ["Beginner", "Medium", "Advanced"]
                            }
                        },
                    ]
                }
            ]
        }

    ]
};