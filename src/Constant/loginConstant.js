import {notification} from "antd";

export const url = 'http://111.229.76.149:8081/api/getUser';

export const local = {
    url : 'http://localhost:8081/api/getAboutMeArticle'
}

export const openLoginNotificationWithIcon = (type,title,msg) => {
    notification[type]({
        message: title,
        description: msg,
    });
};

export const fetchLoginData = (url,callback) =>{
    let headers = new Headers({
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'text/plain'
    });

    fetch(url,{
        method: 'POST',
        headers: headers
    }).then(res => {
        return res.json();
    }).then(json => {
        callback(json);
        return json;
    }).catch(err => {
        console.log('请求错误', err);
    })
};