import React, {Fragment} from 'react';
import {
  EditorState, RichUtils, convertToRaw, AtomicBlockUtils, Modifier,convertFromRaw,ContentState,convertFromHTML
} from 'draft-js';
import Editor from "draft-js-plugins-editor";
import styled from 'styled-components';
import 'draft-js/dist/Draft.css';
import ToolBar from './EditorComponet/components/tool-bar';
import addLinkPlugin from './EditorComponet/plugins/addLinkPlugin';
import { mediaBlockRenderer } from './EditorComponet/components/entities/mediaBlockRenderer';
import {BLOCK_TYPES,FONT_SIZE,COLORS,styleMap} from "../Constant/EditorConstant"
import {Select, Layout, Icon, Button, Popover, Input, message, Typography} from 'antd';
import {stateToHTML} from 'draft-js-export-html';
import {local} from "../Constant/loginConstant";
import {getQueryVariable} from "../Utils/Utils";

const { Option } = Select;
const {Header,Footer, Sider, Content} = Layout;
const addArticleUrl = `${local.url}/addArticle`;
const CONTENT = "content=";
const TITLE = "title=";
const TYPE = "type=";
const USERNAME = "username=";
const PKID = "pkid=";
const DESC = "description=";
const { Title,Text} = Typography;

const Container = styled.div`
  margin: 20px auto;
  padding: 15px;
  border: 1px solid #ccc;
  text-align: left;
  max-width: 600px;
  width: 90%;
  position: relative;
`;

const EditorBox = styled.div`
  min-height: 400px;
`;

let options = {
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

class MyEditor extends React.PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            editorState: EditorState.createEmpty(),
            contentValue:null,
            loginMsg: null,
        };

        this.plugins = [
          addLinkPlugin,
        ];

        this.onBoldLineStyle = this.onBoldLineStyle.bind(this);
        this.onUnderLineStyle = this.onUnderLineStyle.bind(this);
        this.onItalicStyle = this.onItalicStyle.bind(this);
        this.onStrikethroughStyle = this.onStrikethroughStyle.bind(this);
        this.onFontSizeStyle = this.onFontSizeStyle.bind(this);
        this.onColorFontStyle = this.onColorFontStyle.bind(this);

        this.convertToHtml = this.convertToHtml.bind(this);
        this.addArticle = this.addArticle.bind(this);
        this.getData = this.getData.bind(this);
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
        const {editorState} = this.state;
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
        const {title,desc} = this.props;
        // let titleValue = document.getElementById("send-article-title").value;
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
        const {selectValue,checkSendArticle} = this.props;
        contentValue = contentValue.replace(/&nbsp;/ig, " ").toString();
        contentValue = JSON.stringify(contentValue);
        let queryUrl = `${addArticleUrl}?${CONTENT}${contentValue}&${TITLE}${title}&${DESC}${desc}&${TYPE}${selectValue}&${USERNAME}${loginMsg.username}`;
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
    }

    convertToHtml(){
        const {editorState} = this.state;
        let html = stateToHTML(editorState.getCurrentContent(),options);

        this.setState({
           htmlEditor:html
        });
        this.addArticle(html);

    }

      onBoldLineStyle(){
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, "BOLD"));
      }

      onUnderLineStyle(){
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, "UNDERLINE"));
      }

      onItalicStyle(){
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, "ITALIC"));
      }

      onStrikethroughStyle(){
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, "STRIKETHROUGH"));
      }

      onChange = (editorState) => {
        this.setState({ editorState });
      }

      onFontSizeStyle(e){
        const newEditState = RichUtils.toggleInlineStyle(
            this.state.editorState,
            Number(e),
        );
        this.onChange(newEditState);
      }

      onColorFontStyle(e){
        const newEditState = RichUtils.toggleInlineStyle(
            this.state.editorState,
            e,
        );
        this.onChange(newEditState);
      }
      addLink = () => {
        const editorState = this.state.editorState;
        const selection = editorState.getSelection();
        const link = window.prompt('Input the link here: ');

        if (!link) {
          this.onChange(RichUtils.toggleLink(editorState, selection, null));
          return 'handled';
        }

        const content = editorState.getCurrentContent();
        const contentWithEntity = content.createEntity('LINK', 'MUTABLE', { url: link });
        const newEditorState = EditorState.push(
          editorState, contentWithEntity, 'create-entity'
        );
        const entityKey = contentWithEntity.getLastCreatedEntityKey();

        this.onChange(RichUtils.toggleLink(newEditorState, selection, entityKey));
        return 'handled';
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
      }

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

      handleKeyCommand = command => {
        const newState = RichUtils.handleKeyCommand(
          this.state.editorState,
          command
        );
        if (newState) {
          this.onChange(newState);
          return "handled";
        }
        return "not-handled";
      };

      logState = () => {
        const content = this.state.editorState.getCurrentContent();
        console.log(convertToRaw(content));
      };

      render() {
        const blockItems = BLOCK_TYPES;
        const fontItems = FONT_SIZE;
        const colorItems = COLORS;
        const defaultFont = 24;
        return (
            <Fragment>
              <Container>
                <Icon className="editor-btn" type="bold" onClick={this.onBoldLineStyle}/>
                <Icon className="editor-btn" type="underline" onClick={this.onUnderLineStyle}/>
                <Icon className="editor-btn" type="italic" onClick={this.onItalicStyle}/>
                <Icon className="editor-btn" type="strikethrough" onClick={this.onStrikethroughStyle}/>

                {/*<Select className="editor-btn" defaultValue="普通" style={{ width: 80 }} onChange={this.handleSelectChange}>*/}
                {/*  {*/}
                {/*    blockItems.map((item,index)=>{*/}
                {/*      return(*/}
                {/*          <Option key={index} value={item.style}>{item.label}</Option>*/}
                {/*      )*/}
                {/*    })*/}
                {/*  }*/}
                {/*</Select>*/}


                <Select className="editor-btn" defaultValue={defaultFont} style={{ width: 80 }} onChange={this.onFontSizeStyle}>
                  {
                    fontItems.map((item)=>{
                      return(
                          <Option key={item} value={item.style}>{item.label}</Option>
                      )
                    })
                  }
                </Select>

                <Select className="editor-btn" defaultValue="Red" style={{ width: 80 }} onChange={this.onColorFontStyle}>
                  {
                    colorItems.map((item,index)=>{
                      return(
                          <Option key={index} value={item.style}>{item.label}</Option>
                      )
                    })
                  }
                </Select>
                <ToolBar
                  // onBoldClick={this._onBoldClick}
                  onLinkClick={this.addLink}
                  // onImageClick={this.addImage}
                />

                <EditorBox>
                  <Editor
                    editorState={this.state.editorState}
                    handleKeyCommand={this.handleKeyCommand}
                    onChange={this.onChange}
                    placeholder="Please input here..."
                    ref={this.setDomEditorRef}
                    plugins={this.plugins}
                    customStyleMap={styleMap}
                    blockRendererFn={(block) => mediaBlockRenderer(block, {
                      deleteImage: this.deleteImage
                    })}
                  />
                </EditorBox>


              </Container>
                <div className="editor-btn-send">
                    <Button onClick={this.convertToHtml}>发送文章</Button>
                </div>
            </Fragment>
        );
      }
}

export default MyEditor;


