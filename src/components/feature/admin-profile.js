import React from 'react';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
import Reqwest from 'reqwest';
import uitil from '../../utils';


import ChinaAddress from '../common/ChinaAddress';

const chinaAddress = ChinaAddress;


class AdminProfile extends React.Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
        adminData: {},
    };

    componentDidMount(){
        Reqwest({
            url: '/hw/admin/get',
            method:　'POST',
            data: JSON.stringify({
                "admin_id":uitil.getAdminId()
            }),
            type: 'json',
            contentType: 'application/json',
            success: (data) => {
                console.log('get admin', data);
                this.setState({adminData: data.data[0]});
            }
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.update(values);
            }
        });
    }
    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }
    checkPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    }
    checkConfirm = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }

    handleWebsiteChange = (value) => {
        let autoCompleteResult;
        if (!value) {
            autoCompleteResult = [];
        } else {
            autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
        }
        this.setState({ autoCompleteResult });
    }

    update =(values) => {
        const address = values['chinaAddress'];
        Reqwest({
            url: '/hw/admin/update',
            method:　'POST',
            data: JSON.stringify(Object.assign({
                "id":uitil.getAdminId(),
                    club_address_p: address[0],
                    club_address_c: address[1],
                    club_address_t: address[2],
            }, values
                )),
            type: 'json',
            contentType: 'application/json',
            success: (data) => {
                console.log('get admin', data);
                this.setState({adminData: data.data[0]});
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { autoCompleteResult, adminData } = this.state;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 14,
                    offset: 6,
                },
            },
        };
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '86',
        })(
            <Select style={{ width: 60 }}>
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>
        );

        const websiteOptions = autoCompleteResult.map(website => (
            <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
        ));

        return (
            <Form style={{width: '50%'}} onSubmit={this.handleSubmit}>
                <FormItem
                    {...formItemLayout}
                    label="账户"
                >
                    {getFieldDecorator('name', {
                        initialValue: adminData.name,
                        rules: [{ required: true, message: '请输入账户' }],
                    })(

                            <Input />

                    )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="密码"
                    hasFeedback
                >
                    {getFieldDecorator('password', {
                        initialValue: adminData.pwd,
                        rules: [{
                            required: true, message: '请输入密码',
                        }, {
                            validator: this.checkConfirm,
                        }],
                    })(
                        <Input type="password" />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="重复密码"
                    hasFeedback
                >
                    {getFieldDecorator('confirm', {
                        initialValue: adminData.pwd,
                        rules: [{
                            required: true, message: '二次输入密码',
                        }, {
                            validator: this.checkPassword,
                        }],
                    })(
                        <Input type="password" onBlur={this.handleConfirmBlur} />
                    )}
                </FormItem>


                <FormItem
                    {...formItemLayout}
                    label="邮箱"
                    hasFeedback
                >
                    {getFieldDecorator('email', {
                        initialValue: adminData.email,
                        rules: [{
                            type: 'email', message: '邮箱格式有误',
                        }, {
                            required: true, message: '请输入邮箱',
                        }],
                    })(
                        <Input />
                    )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="个人手机"
                >
                    {getFieldDecorator('mobile', {
                        initialValue: adminData.mobile,
                        rules: [{ required: true, message: '请输入个人手机号码' }],
                    })(
                        <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                    )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="地址"
                >
                    {getFieldDecorator('chinaAddress', {
                        initialValue: [adminData.club_address_p, adminData.club_address_c, adminData.club_address_t],
                        rules: [{ type: 'array', required: true, message: '请选择省市区' }],
                    })(
                        <Cascader options={chinaAddress} />
                    )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="详细地址"
                >
                    {getFieldDecorator('club_address_detail', {
                        initialValue: adminData.club_address_detail,
                        rules: [{ required: true, message: '请输入详细地址' }],
                    })(
                            <Input />

                    )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="俱乐部名称"
                >
                    {getFieldDecorator('club_name', {
                        initialValue: adminData.club_name,
                        rules: [{ required: true, message: '请输入俱乐部名称' }],
                    })(

                            <Input />
                    )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="俱乐部手机"
                >
                    {getFieldDecorator('contact_mobile', {
                        initialValue: adminData.contact_mobile,
                        rules: [{ required: true, message: '请输入俱乐部联系方式' }],
                    })(
                        <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                    )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="俱乐部邮箱"
                    hasFeedback
                >
                    {getFieldDecorator('contact_email', {
                        initialValue: adminData.contact_email,
                        rules: [{
                            type: 'email', message: '输入的邮箱格式有误',
                        }, {
                            required: false, message: '请输入俱乐部邮箱',
                        }],
                    })(
                        <Input />
                    )}
                </FormItem>

                {/*<FormItem*/}
                    {/*{...formItemLayout}*/}
                    {/*label="Website"*/}
                {/*>*/}
                    {/*{getFieldDecorator('website', {*/}
                        {/*rules: [{ required: true, message: 'Please input website!' }],*/}
                    {/*})(*/}
                        {/*<AutoComplete*/}
                            {/*dataSource={websiteOptions}*/}
                            {/*onChange={this.handleWebsiteChange}*/}
                            {/*placeholder="website"*/}
                        {/*>*/}
                            {/*<Input />*/}
                        {/*</AutoComplete>*/}
                    {/*)}*/}
                {/*</FormItem>*/}
                {/*<FormItem*/}
                    {/*{...formItemLayout}*/}
                    {/*label="Captcha"*/}
                    {/*extra="We must make sure that your are a human."*/}
                {/*>*/}
                    {/*<Row gutter={8}>*/}
                        {/*<Col span={12}>*/}
                            {/*{getFieldDecorator('captcha', {*/}
                                {/*rules: [{ required: true, message: 'Please input the captcha you got!' }],*/}
                            {/*})(*/}
                                {/*<Input size="large" />*/}
                            {/*)}*/}
                        {/*</Col>*/}
                        {/*<Col span={12}>*/}
                            {/*<Button size="large">Get captcha</Button>*/}
                        {/*</Col>*/}
                    {/*</Row>*/}
                {/*</FormItem>*/}
                {/*<FormItem {...tailFormItemLayout} style={{ marginBottom: 8 }}>*/}
                    {/*{getFieldDecorator('agreement', {*/}
                        {/*valuePropName: 'checked',*/}
                    {/*})(*/}
                        {/*<Checkbox>I have read the <a href="">agreement</a></Checkbox>*/}
                    {/*)}*/}
                {/*</FormItem>*/}
                <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">修改</Button>
                </FormItem>
            </Form>
        );
    }
}

const WrappedRegistrationForm = Form.create()(AdminProfile);

export default WrappedRegistrationForm;

