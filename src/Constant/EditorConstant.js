export const FONT_SIZE = [
    {label:'12',style:12},
    {label:'14',style:14},
    {label:'16',style:16},
    {label:'18',style:18},
    {label:'20',style:20},
    {label:'24',style:24},
    {label:'30',style:30},
    {label:'36',style:36},
];

export const COLORS = [
    {label: 'Red', style: 'red'},
    // {label: 'Orange', style: 'orange'},
    {label: 'Yellow', style: 'yellow'},
    // {label: 'Green', style: 'green'},
    {label: 'Blue', style: 'blue'},
    // {label: 'Indigo', style: 'indigo'},
    // {label: 'Violet', style: 'violet'},
];

//自定义行内样式
//1.字体大小
//2.字体颜色
export const styleMap = {
    '8':{
        fontSize : 8
    },
    '10':{
        fontSize : 10
    },
    '12':{
        fontSize : 12
    },
    '14':{
        fontSize : 14
    },
    '16':{
        fontSize: 16
    },
    '18':{
        fontSize: 18
    },
    '20':{
        fontSize: 20
    },
    '24':{
        fontSize: 24
    },
    '30':{
        fontSize: 30
    },
    '36':{
        fontSize: 36
    },
    'red':{
        color: "red"
    },
    'yellow':{
        color : "yellow"
    },
    "blue":{
        color:"blue"
    }

};

export const options = {
    inlineStyles: {
        // Override default element (`strong`).
        BOLD: {element: 'strong'},
        ITALIC: {
            // Add custom attributes. You can also use React-style `className`.
            attributes: {class: 'article-content-text'},
            // Use camel-case. Units (`px`) will be added where necessary.
            style: {fontStyle: "italic"}
        },
        UNDERLINE:{
            style:{textDecoration: "underline"}
        },
        STRIKETHROUGH:{
            style:{textDecoration:"line-through"}
        },
        yellow:{
            style:{color:'yellow'}
        },
        red:{
            style:{color:'red'}
        },
        blue:{
            style:{color:'blue'}
        },
        8:{
            style:{fontSize:8}
        },
        10:{
            style:{fontSize:10}
        },
        12:{
            style:{fontSize:12}
        },
        14:{
            style:{fontSize:14}
        },
        16:{
            style:{fontSize:16}
        },
        18:{
            style:{fontSize:18}
        },
        20:{
            style:{fontSize:20}
        },
        24:{
            style:{fontSize:24}
        },
        30:{
            style:{fontSize:30}
        },
        36:{
            style:{fontSize:36}
        },
    },
    inlineStyleFn: (styles) => {
        // export const FONT_SIZE = [8,10,12,14,16,18,20,24,30,36];
        const isfontSize = styles.get(8) || styles.get(10) || styles.get(12) || styles.get(14)|| styles.get(16)
            || styles.get(18) || styles.get(20) || styles.get(24) || styles.get(30) || styles.get(36);
        if(isfontSize !== undefined){
            return {
                style:{
                    fontSize:isfontSize
                }
            }
        }
    },
    entityStyleFn: (entity) => {
        const entityType = entity.get('type').toLowerCase();
        if (entityType === 'image') {
            const data = entity.getData();
            return {
                element: 'img',
                attributes: {
                    src: data.src,
                },
            };
        }
    },

};
