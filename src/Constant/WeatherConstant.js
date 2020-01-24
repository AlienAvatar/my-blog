export const APPID = "22283233";
export const APPSECRET = "kCFN1S3L";

export const fetchWeatherData = (url,callback) =>{
    let headers = new Headers({
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'text/plain'
    });

    fetch(url,{
        method: 'GET',
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