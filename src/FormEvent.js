import React, { Component } from 'react';

class FormEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: ''
        }
        this.changeHandller = this.changeHandller.bind(this);
    };
    //定义普通函数，采用bind(this)的方式改变this指向
    changeHandller(event) {
        let username=this.refs.username.value
        this.setState({
            username
        })
    }
    //定义箭头函数，可以避免绑定bind
    getData = () => {
        alert(this.state.username)
    }
    render() {
        return (<div>
            <input ref="username" onChange={this.changeHandller} /><button onClick={this.getData}>获取输入框数据</button>
        </div>
        )
    }
}
export default FormEvent;