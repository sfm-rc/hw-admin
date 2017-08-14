import React from 'react';
import { Affix, Menu, Icon, message } from 'antd';
import { Link } from 'dva/router';
import Reqwest from 'reqwest';

const HeadMenuItemCreat  = (items) => {
        return items.map(function(item){
            return  <Link key={item.key} to={'/'+item.key}>{item.title}</Link>
        });
};

function Header(props){
    function logout(){
        Reqwest({
            url: '/hw/admin/logout',
            method:　'POST',
            data: JSON.stringify({}),
            type: 'json',
            contentType: 'application/json',
            success: function (res) {
                // data.id=res.data.insertId;
                if(res.code==0){
                    message.info('退出成功');
                    setTimeout(()=>location.reload(), 1000);
                }
                else{
                    message.warn('退出异常');
                }
            }
        });

    }

    return  <div style={props.style} className="header">
                <h2 style={{color:'inherit'}}>
                    <Icon className="icon" type={props.icon} />
                    {props.title}
                </h2>
                {
                    props.menu ?
                    <div className="head-menu">
                        { 
                            HeadMenuItemCreat(props.menu)
                        }
                    </div>:
                    ""
                }
                <div className="aver">
                    <img src={props.aver} />
                    <span>{props.name}</span>
                    {
                    props.permission?
                    <a style={{marginLeft: '1rem'}} onClick={logout}>
                        退出
                    </a>
                    :
                    null
                    }
                </div>
            </div>;
};

export default Header;
