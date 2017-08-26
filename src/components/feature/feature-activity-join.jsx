// 含有可操作 table 栏的数据展示
import React from 'react';

import FeatureSetConfig from '../common/FeatureSetConfig';

import Immutable from 'immutable';
import Reqwest from 'reqwest';
import {Modal, Input,Button, message} from 'antd';
import CopyToClipboard from 'react-copy-to-clipboard';
import QRCode from 'qrcode';
import uitil from '../../utils';

const C_U_Type = [
        {
            name: 'id',
            label: '唯一标识',
            type: 'string',
            placeholder: '请输入标示名称',
            rules: [{ required: true, min: 5, message: '用户名至少为 5 个字符' }]
        },{
            name: 'email',
            label: '唯一标识',
            type: 'string',
            placeholder: '请输入标示名称',
            rules: [{ required: true, type: 'email', message: '请输入正确的邮箱地址' }]
        },{
            name: 'date',
            label: '项目开始时间',
            type: 'date',
        },{
            name: 'stype',
            label: '项目类型Select',
            type: 'select',
            defaultValue: 'one',
            options:[{
                text: '选项一',
                value: 'one'
            },{
                text: '选项二',
                value: 'two'
            },{
                text: '选项三',
                value: 'three'
            }]
        },{
            name: 'rtype',
            label: '项目类型Radio',
            type: 'radio',
            defaultValue: 'one',
            options:[{
                text: '选项一',
                value: 'one'
            },{
                text: '选项二',
                value: 'two'
            },{
                text: '选项三',
                value: 'three'
            }]
        },{
            name: 'ischange',
            label: '是否过滤',
            type: 'switch'
        },{
            name: 'image',
            label: '背景图片',
            type: 'imageUpload'
        }
    ];

const conf = {
    
    type: 'tableList', 
    
    // 初始化页面的数据 回调函数传入 items 列表
    // initData: function(callback){

    //     // 接口调用数据形式
    //     Reqwest({
    //         url: '/api/activity_join/list',
    //         data: {},

    //         type: 'json',
    //         success: function (data) {
    //             let list = data.data;
    //             list.forEach(function(ele) {
    //                 ele.key = ele.id;
    //             });
    //             callback(list);
    //         }
    //     });
           
    // },

    tableConfig: {
        scroll: { x: 1400, y: 700 },
    },

    pageData: function(num, callback){
        this.RequestData(Object.assign(this.RParams, {num}), callback);
    },

    columns: [
        {
            title: 'ID',
            dataIndex: 'id',
            type: 'string',
            width:80,
            fixed:'left'
        }, 
        {
            title: '活动ID',
            dataIndex: 'activity_id',
            type: 'string',
            width:100
        },
        {
            title: '活动名称',
            dataIndex: 'title',
            type: 'string',
            width:200,
        }, 
        {
            title: '全名',
            dataIndex: 'user_name',
            type: 'string',
            width:100,
        },
        {
            title: '户外花名',
            dataIndex: 'user_name_alias',
            type: 'string',
            width:200,
        },
        {
            title: '性别',
            dataIndex: 'sex',
            type: 'string',
            width:100,
            render: (text, item)=>text==0?'女':'男'
        },
        {
            title: '手机',
            dataIndex: 'mobile',
            type: 'string',
            width:200        },
        {
            title: '付款金额',
            dataIndex: 'down_payment',
            type: 'string',
            width:100,
            render:(text, item)=>text/100.0
        },
        {
            title: '是否填写资料卡',
            dataIndex: 'isZiliao',
            type: 'string',
            width:100,
            render:(text, item)=>text==1?'是':'否'
        },
        // {
        //     title: '付款截图',
        //     dataIndex: 'u_pay_image',
        //     type: 'image',
        //     width:100,
        //     render:(text, item)=><div style={{backgroundSize: 'contain',backgroundRepeat: 'no-repeat',
        //     backgroundPosition: 'top', height:'2rem',backgroundImage:`url(${text})`}} />
        // },
        {
            title: '其他',
            dataIndex: 'extra',
            type: 'string',
            width:100
        },
        {
            title: '操作',
            type: 'operate',    // 操作的类型必须为 operate
            btns: [{
                text: '资料卡填写链接',
                // type: 'ziliao',
                callback: function(item){
                    const url = `http://lv.mobu.biz/user-hw/profile/edit/${item.id}`;
                    Modal.info({
                        title: '资料卡填写链接',
                        content: <div>
                            <canvas id="join-canvas"></canvas>
                            <Input value={url} />
                            <CopyToClipboard text={url}
                                             onCopy={() => {message.info('copy success')}}>
                                <Button>Copy url</Button>
                            </CopyToClipboard>
                        </div>
                    })
                    window.setTimeout(()=>{
                        const canvas = document.getElementById('join-canvas')
                        console.info(canvas);
                        QRCode.toCanvas(canvas, url, function (error) {
                            if (error) console.error(error)
                            console.log('success!');
                        })
                    }, 1000)
                }
            },
            //     {
            //     text: '更新',
            //     type: 'update'
            // }
            ], // 可选
            fixed: 'right',
            width:120,
        },
    ],
    
    // 模拟添加数据的接口 回调
    Create: function(data, callback){
        
        // ... 操作添加数据的请求
        console.log(data);
        
        // 需要设置key
        data.key = data.id;
        data.date = data.date.format("YYYY-MM-DD hh:mm:ss");
        // 模拟请求创建成功的回调
        setTimeout(function(){
            callback(data);
        }, 1000);
    },
  

    // 创建项目所需的字段 与 更新项目所需的字段
    // rules 规范可见 https://github.com/yiminghe/async-validator
    // CType: C_U_Type,
    UType: C_U_Type,

    // 查询
    // 可设置的查询字段
    RType:[
        // {
        //     name: 'id',
        //     label: '唯一标识',
        //     type: 'string',
        //     placeholder: '请输入标示名称'
        // },
        {
            name: 'activity_id',
            label: '活动ID',
            type: 'string'
        },{
            name: 'user_name',
            label: '全名',
            type: 'string',
        },
        {
            name: 'user_name_alias',
            label: '花名',
            type: 'string',
        },
        {
            name: 'mobile',
            label: '会员手机',
            type: 'string',
        },
        // {
        //     name: 'a_success',
        //     label: '是否成行',
        //     type: 'switch',
        //     defaultValue: false
        // }
    ],
    RParams:{

    },

    // 查询操作回调
    Retrieve: function(data, callback){
        this.RParams = data;
        console.log(data);
        data.num = 1;
        this.RequestData(data, callback);

        // Reqwest({
        //     method:'POST',
        //     url: '/hw/activity/list',
        //     data: JSON.stringify({
        //         id: data.id,
        //     }),
        //     type: 'json',
        //     contentType: 'application/json',
        //     success: function (data) {
        //         let list = data.data;
        //         let i = 0;
        //         list.forEach(function(ele) {
        //             ele.key = i++;
        //         });

        //         // 查询成功 传入列表数据
        //         callback(list);
        //     }
        // });
    },

    RequestData: function(params, callback){
        console.log('requestData:', params);
        const {num} = params;

        Reqwest({
            url: '/hw/join/list_search',
            method:　'POST',
            data: JSON.stringify(Object.assign({
                    "admin_id":uitil.getAdminId(),
                    "pageIndex": num,
                    "limit": 10
                    }, params)),
            type: 'json',
            contentType: 'application/json',
            success: function (data) {
                let list = data.data;
                list.forEach(function(ele) {
                    ele.key = ele.id;
                    // ele.start_time =  moment(ele.start_time*1000).format('YYYY-MM-DD HH:mm');
                    // ele.end_time =  moment(ele.end_time*1000).format('YYYY-MM-DD HH:mm');
                    // ele.registrate_end_time =  moment(ele.registrate_end_time*1000).format('YYYY-MM-DD HH:mm');
                });
                callback(list, {
                    total: data.pagination.total,
                    current: num,
                    pageSize: 10
                });
            }
        });
    }

};

const Feature = FeatureSetConfig(conf);

export default Feature;
