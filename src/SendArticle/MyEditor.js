import React, {Fragment} from 'react';
import {
  EditorState, RichUtils, AtomicBlockUtils, Modifier,ContentState,convertFromHTML,CompositeDecorator
} from 'draft-js';
import Editor from "draft-js-plugins-editor";
import styled from 'styled-components';
//使用块级的默认样式需要引入Draft.css
import 'draft-js/dist/Draft.css';
import {FONT_SIZE,COLORS,styleMap,options} from "../Constant/EditorConstant"
import {Select, Layout, Icon, Button, Popover, Input, message, Typography,Row, Col,Modal} from 'antd';
import {stateToHTML} from 'draft-js-export-html';
import {local} from "../Constant/loginConstant";
import {getQueryVariable} from "../Utils/Utils";
import {addArticleUrl,CONTENT,TITLE,TYPE,USERNAME,PKID,DESC} from "../Constant/ComConstant";
import Divider from "antd/lib/divider";

const { Option } = Select;
const {Text} = Typography;

const ImgComponent = (props) => {
    return (
        <img
            style={{height: '300px', width: 'auto'}}
            src={props.blockProps.src}
            alt="图片"/>
            )
};

const selectBefore = (
    <Select defaultValue="Http://" style={{ width: 90 }}>
        <Option value="Http://">Http://</Option>
        <Option value="Https://">Https://</Option>
    </Select>
);


const Container = styled.div`
  margin: 20px auto;
  padding: 15px;
  border: 1px solid #ccc;
  text-align: left;
  max-width: 800px;
  width: 90%;
  position: relative;
  background:#fff;
`;

const EditorBox = styled.div`
  min-height: 600px;
`;

class MyEditor extends React.Component {
    constructor(props) {
        super(props);

        //创建装饰器 CompositeDecorator自定义装饰器模式
        const compositeDecorator  = new CompositeDecorator([
            {
                strategy: findLinkEntities,
                component: LinkComponent
            }
        ]);

        //初始化editorState状态，把装饰器添加进去
        this.state = {
            editorState: EditorState.createEmpty(compositeDecorator),
            contentValue:null,
            loginMsg: null,
            checkIsExtArt:false,
            visibleLink:false,
            url:"",
        };

        this.convertToHtml = this.convertToHtml.bind(this);
        this.addArticle = this.addArticle.bind(this);
        this.getData = this.getData.bind(this);
        this.updateArticle = this.updateArticle.bind(this);
    }

    componentDidMount() {
        this.focus();
        let userInfo = window.sessionStorage.userInfo;
        if(userInfo !== null && userInfo !== undefined && userInfo !== "null") {
          this.setState({
               loginMsg: JSON.parse(userInfo),
          });
        }
        this.getData();
    }

    setDomEditorRef = ref => this.domEditor = ref;

    focus = () => {
        setTimeout(() => this.domEditor.focus(), 0);
    };

    getData(){
        const pkid = getQueryVariable("id");
        if(pkid === false || pkid === undefined){
            return;
        }
        const url = `${local.url}/queryArticleDetail?${PKID}${pkid}`;
        fetch(url,{
            method: 'GET',
            mode: 'cors',
        }).then(res => {
            return res.json();
        }).then((result) => {
          //获取到content result.data[0]，更新editior的状态
            const blocksFromHTML = convertFromHTML(JSON.parse(result.data[0].content));
            const state = ContentState.createFromBlockArray(
                blocksFromHTML.contentBlocks,
                blocksFromHTML.entityMap,
            );
            this.setState( {
                editorState: EditorState.createWithContent(state),
                checkIsExtArt:true,
            });
            this.props.updateTitleAndDescription(result.data[0].title,result.data[0].description,result.data[0].type);

        }).catch(err => {
          console.log('请求错误', err);
        })
    }

    addArticle(html){
        let contentValue = html;
        if(contentValue === null) {
            return;
        }
        const {data} = this.props;
        const title = data.title;
        const desc = data.desc;

        if(contentValue === "" || title === "" || title === null){
            message.warning('文章和标题不能为空');
            return;
        }else if(desc === "" || desc === null){
            message.warning('描述不能为空');
            return;
        }else if(desc.length > 140){
            message.warning('描述不能超过140个字');
            return;
        }
        const {loginMsg} = this.state;
        const {selectValue,checkSendArticle} = this.props;
        contentValue = contentValue.replace(/&nbsp;/ig, " ").toString();
        contentValue = JSON.stringify(contentValue);
        let queryUrl = `${addArticleUrl}?${CONTENT}${contentValue}&${TITLE}${title}&${DESC}${desc}&${TYPE}${selectValue}&${USERNAME}${loginMsg.username}`;
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
    }

    convertToHtml(){
        const {editorState,checkIsExtArt} = this.state;
        let html = stateToHTML(editorState.getCurrentContent(),options);

        this.setState({
           htmlEditor:html
        });
        if(checkIsExtArt){
            this.updateArticle(html);
        }else{
            this.addArticle(html);
        }
    }



    updateArticle(html){
        const pkid = getQueryVariable("id");
        if(pkid === false || pkid === undefined){
            return;
        }
        let contentValue = html;
        if(contentValue === null) {
            return;
        }
        const {title,desc} = this.props;
        if(contentValue === "" || title === ""){
            message.warning('文章和标题不能为空');
            return;
        }else if(desc === ""){
            message.warning('描述不能为空');
            return;
        }else if(desc.length > 140){
            message.warning('描述不能超过140个字');
            return;
        }
        const {loginMsg} = this.state;
        const {selectValue} = this.props;
        contentValue = contentValue.replace(/&nbsp;/ig, " ").toString();
        contentValue = JSON.stringify(contentValue);
        const url = `${local.url}/updateArticleByPkid?${PKID}${pkid}&${CONTENT}${contentValue}&${TITLE}${title}&${DESC}${desc}&${TYPE}${selectValue}&${USERNAME}${loginMsg.username}`;
        fetch(url,{
            method: 'POST',
            mode:'cors'
        }).then(res => {
            return res.json();
        }).then(json => {
            if(json.code === 200) {
                //this.props.updateTitleAndDescription(title,desc,selectValue);
                message.success('更改成功');
                const hostname = window.location.hostname;
                const port = window.location.port;
                window.location.href = `http://${hostname}:${port}`;
            }else{
                message.error('更改失败');
            }
            return json;
        }).catch(err => {
            console.log('请求错误', err);
        })
    }

    toggleInlineStyle = (inlineStyle) => {
        this.onChange(
            RichUtils.toggleInlineStyle(
                this.state.editorState,
                inlineStyle
            )
        );
    };

    onChange = (editorState) => {
        this.setState({ editorState });
    };

    toggleBlockType = (blockType) => {
        this.onChange(
            RichUtils.toggleBlockType(
                this.state.editorState,
                blockType
            )
        );
    };

    /**
     * 添加链接
     */
    addLink = () => {
        const {editorState,url} = this.state;
        //返回编辑器的当前光标/选择状态。可以获取选择了几个字符
        const selection = editorState.getSelection();
        // 获取contentState 返回编辑器的当前内容。
        const content = editorState.getCurrentContent();
        // 在contentState上新建entity
        const contentWithEntity = content.createEntity('LINK', 'SEGMENTED', {url});
        // 获取到刚才新建的entity
        const entityKey = contentWithEntity.getLastCreatedEntityKey();
        // 把带有entity的contentState设置到新的editorState上
        const newEditorState = EditorState.set(editorState, { currentContent: contentWithEntity });

        // this.setState({
        //     editorState: RichUtils.toggleLink(
        //         newEditorState,
        //         selection,
        //         entityKey
        //     ),
        // });
        //把新的newState替代原来的editorState
        this.setState({
            editorState: RichUtils.toggleLink(
                newEditorState,
                selection,
                entityKey
            ),
        }, () => {
            setTimeout(() => this.refs.editor.focus(), 0);
        });
        this.handleCancleLinkModal();

    };


    addImage = src => {
        const editorState = this.state.editorState;
        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity(
              'image',
              'IMMUTABLE',
              { src }
        );
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newEditorState = EditorState.set(
          editorState,
          { currentContent: contentStateWithEntity },
          'create-entity'
        );

        this.setState({
            editorState: AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' ')
        }, () => {
            setTimeout(this.focus, 0);
        });
    };

    deleteImage = (block) => {
        const editorState = this.state.editorState;
        const contentState = editorState.getCurrentContent();
        const key = block.getKey();

        const selection = editorState.getSelection();
        const selectionOfAtomicBlock = selection.merge({
          anchorKey: key,
          anchorOffset: 0,
          focusKey: key,
          focusOffset: block.getLength(),
        });

        // 重写 entity 数据，将其从 block 中移除，防止这个 entity 还被其它的 block 引用
        const contentStateWithoutEntity = Modifier.applyEntity(contentState, selectionOfAtomicBlock, null);
        const editorStateWithoutEntity = EditorState.push(editorState, contentStateWithoutEntity, 'apply-entity');

        // 移除 block
        const contentStateWithoutBlock = Modifier.removeRange(contentStateWithoutEntity, selectionOfAtomicBlock, 'backward');
        const newEditorState =  EditorState.push(editorStateWithoutEntity, contentStateWithoutBlock, 'remove-range',);

        this.onChange(newEditorState);
    };

    // handleKeyCommand = command => {
    //     const newState = RichUtils.handleKeyCommand(
    //       this.state.editorState,
    //       command
    //     );
    //     if (newState) {
    //       this.onChange(newState);
    //       return "handled";
    //     }
    //     return "not-handled";
    // };

    showAddLinkModal = (e) =>{
        this.setState({
            visibleLink : true
        })
    };

    handleCancleLinkModal = () => {
        this.setState({
            visibleLink : false
        })
    };

    urlChange = (e) => {
        this.setState({
            url : e.target.value
        })
    };

    render() {
        const fontItems = FONT_SIZE;
        const colorItems = COLORS;
        const defaultFont = 24;
        const {checkIsExtArt,url} = this.state;
        const {data} = this.props;
        let btn = <Button onClick={this.convertToHtml}>发送文章</Button>;
        if(checkIsExtArt){
            btn = <Button onClick={this.convertToHtml}>更改文章</Button>
        }


        return (
            <Fragment>
              <Container>
                <Icon className="editor-btn" type="bold" onClick={() => this.toggleInlineStyle("BOLD")}/>
                <Icon className="editor-btn" type="underline" onClick={() => this.toggleInlineStyle("UNDERLINE")}/>
                <Icon className="editor-btn" type="italic" onClick={() => this.toggleInlineStyle("ITALIC")}/>
                <Icon className="editor-btn" type="strikethrough" onClick={() => this.toggleInlineStyle("STRIKETHROUGH")}/>
                {/*<Icon className="editor-btn" type="strikethrough" onClick={() => this.toggleInlineStyle("CODE")}/>*/}

                <Select className="editor-btn" defaultValue={defaultFont} style={{ width: 80 }} onChange={(e) => this.toggleInlineStyle(e)}>
                  {
                    fontItems.map((item)=>{
                      return(
                          <Option key={item} value={item.style}>{item.label}</Option>
                      )
                    })
                  }
                </Select>

                <Select className="editor-btn" defaultValue="Red" style={{ width: 80 }} onChange={(e) => this.toggleInlineStyle(e)}>
                  {
                    colorItems.map((item,index)=>{
                      return(
                          <Option key={index} value={item.style}>{item.label}</Option>
                      )
                    })
                  }
                </Select>

                  <Text className="editor-btn" type="secondary" onClick={() => {this.toggleBlockType('unstyled')}}>标准</Text>
                <Text className="editor-btn" type="secondary" onClick={() => {this.toggleBlockType('header-one')}}>H1</Text>
                <Text className="editor-btn" type="secondary" onClick={() => {this.toggleBlockType('header-two')}}>H2</Text>
                <Text className="editor-btn" type="secondary" onClick={() => {this.toggleBlockType('header-three')}}>H3</Text>
                <Text className="editor-btn" type="secondary" onClick={() => {this.toggleBlockType('header-four')}}>H4</Text>
                <Text className="editor-btn" type="secondary" onClick={() => {this.toggleBlockType('header-five')}}>H5</Text>
                <Text className="editor-btn" type="secondary" onClick={() => {this.toggleBlockType('blockquote')}}>添加引用</Text>
                <Text className="editor-btn" type="secondary" onClick={() => {this.toggleBlockType('code-block')}}>代码块</Text>
                <Text className="editor-btn" type="secondary" onClick={() => {this.toggleBlockType('unordered-list-item')}}>UL</Text>
                <Text className="editor-btn" type="secondary" onClick={() => {this.toggleBlockType('ordered-list-item')}}>OL</Text>

                  {/*<Icon type="disconnect" className="editor-btn" onClick={(e) => {this.showAddLinkModal(e)}}/>*/}
                  {/*<Button width={50} block className="editor-btn" type="secondary" onClick={() => {this.toggleBlockType('ordered-list-item')}}>添加图片</Button>*/}
                <Divider style={{margin:"0"}} />
                  <EditorBox>
                  <Editor
                    editorState={this.state.editorState}
                    onChange={this.onChange}
                    ref={this.setDomEditorRef}
                    customStyleMap={styleMap}
                    placeholder="Please input here..."
                    blockRendererFn={myBlockRenderer}
                  />

                </EditorBox>
              </Container>
                <Row>
                    <Col span={1}  push={11}>
                        {btn}
                    </Col>
                </Row>

                <Modal
                    title="添加链接"
                    visible={this.state.visibleLink}
                    onOk={this.addLink}
                    onCancel={this.handleCancleLinkModal}
                >
                    <div style={{ marginBottom: 16 }}>
                        <Input id="send-add-link" addonBefore={selectBefore} value={url} onChange={(e) => this.urlChange(e)} />
                    </div>
                </Modal>
            </Fragment>
        );
    }
}

function myBlockRenderer(contentBlock) {
    // 获取到contentBlock的文本信息，可以用contentBlock提供的其它方法获取到想要使用的信息
    const text = contentBlock.getText();
    // 我们假定这里图片的文本格式为![图片名称](htt://....)
    let matches = text.match(/\!\[(.*)\]\((http.*)\)/);
        if (matches) {
            return {
                component: ImgComponent,  // 指定组件
                editable: false,  // 这里设置自定义的组件可不可以编辑，因为是图片，这里选择不可编辑
                // 这里的props在自定义的组件中需要用this.props.blockProps来访问
                props: {
                    src: matches[2],
            }
        };
    }
}

function findLinkEntities(contentBlock, callback, contentState) {
    contentBlock.findEntityRanges(
        (character) => {
            const entityKey = character.getEntity();
            return (
                entityKey !== null &&
                contentState.getEntity(entityKey).getType() === 'LINK'
            );
        },
        function () {
            console.log(arguments);
            callback(...arguments);
        }

    );
}
const LinkComponent = (props) => {
    debugger;
    const httpType = document.querySelectorAll(".ant-select-selection-selected-value")[3].title.toLowerCase();
    const {url} = props.contentState.getEntity(props.entityKey).getData();
    const urlValue = httpType + url;
    return (
        <a href={urlValue}>
            {props.children}
        </a>
    );
};
export default MyEditor;


