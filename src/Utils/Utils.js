//判断是移动端还是 pc 端 ，true 表示是移动端，false 表示是 pc 端
export function isMobileOrPc() {
    if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
        return true;
    } else {
        return false;
    }
}

export function openSendArticle(){
    const hostname = window.location.hostname;
    const port = window.location.port;
    window.location.href = `http://${hostname}:${port}/sendArticle`;
}

export function openMain(){
    const hostname = window.location.hostname;
    const port = window.location.port;
    window.location.href = `http://${hostname}:${port}/`;
}

export function openGithub() {
    window.open("https://github.com/AlienAvatar","github");
}

export function openAboutMe() {
    const hostname = window.location.hostname;
    const port = window.location.port;
    window.location.href = `http://${hostname}:${port}/aboutme`;
}

export function openFriendLink() {
    const hostname = window.location.hostname;
    const port = window.location.port;
    window.location.href = `http://${hostname}:${port}/friendLink`;
}

export function openSetting() {
    const hostname = window.location.hostname;
    const port = window.location.port;
    window.location.href = `http://${hostname}:${port}/setting`;
}

export function openSupport() {
    const hostname = window.location.hostname;
    const port = window.location.port;
    window.location.href = `http://${hostname}:${port}/support`;
}

export const scaleScreen = ()=>{
    var phoneWidth = parseInt(window.screen.width);
    var phoneHeight = parseInt(window.screen.height);
    var phoneScale = phoneWidth/750;//除以的值按手机的物理分辨率
    var ua = navigator.userAgent;
    if (/Android (\d+\.\d+)/.test(ua)) {
        var version = parseFloat(RegExp.$1);
        // andriod 2.3
        if (version > 2.3) {
            document.write('<meta name="viewport" content="width=device-width,initial-scale='+phoneScale+',minimum-scale='+phoneScale+',maximum-scale='+phoneScale+',user-scalable=no">');
            // andriod 2.3以上
        } else {
            document.write('<meta name="viewport" content="width=device-width,user-scalable=no">');
        }
        // 其他系统
    } else {
        document.write('<meta name="viewport" content="width=device-width, initial-scale='+phoneScale+',minimum-scale='+phoneScale+',maximum-scale ='+phoneScale +',user-scalable=no,">');
    }
};
