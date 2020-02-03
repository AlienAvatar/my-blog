import React, {Fragment} from 'react';
import {Editor, EditorState,RichUtils,Modifier,AtomicBlockUtils} from 'draft-js';
import { Select,Layout,Icon,Button,Popover,Input} from 'antd';
import {src} from "../../public/image/avatar.jpg";
import addLinkPlugin from './EditorComponet/plugins/addLinkPlugin';
import ToolBar from './EditorComponet/components/tool-bar';
import {BLOCK_TYPES,FONT_SIZE,COLORS,styleMap} from "../Constant/EditorConstant"
const { Option } = Select;
const {Header} = Layout;

class ArticleEditor extends React.Component {
    constructor(props) {
        super(props);
        //创建一个空白对象
        this.state = {
            editorState: EditorState.createEmpty(),
            editorLinkURL:"",
        };

        this.onChange = (editorState) => this.setState({editorState});
        this.setEditor = (editor) => {
            this.editor = editor;
        };
        this.focusEditor = () => {
            if (this.editor) {
                this.editor.focus();
            }
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


    }

    componentDidMount() {
        this.focusEditor();
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


    handleSelectChange = (e) =>{
        const newEditState = RichUtils.toggleBlockType(
            this.state.editorState,
            e
        );
        this.onChange(newEditState);
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

    render() {
        const {editorState} = this.state;
        const addLinkContent = (
            <div style={{ marginBottom: 16 }}>
                <Input onChange={this.onChangeLinkValue} addonAfter={<Icon type="font-colors" />} defaultValue="" />
                <Button type="primary" onClick={this.onLink}>确定</Button>
                <Button>取消</Button>
            </div>
        );

        const blockItems = BLOCK_TYPES;
        const fontItems = FONT_SIZE;
        const colorItems = COLORS;
        const defaultFont = 14;
        return (
            <Fragment>
                <Icon className="editor-btn" type="bold" onClick={this.onBoldLineStyle}/>
                <Icon className="editor-btn" type="underline" onClick={this.onUnderLineStyle}/>
                <Icon className="editor-btn" type="italic" onClick={this.onItalicStyle}/>
                <Icon className="editor-btn" type="strikethrough" onClick={this.onStrikethroughStyle}/>
                <Select className="editor-btn" defaultValue="普通" style={{ width: 80 }} onChange={this.handleSelectChange}>
                    {
                        blockItems.map((item,index)=>{
                            return(
                                <Option key={index} value={item.style}>{item.label}</Option>
                            )
                        })
                    }
                </Select>


                <Select defaultValue={defaultFont} style={{ width: 80 }} onChange={this.onFontSizeStyle}>
                    {
                        fontItems.map((item)=>{
                            return(
                                <Option key={item}>{item}</Option>
                            )
                        })
                    }
                </Select>

                <Select defaultValue="Red" style={{ width: 80 }} onChange={this.onColorFontStyle}>
                    {
                        colorItems.map((item,index)=>{
                            return(
                                <Option key={index} value={item.style}>{item.label}</Option>
                            )
                        })
                    }
                </Select>

                <Popover content={addLinkContent} title="Title" trigger="click">
                    <Button>添加链接</Button>
                </Popover>

                <Button onClick={this.onImageAdd}>添加图片</Button>
                <ToolBar
                    onLinkClick={this.addLink}
                />
                <Button onClick={this.addLink}>Test</Button>

                <div style={styles.editor} onClick={this.focusEditor}>
                    <Editor
                        editorState={editorState}
                        ref={this.setEditor}
                        handleKeyCommand={this.handleKeyCommand}

                        style={styles.editor} onClick={this.focusEditor}
                        onChange={this.onChange}
                        customStyleMap={styleMap}
                        plugins={this.plugins}
                    />
                </div>
            </Fragment>
        );
    }
}

// function myBlockRenderer(contentBlock) {
//     const type = contentBlock.getType();
//     if (type === 'atomic') {
//         return {
//             component: MediaComponent,
//             editable: false,
//             props: {
//                 foo: 'bar',
//             },
//         };
//     }
// }

const styles = {
    editor: {
        border: '1px solid gray',
        minHeight: '6em'
    }
};



export default ArticleEditor;