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
            url: '/api/activity/list',
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
            title: '活动名称',
            dataIndex: 'title',
            type: 'string',
            width:100,
        }, {
            title: '图片',
            dataIndex: 'image',
            type: 'image',
            width:100,
            render:(text, item)=><div style={{backgroundSize: 'contain',backgroundRepeat: 'no-repeat',
            backgroundPosition: 'top', height:'2rem',backgroundImage:`url(${text})`}} />
        },{
            title: '详情链接',
            dataIndex: 'detail_url',
            type: 'string',
            width:300,
            render:(text, item)=><a href={text} >{text}</a>
        },{
            title: '活动时间',
            dataIndex: 'on_date',
            type: 'date',
            width:100,
        },{
            title: '报名截止时间',
            dataIndex: 'end_join_date',
            type: 'date',
            width:100,
        },{
            title: '活动地点',
            dataIndex: 'site',
            type: 'string',
            width:100,
        },{
            title: '活动类型',
            dataIndex: 'type',
            type: 'string',
            width:100,
        },{
            title: '领队',
            dataIndex: 'leader',
            type: 'string',
            width:100,
        },{
            title: '名额',
            dataIndex: 'limit',
            type: 'string',
            width:100,
        },
        {
            title: '积分',
            dataIndex: 'score',
            type: 'string',
            width:100,
        }, {
            title: '顺序',
            dataIndex: 'seq',
            type: 'string',
            width:100,
        },{
            title: '成功发队',
            dataIndex: 'is_success',
            render: (text, item)=><span>{text=='1'?'是':'否'}</span>,
            width:100,
        },
        {
            title: '操作',
            type: 'operate',    // 操作的类型必须为 operate
            btns: [{
                text: '更新',
                type: 'update'
            },{
                text: '下架',
                callback: function(item){
                    console.log(item)
                }
            },{
                text: '报名链接',
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
            name: 'end_join_date',
            label: '报名截止时间',
            type: 'date',
        },{
            name: 'on_date',
            label: '活动时间',
            type: 'date',
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
