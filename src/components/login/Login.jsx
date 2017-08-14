import React from 'react';
import { Menu } from 'antd';
import { Link } from 'dva/router';

import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
const FormItem = Form.Item;
import Reqwest from 'reqwest';

class NormalLoginForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
    const formValue = this.props.form.getFieldsValue();
    // const {userName, password} = formValue;
    Reqwest({
        url: '/hw/admin/login',
        method:　'POST',
        data: JSON.stringify(formValue),
        type: 'json',
        contentType: 'application/json',
        success: function (res) {
            // data.id=res.data.insertId;
            if(res.code==0){
                message.info('登录成功');
                setTimeout(()=>location.reload(), 1000);
            }
            else{
                message.warn('密码错误');
            }
        }
    });


  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
        </FormItem>
        <FormItem>
        <h3>若没有账户，请联系金刚获取</h3>
        </FormItem>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);


function Login(props){
    return  <div className="Login" style={{width: '30%', margin:'0 auto'}}>
                
               <WrappedNormalLoginForm />
            </div>;
};

export default Login;
