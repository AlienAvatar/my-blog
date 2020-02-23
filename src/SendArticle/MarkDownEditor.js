import React from 'react'
import ReactDOM from 'react-dom'
import MdEditor from 'react-markdown-editor-lite'
import Editor from 'for-editor'
import {message} from "antd";
import {addArticleUrl, CONTENT, DESC, TITLE, TYPE, USERNAME} from "../Constant/ComConstant";
import marked from 'marked'

marked.setOptions({ // marked 设置
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: true,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false
});
const toolbar = {
        h1: true, // h1
        h2: true, // h2
        h3: true, // h3
        h4: true, // h4
        img: false, // 图片
        link: true, // 链接
        code: true, // 代码块
        preview: true, // 预览
        expand: true, // 全屏
        /* v0.0.9 */
        undo: true, // 撤销
        redo: true, // 重做
        save: true, // 保存
        /* v0.2.3 */
        subfield: true, // 单双栏模式
};


class MarkDownEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
        };
        this.$vm = React.createRef()
    }

    handleChange(value) {
        this.setState({
            value
        })
    }

    addImg($file) {
        this.$vm.current.$img2Url($file.name, 'file_url');
        console.log($file)
    }

    addArticle = (content) =>{
        if(content === null) {
            return;
        }
        const {data,checkSendArticle} = this.props;
        const title = data.title;
        const desc = data.desc;
        const loginMsg = data.loginMsg;
        const type = data.selectValue;
        if(content === "" || title === "" || title === null || title === undefined){
            message.warning('文章和标题不能为空');
            return;
        }else if(desc === "" || desc === null || desc === undefined){
            message.warning('描述不能为空');
            return;
        }else if(desc.length > 140){
            message.warning('描述不能超过140个字');
            return;
        }
        content = marked(content);
        // content = JSON.stringify(content);
        let queryUrl = `${addArticleUrl}?${TITLE}${title}&${DESC}${desc}&${TYPE}${type}&${USERNAME}${loginMsg.username}&${CONTENT}${content}`;
        console.log(queryUrl);
        fetch(queryUrl,{
            method: 'POST',
            mode:'cors'
        }).then(res => {
            return res.json();
        }).then(json => {
            checkSendArticle(json);
            return json;
        }).catch(err => {
            console.log('请求错误', err);
        })
    };

    render() {
        const { value } = this.state;

        return (
            <Editor
                ref={this.$vm}
                value={value}
                addImg={($file) => this.addImg($file)}
                onChange={value => this.handleChange(value)}
                onSave={(value) => this.addArticle(value)}
                toolbar={toolbar}
            />
        )
    }
}
export default MarkDownEditor;