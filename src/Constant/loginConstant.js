import {notification} from "antd";

export const local = {
    url : 'http://localhost:8081/api'
    // url:"http://111.229.76.149:8081/api"
};


export const thatgirl = "There's a girl but I let her get away";

export const openLoginNotificationWithIcon = (type,title,msg) => {
    notification[type]({
        message: title,
        description: msg,
    });
};

