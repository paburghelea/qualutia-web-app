// import {isUniqueAcrossAllDocuments} from '../lib/isUniqueAcrossAllDocuments'

export default {
    name: "post",
    title: "Post",
    type: "document",
    fields: [
        {
            name: "name",
            title: "Name",
            type: "string",
               
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: "name",
                maxLength: 96,
                // isUnique: isUniqueAcrossAllDocuments
            }
               
        },

        {
            name: "progress",
            title: "In Progress",
            type: "boolean",
               
        },

        {
            name: "star",
            title: "Star Project",
            type: "boolean",
               
        },

        {
            name: "type",
            title: "Type",
            type: "string",
            options: {
                list: ["architecture", "web"]
            }

        },

        

        // {
        //     name: "cover",
        //     title: "Cover",
        //     type: "image",
        //     options: {
        //         hotspot: true,
        //     },
        // },

        {
            name: "dates",
            title: "Dates",
            type: "document",
            fields: [
                {
                    name: "start",
                    title: "Start",
                    type: "date",
                    
                },

                {
                    name: "end",
                    title: "End",
                    type: "date",
                    
                },
            ]
        },

        {
            name: "gallery",
            title: "Gallery",
            type: "array",
            of: 
            [

                {
                    type: "object",
                    fields: [
                        {
                            name: "image",
                            title: "Image",
                            type: "image",
                            options: {
                                hotspot: true
                            }
                        },

                        {
                            name: "title",
                            title: "Title",
                            type: "string",
                        },

                        {
                            name: "group",
                            title: "Group",
                            type: "string",
                        },

                            
                        {
                            name: "width",
                            title: "Width",
                            type: "number",
                            options: {
                                list: [{value: 1, title: 'One'}, {value: 2, title: 'Two'}, {value: 3, title: 'Three'}, {value: 4, title: 'Four'}]
                            }
                            
                        },
        
                        {
                            name: "height",
                            title: "Height",
                            type: "number",
                            options: {
                                list: [{value: 1, title: 'One'}, {value: 2, title: 'Two'}, {value: 3, title: 'Three'}, {value: 4, title: 'Four'}]
                            }
                            
                        }
                                
                    
                    ]
                }

            ]
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
    ]
};