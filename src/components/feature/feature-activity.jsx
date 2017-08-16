// 含有可操作 table 栏的数据展示
import React from 'react';

import FeatureSetConfig from '../common/FeatureSetConfig';

import Immutable from 'immutable';
import Reqwest from 'reqwest';
import moment from 'moment';

const activity_types = ['徒步登山', '重装野营', '腐败娱乐', '休闲摄影', '玩车', '玩水', 
'骑行', '速降', '攀爬', '探洞', '航空活动', '滑行', '球类', '垂钓捕捉', '体育赛事', '定向', '专业级', '限制级']

const activity_types_option = activity_types.map(item=>{
    return {
        value: item,
        text: item
        }
});


const status_map = {
    open: '报名',
    full:'满员',
    time_out: '截止',
    end:'结束'
}

const C_U_Type = [
        {
            name: 'title',
            label: '活动名称',
            type: 'string',
            placeholder: '请输入活动名称',
            rules: [{ required: true, min: 1, message: '不要为空' }]
        },
        {
            name: 'link_url',
            label: '跳转链接',
            type: 'string',
            placeholder: '请输入跳转链接',
            rules: [{ required: true, min: 1, message: '不要为空' }]
            // rules: [{ required: false, message: '请输入正确的邮箱地址' }]
        },
        {
            name: 'image_url',
            label: '图片',
            type: 'imageUpload',
            rules: [{ required: true, min: 1, message: '不要为空' }]
        },
        {
            name: 'start_time',
            label: '活动开始时间',
            type: 'date'
        },
        {
            name: 'end_time',
            label: '活动结束时间',
            type: 'date'
        },
        {
            name: 'registrate_end_time',
            label: '报名截止时间',
            type: 'date'
        },
        {
            name: 'limit_num',
            label: '人数限制',
            type: 'string',
            placeholder: '请输入人数',
            rules: [{ required: true, min: 1, message: '不要为空' }]
        },
        {
            name: 'location',
            label: '地点',
            type: 'string',
            placeholder: '请输入活动地点',
            rules: [{ required: true, min: 1, message: '不要为空' }]
        },
        {
            name: 'leader_name_alias',
            label: '领队',
            type: 'string',
            placeholder: '请输入领队花名',
            rules: [{ required: true, min: 1, message: '不要为空' }]
        },
        {
            name: 'points',
            label: '积分',
            type: 'string',
            placeholder: '请输入积分',
            rules: [{ required: true, min: 1, message: '不要为空' }]
        },
        {
            name: 'seq',
            label: '优先级(0最低)',
            type: 'string',
            placeholder: '请输入领队花名优先级',
            rules: [{ required: true, min: 1, message: '不要为空' }]
        },
        {
            name: 'price',
            label: '费用(单位角)',
            type: 'string',
            placeholder: '请输入费用',
            rules: [{ required: true, min: 1, message: '不要为空' }]
        },
        {
            name: 'type',
            label: '活动类型',
            type: 'select',
            defaultValue: '徒步登山',
            options:activity_types_option,
            rules: [{ required: true, min: 1, message: '不要为空' }]
        },
        {
            name: 'status',
            label: '状态',
            type: 'select',
            defaultValue: 'open',
            options:[{
                text: '报名',
                value: 'open'
            },{
                text: '结束',
                value: 'end'
            },{
                text: '截止',
                value: 'time_out'
            },{
                text: '满员',
                value: 'full'
            }],
            rules: [{ required: true, min: 1, message: '不要为空' }]
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
        scroll: { x: 1700, y: 700 },
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
            title: '活动名称',
            dataIndex: 'title',
            type: 'string',
            width:100,
        }, {
            title: '图片',
            dataIndex: 'image_url',
            type: 'image',
            width:100,
            render:(text, item)=><div style={{backgroundSize: 'contain',backgroundRepeat: 'no-repeat',
            backgroundPosition: 'top', height:'2rem',backgroundImage:`url(${text})`}} />
        },{
            title: '详情链接',
            dataIndex: 'link_url',
            type: 'string',
            width:300,
            render:(text, item)=><a href={text} >{text}</a>
        },{
            title: '活动开始时间',
            dataIndex: 'start_time',
            type: 'date',
            width:100,
            // render:(text, item)=>moment(text*1000).format('YYYY-MM-DD HH:mm')
        },
        {
            title: '活动结束时间',
            dataIndex: 'end_time',
            type: 'date',
            width:100,
            // render:(text, item)=>moment(text*1000).format('YYYY-MM-DD HH:mm')
        },
        {
            title: '报名截止时间',
            dataIndex: 'registrate_end_time',
            type: 'date',
            width:100,
            // render:(text, item)=>moment(text*1000).format('YYYY-MM-DD HH:mm')
        },{
            title: '活动地点',
            dataIndex: 'location',
            type: 'string',
            width:100,
        },{
            title: '活动类型',
            dataIndex: 'type',
            type: 'string',
            width:100,
        },{
            title: '领队',
            dataIndex: 'leader_name_alias',
            type: 'string',
            width:100,
        },{
            title: '名额',
            dataIndex: 'limit_num',
            type: 'string',
            width:100,
        },
        {
            title: '已报名人数',
            dataIndex: 'cur_num',
            type: 'string',
            width:100,
        },
        {
            title: '积分',
            dataIndex: 'points',
            type: 'string',
            width:100,
        }, {
            title: '顺序',
            dataIndex: 'seq',
            type: 'string',
            width:100,
        },{
            title: '成功发队',
            dataIndex: 'success',
            render: (text, item)=><span>{text=='1'?'是':'否'}</span>,
            width:100,
        },
        {
            title: '状态',
            dataIndex: 'status',
            render: (text, item)=><span>{status_map[text]}</span>,
            width:100,
        },
        {
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
        console.log(data);
        // 需要设置key
        data.key = data.id;
        data.registrate_end_time = data.registrate_end_time.unix()
        data.start_time = data.start_time.unix()
        data.end_time = data.end_time.unix();
        data.admin_id = getCookie('admin_id');
        data.success = 0;
        data.cur_num = 0;
        data.status = 'open';
        Reqwest({
            url: '/hw/activity/add',
            method:　'POST',
            data: JSON.stringify(data),
            type: 'json',
            contentType: 'application/json',
            success: function (res) {
                data.id=res.data.insertId;
                data.start_time =  moment(data.start_time*1000).format('YYYY-MM-DD HH:mm');
                data.end_time =  moment(data.end_time*1000).format('YYYY-MM-DD HH:mm');
                data.registrate_end_time =  moment(data.registrate_end_time*1000).format('YYYY-MM-DD HH:mm');
                callback(data);
            }
        });

        // // 模拟请求创建成功的回调
        // setTimeout(function(){
        //     callback(data);
        // }, 1000);
    },

    Update:function(data, callback){
        console.log(data);
        data.registrate_end_time = data.registrate_end_time.unix();
        data.start_time = data.start_time.unix();
        data.end_time = data.end_time.unix();
        Reqwest({
            url: '/hw/activity/update',
            method:　'POST',
            data: JSON.stringify(data),
            type: 'json',
            contentType: 'application/json',
            success: function (res) {
                // data.id=res.data.insertId;
                data.start_time =  moment(data.start_time*1000).format('YYYY-MM-DD HH:mm');
                data.end_time =  moment(data.end_time*1000).format('YYYY-MM-DD HH:mm');
                data.registrate_end_time =  moment(data.registrate_end_time*1000).format('YYYY-MM-DD HH:mm');
                callback(data);
            }
        });

        // 这块请求更新数据 成功回调
        // data.key =  data.id;
        // callback(data);
    },
  

    // 创建项目所需的字段 与 更新项目所需的字段
    // rules 规范可见 https://github.com/yiminghe/async-validator
    CType: C_U_Type,
    UType: C_U_Type,

    /**
     * 查询
     */
    RType:[
        {
            name: 'id',
            label: 'ID',
            type: 'string',
            placeholder: '请输入ID'
        },
        {
            name: 'title',
            label: '活动名称',
            type: 'string'
        },
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
            url: '/hw/activity/list_search',
            method:　'POST',
            data: JSON.stringify(Object.assign({
                    "admin_id":getCookie('admin_id'),
                    "pageIndex": num,
                    "limit": 10
                    }, params)),
            type: 'json',
            contentType: 'application/json',
            success: function (data) {
                let list = data.data;
                list.forEach(function(ele) {
                    ele.key = ele.id;
                    ele.start_time =  moment(ele.start_time*1000).format('YYYY-MM-DD HH:mm');
                    ele.end_time =  moment(ele.end_time*1000).format('YYYY-MM-DD HH:mm');
                    ele.registrate_end_time =  moment(ele.registrate_end_time*1000).format('YYYY-MM-DD HH:mm');
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
