// 含有可操作 table 栏的数据展示
import React from 'react';

import FeatureSetConfig from '../common/FeatureSetConfig';

import Immutable from 'immutable';
import Reqwest from 'reqwest';
import {Modal, Input,Button, message} from 'antd';
import CopyToClipboard from 'react-copy-to-clipboard';
import QRCode from 'qrcode';
import uitil from '../../utils';
import moment from 'moment';

const C_U_Type = [
    {
        name: 'title',
        label: '标题',
        type: 'string',
        placeholder: '请输入标题',
        rules: [{ required: true, min: 1, message: '不要为空' }]
    },
    {
        name: 'desc',
        label: '简述',
        type: 'string',
        placeholder: '请输入简述',
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
        name: 'author',
        label: '作者',
        type: 'string',
        placeholder: '请输入作者',
        rules: [{ required: true, min: 1, message: '不要为空' }]
    },
    {
        name: 'view_count',
        label: '浏览量',
        type: 'string',
        placeholder: '请输入标题',
        rules: [{ required: true, min: 1, message: '不要为空' }]
    },
    {
        name: 'start_date',
        label: '活动开始时间',
        type: 'date'
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
        scroll: { x: 1900, y: 700 },
    },

    pageData: function(num, callback){
        this.RequestData(Object.assign(this.RParams, {num}), callback);
    },

    columns: [
        {
            title: 'ID',
            dataIndex: 'id',
            type: 'string',
            width:100,
            fixed:'left'
        },
        {
            title: '名称',
            dataIndex: 'title',
            type: 'string',
            width:200,
        }, 
        {
            title: '简述',
            dataIndex: 'desc',
            type: 'string',
            width:300,
        },
        {
            title: '跳转',
            dataIndex: 'link_url',
            type: 'string',
            width:100,
            render: (text, item) => <a href={text}>{text}</a>
        },
        {
            title: '图片',
            dataIndex: 'image_url',
            type: 'string',
            width:200,
            render:(text, item)=><div style={{backgroundSize: 'contain',backgroundRepeat: 'no-repeat',
                backgroundPosition: 'top', height:'2rem',backgroundImage:`url(${text})`}} />
        },
        {
            title: '作者',
            dataIndex: 'author',
            type: 'string',
            width:100,
        },
        {
            title: '浏览量',
            dataIndex: 'view_count',
            type: 'string',
            width:100,
        },
        {
            title: '活动时间',
            dataIndex: 'start_date',
            type: 'string',
            width:200
        },

        {
            title: '俱乐部',
            dataIndex: 'admin',
            type: 'string',
            width:200
        },
        {
            title: '更新时间',
            dataIndex: 'created_at',
            type: 'string',
            width:200
        },
        {
            title: '操作',
            type: 'operate',    // 操作的类型必须为 operate
            btns: [{
                text: '更新',
                type: 'update'
            },{
                render: (txt, r, self) => {
                    const show = (r, self) => {
                        const data = {id: r.id, is_show: !r.is_show?1:0};
                        Reqwest({
                            url: '/hw/travelNote/update_show',
                            method:　'POST',
                            data: JSON.stringify(data),
                            type: 'json',
                            contentType: 'application/json',
                            success: function (res) {
                                self.state.resultList.map(item=>{
                                    if(item.id == r.id){
                                        item.is_show = !item.is_show?1:0;
                                    }
                                });
                                self.setState({resultList:self.state.resultList});
                            }
                        });
                    }
                    return <a onClick={()=>show(r, self)}>{r.is_show?'隐藏':'展示'}</a>
                },
            }],
            fixed: 'right',
            width:200,
        }
        // {
        //     title: '操作',
        //     type: 'operate',    // 操作的类型必须为 operate
        //     btns: [{
        //         text: '资料卡填写链接',
        //         // type: 'ziliao',
        //         callback: function(item){
        //             const url = `http://lv.mobu.biz/user-hw/profile/edit/${item.id}`;
        //             Modal.info({
        //                 title: '资料卡填写链接',
        //                 content: <div>
        //                     <canvas id="join-canvas"></canvas>
        //                     <Input value={url} />
        //                     <CopyToClipboard text={url}
        //                                      onCopy={() => {message.info('copy success')}}>
        //                         <Button>Copy url</Button>
        //                     </CopyToClipboard>
        //                 </div>
        //             })
        //             window.setTimeout(()=>{
        //                 const canvas = document.getElementById('join-canvas')
        //                 console.info(canvas);
        //                 QRCode.toCanvas(canvas, url, function (error) {
        //                     if (error) console.error(error)
        //                     console.log('success!');
        //                 })
        //             }, 1000)
        //         }
        //     },
        //     //     {
        //     //     text: '更新',
        //     //     type: 'update'
        //     // }
        //     ], // 可选
        //     fixed: 'right',
        //     width:120,
        // },
    ],
    
    // 模拟添加数据的接口 回调
    Create: function(data, callback){

        // ... 操作添加数据的请求
        console.log(data);
        // 需要设置key
        data.key = data.id;
        // data.created_at = moment().unix()
        data.start_date = data.start_date.unix()
        data.admin_id = uitil.getAdminId();
        data.type = this.getType();
        Reqwest({
            url: '/hw/travelNote/add',
            method:　'POST',
            data: JSON.stringify(data),
            type: 'json',
            contentType: 'application/json',
            success: function (res) {
                data.id=res.data.insertId;
                data.start_date =  moment(data.start_date*1000).format('YYYY-MM-DD HH:mm');
                data.created_at =  moment(data.created_at*1000).format('YYYY-MM-DD HH:mm');
                callback(data);
            }
        });
    },


    Update:function(data, callback){
        console.log(data);
        data.created_at = moment().unix()
        data.start_date = data.start_date.unix();
        data.admin_id = uitil.getAdminId();

        Reqwest({
            url: '/hw/travelNote/update',
            method:　'POST',
            data: JSON.stringify(data),
            type: 'json',
            contentType: 'application/json',
            success: function (res) {
                data.id=res.data.insertId;
                data.start_date =  moment(data.start_date*1000).format('YYYY-MM-DD HH:mm');
                data.created_at =  moment(data.created_at*1000).format('YYYY-MM-DD HH:mm');
                callback(data);
            }
        });

        // 这块请求更新数据 成功回调
        // data.key =  data.id;
        // callback(data);
    },

    getCode: function(item){
        const type = this.getType();
        const admin_id = uitil.getAdminId()
        const url = `http://lv.mobu.biz/user-hw/list/${type}/${admin_id}`;
        Modal.info({
            title: '',
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
    },

    get_RType_addition: function(){
        return <Button onClick={()=>this.getCode()} >获取入口链接</Button>
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
            label: 'id',
            type: 'string',
            placeholder: '请输入id'
        },
        {
            name: 'title',
            label: '标题',
            type: 'string'
        },{
            name: 'author',
            label: '作者',
            type: 'string',
        },
        // {
        //     name: 'mobile',
        //     label: '会员手机',
        //     type: 'string',
        // },
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
            url: '/hw/travelNote/list_search',
            method:　'POST',
            data: JSON.stringify(Object.assign({
                    "admin_id":uitil.getAdminId(),
                    "pageIndex": num,
                    "type": this.getType(),
                    "limit": 10
                    }, params)),
            type: 'json',
            contentType: 'application/json',
            success: function (data) {
                let list = data.data;
                list.forEach(function(ele) {
                    ele.key = ele.id;
                    ele.start_date = moment(ele.start_date*1000).format('YYYY-MM-DD HH:mm:ss');
                    ele.created_at = moment(ele.created_at*1000).format('YYYY-MM-DD HH:mm:ss');
                });
                callback(list, {
                    total: data.pagination.total,
                    current: num,
                    pageSize: 10
                });
            }
        });
    },

    getType: function () {
        if(window.location.pathname.indexOf('share-com')>0){
            return 'share';
        }
        if(window.location.pathname.indexOf('star-com')>0){
            return 'month_star';
        }

    }

};

const Feature = FeatureSetConfig(conf);

export default Feature;
