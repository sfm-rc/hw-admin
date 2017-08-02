// 含有可操作 table 栏的数据展示
import React from 'react';

import FeatureSetConfig from '../common/FeatureSetConfig';

import Immutable from 'immutable';
import Reqwest from 'reqwest';


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
    initData: function(callback){

        // 接口调用数据形式
        Reqwest({
            url: '/api/activity_join/list',
            data: {},

            type: 'json',
            success: function (data) {
                let list = data.data;
                list.forEach(function(ele) {
                    ele.key = ele.id;
                });
                callback(list);
            }
        });
           
    },

    tableConfig: {
        scroll: { x: 1500, y: 700 },
    },

    columns: [
        {
            title: 'ID',
            dataIndex: 'id',
            type: 'string',
            width:30,
            fixed:'left'
        }, {
            title: '全名',
            dataIndex: 'u_name',
            type: 'string',
            width:100,
        }, {
            title: '户外花名',
            dataIndex: 'u_name_alias',
            type: 'string',
            width:100,
        }, {
            title: '性别',
            dataIndex: 'u_sex',
            type: 'string',
            width:100,
            render: (text, item)=><span>{text==1?'男':'女'}</span>
        }, 
        {
            title: '手机',
            dataIndex: 'u_mobile',
            type: 'string',
            width:100,
        },
        {
            title: '付款截图',
            dataIndex: 'u_pay_image',
            type: 'image',
            width:100,
            render:(text, item)=><div style={{backgroundSize: 'contain',backgroundRepeat: 'no-repeat',
            backgroundPosition: 'top', height:'2rem',backgroundImage:`url(${text})`}} />
        },{
            title: '活动ID',
            dataIndex: 'a_id',
            type: 'string',
            width:300
        },{
            title: '活动名称',
            dataIndex: 'a_title',
            type: 'string',
            width:100,
        },{
            title: '是否报名',
            dataIndex: 'is_join',
            type: 'string',
            width:100,
            render:(text, item)=><span>{text==1?'是':'否'}</span>
        },
        {
            title: '操作',
            type: 'operate',    // 操作的类型必须为 operate
            btns: [{
                text: '更新',
                type: 'update'
            },{
                text: '取消',
                callback: function(item){
                    console.log(item)
                }
            }], // 可选
            fixed: 'right',
            width:100,
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
    CType: C_U_Type,
    UType: C_U_Type,

    // 查询
    // 可设置的查询字段
    RType:[
        {
            name: 'id',
            label: '唯一标识',
            type: 'string',
            placeholder: '请输入标示名称'
        },{
            name: 'a_id',
            label: '活动ID',
            type: 'string'
        },{
            name: 'u_name_alias',
            label: '花名',
            type: 'string',
        },{
            name: 'u_mobile',
            label: '会员手机',
            type: 'string',
        },{
            name: 'a_success',
            label: '是否成行',
            type: 'switch',
            defaultValue: false
        }
    ],

};

const Feature = FeatureSetConfig(conf);

export default Feature;
