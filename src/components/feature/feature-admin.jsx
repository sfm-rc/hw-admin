// 含有可操作 table 栏的数据展示
import React from 'react';

import FeatureSetConfig from '../common/FeatureSetConfig';

import Immutable from 'immutable';
import Reqwest from 'reqwest';
import moment from 'moment';


const C_U_Type = [
        {
            name: 'name',
            label: '管理员账户',
            type: 'string',
            placeholder: '请输入管理员账户',
            rules: [{ required: true, min: 1, message: '不要为空' }]
        },
        {
            name: 'mobile',
            label: '手机',
            type: 'string',
            placeholder: '请输入手机',
            rules: [{ required: true, min: 1, message: '不要为空' }]
            // rules: [{ required: false, message: '请输入正确的邮箱地址' }]
        },
        {
            name: 'email',
            label: '邮箱',
            type: 'string',
            rules: [{ required: true, min: 1, message: '不要为空' }]
        },
        {
            name: 'pwd',
            label: '密码',
            type: 'string'
        },
        {
            name: 'club_name',
            label: '俱乐部名称',
            type: 'string'
        },
        {
            name: 'club_address',
            label: '俱乐部地址',
            type: 'string'
        },
        {
            name: 'contact_name',
            label: '联系人',
            type: 'string',
            rules: [{ required: true, min: 1, message: '不要为空' }]
        },
        {
            name: 'contact_mobile',
            label: '联系人手机',
            type: 'string',
            rules: [{ required: true, min: 1, message: '不要为空' }]
        },
        {
            name: 'contact_email',
            label: '联系人邮箱',
            type: 'string'
        },



        // {
        //     name: 'stype',
        //     label: '项目类型Select',
        //     type: 'select',
        //     defaultValue: 'one',
        //     options:[{
        //         text: '选项一',
        //         value: 'one'
        //     },{
        //         text: '选项二',
        //         value: 'two'
        //     },{
        //         text: '选项三',
        //         value: 'three'
        //     }]
        // },
        // {
        //     name: 'rtype',
        //     label: '项目类型Radio',
        //     type: 'radio',
        //     defaultValue: 'one',
        //     options:[{
        //         text: '选项一',
        //         value: 'one'
        //     },{
        //         text: '选项二',
        //         value: 'two'
        //     },{
        //         text: '选项三',
        //         value: 'three'
        //     }]
        // },{
        //     name: 'ischange',
        //     label: '是否过滤',
        //     type: 'switch'
        // },

    ];

const conf = {
    
    type: 'tableList', 
    
    // 初始化页面的数据 回调函数传入 items 列表
    // initData: function(callback){

    //     // 接口调用数据形式
    //     Reqwest({
    //         method: 'post',
    //         url: ' /hw/activity/list',
    //         data: JSON.stringify({
    //                 "admin_id":"1",
    //                 "pageIndex": 1,
    //                 "limit": 10
    //                 }),
    //         contentType: 'application/json',
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
        scroll: { x: 1030, y: 700 },
    },

    pageData: function(num, callback){
        this.RequestData(Object.assign(this.RParams, {num}), callback);
    },

    columns: [
        {
            title: 'ID',
            dataIndex: 'id',
            type: 'string',
            width:30,
            fixed:'left'
        }, {
            title: '管理员名称',
            dataIndex: 'name',
            type: 'string',
            width:100,
        }, {
            title: '手机',
            dataIndex: 'mobile',
            type: 'string',
            width:100,
        },{
            title: '邮箱',
            dataIndex: 'email',
            type: 'string',
            width:100,
        },{
            title: '密码',
            dataIndex: 'pwd',
            type: 'string',
            width:100,
        },{
            title: '俱乐部名称',
            dataIndex: 'club_name',
            type: 'string',
            width:100,
        }, {
            title: '俱乐部地址',
            dataIndex: 'club_address',
            type: 'string',
            width:100,
        },{
            title: '联系人',
            dataIndex: 'contact_name',
            type: 'string',
            width:100,
        },{
            title: '联系人手机',
            dataIndex: 'contact_mobile',
            type: 'string',
            width:100,
        },{
            title: '联系人邮箱',
            dataIndex: 'contact_email',
            type: 'string',
            width:100,
        },{
            title: '操作',
            type: 'operate',    // 操作的类型必须为 operate
            btns: [{
                text: '更新',
                type: 'update'
            },
            // {
            //     text: '下架',
            //     callback: function(item){
            //         console.log(item)
            //     }
            // },
            {
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
        console.log('create admin', data);
        // 需要设置key
        Reqwest({
            url: '/hw/admin/add',
            method:　'POST',
            data: JSON.stringify(data),
            type: 'json',
            contentType: 'application/json',
            success: function (res) {
                data.id=res.data.insertId;
                data.key = data.id;
                callback(data);
            }
        });
    },

    Update:function(data, callback){
        console.log('update admin', data);
        Reqwest({
            url: '/hw/admin/update',
            method:　'POST',
            data: JSON.stringify(data),
            type: 'json',
            contentType: 'application/json',
            success: function (res) {
                // data.id=res.data.insertId;
                callback(data);
            }
        });
    },
  

    // 创建项目所需的字段 与 更新项目所需的字段
    // rules 规范可见 https://github.com/yiminghe/async-validator
    CType: C_U_Type,
    UType: C_U_Type,

    /**
     * 查询
     */
    RType:[
        // {
        //     name: 'id',
        //     label: 'ID',
        //     type: 'string',
        //     placeholder: '请输入ID'
        // },
        // {
        //     name: 'title',
        //     label: '活动名称',
        //     type: 'string'
        // },
        // {
        //     name: 'end_join_date',
        //     label: '报名截止时间',
        //     type: 'date',
        // },
        // {
        //     name: 'on_date',
        //     label: '活动时间',
        //     type: 'date',
        // },
        // {
        //     name: 'success',
        //     label: '是否成功发队',
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
    },

    RequestData: function(params, callback){
        console.log('requestData:', params);
        const {num} = params;

        Reqwest({
            url: '/hw/admin/list_search',
            method:　'POST',
            data: JSON.stringify(Object.assign({
                    // "admin_id":getCookie('admin_id'),
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
