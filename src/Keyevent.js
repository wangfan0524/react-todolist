import React, { Component } from 'react';
import './Test.css';
import 'antd/dist/antd.css';
import { Button, Radio, Icon, List, notification, Input, Checkbox } from 'antd';
import Storage from './Storage'
import storage from './Storage';
class Keyevent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            list: [
                {
                    title: '学习react',
                    checked: false
                },
                {
                    title: '学习java',
                    checked: false
                },
                {
                    title: '学习python',
                    checked: false
                },
                {
                    title: '学习mysql',
                    checked: false
                }

            ],
            list1: [

            ],
            list2: [
                '11',
                '22',
                '33'
            ]
        };
        this.changeHandller = this.changeHandller.bind(this);
        this.submitCommonet = this.submitCommonet.bind(this);
    }
    openNotificationWithIcon = (type) => {
        notification[type]({
            message: '警告',
            description: '提交事项不能为空',
        });
    };
    //键盘监听事件，当回车键按下时，将输入框内容加入到list中，并清空输入框
    inputKeyUp = (event) => {
        if (event.keyCode == 13) {
            if (event.target.value.trim().length === 0) {
                this.openNotificationWithIcon('warning');
                return false;
            }
            let list = this.state.list;
            list.push({
                title: event.target.value,
                checked: false
            });
            // list=list.reverse();
            this.setState({
                username: '',
                list
            })
            Storage.set('listcatch', list);

        }
    }
    //这里进行dom和state的绑定
    changeHandller(event) {
        this.setState({
            username: event.target.value
        })

    }
    //刪除方法
    deleteItem(index) {
        let list = this.state.list;
        list.splice(index, 1)
        this.setState({
            username: '',
            list
        })
        Storage.set('listcatch', list)
    }
    //按鈕提交方法，將輸入框內容，顯示到列表
    submitCommonet(event) {
        if (this.state.username.trim().length === 0) {
            alert('不行');
            return false;
        }
        let list = this.state.list;
        list.push({
            title: this.state.username,
            checked: false
        })
        this.setState({
            list
        });
        Storage.set('listcatch', list)
    }
    handlerCheckbox = (key, val) => {

        let templist = this.state.list;
        templist[key].checked = !templist[key].checked;
        this.setState({
            list: templist
        })
        Storage.set('listcatch', templist)
    }
    //页面渲染时调用
    componentDidMount() {
        let templist = storage.get('listcatch');
        if (0 == templist.length) {
            this.setState({
                list: this.state.list
            })
        } else {
            this.setState({
                list: templist
            })
        }

    }

    render() {
        return (
            <div>
                <header className="header">
                    <label>ToDoList</label>

                    <Input value={this.state.username} onChange={this.changeHandller} onKeyUp={this.inputKeyUp} className="input" />

                    <Button className="ant-button" onClick={this.submitCommonet}>提交事项</Button>
                </header>


                <br></br>
                <h2 className='h2style'>待办事项</h2>
                <hr />
                <ul className="list" key='ul1'>
                    {this.state.list.map((value, item) => {
                        if (!value.checked) {
                            //点击超链接标签将list下标传递给给删除方法，进行删除操作
                            return (
                                <div>
                                    <li key={value.title}>
                                        <Checkbox key={'ttt' + value.title} checked={value.checked} onChange={this.handlerCheckbox.bind(this, item, value.checked)}></Checkbox>

                                        {value.title}
                                        <a href="#" onClick={this.deleteItem.bind(this, item)}>删除</a>
                                    </li>
                                </div>)
                        }
                    })
                    }
                </ul>

                <h2 className='h2style'>已办事项</h2>
                <hr />
                <ul className="list" key='ul2'>
                    {this.state.list.map((value, item) => {
                        //点击超链接标签将list下标传递给给删除方法，进行删除操作
                        if (value.checked) {
                            return (<div>
                                <li key={value.title}>
                                    <Checkbox key={'ttt' + value.title} checked={value.checked} onChange={this.handlerCheckbox.bind(this, item, value.checked)}></Checkbox>
                                    {value.title}
                                    <a href="#" onClick={this.deleteItem.bind(this, item)}>删除</a>
                                </li>
                            </div>)
                        }
                    })}
                </ul>
            </div>
        );
    }
}
export default Keyevent;