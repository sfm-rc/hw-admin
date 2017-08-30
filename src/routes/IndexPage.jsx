import React, { Componnet } from 'react';
import ReactDom from 'react-dom';

import { connect } from 'dva';
import { Link } from 'dva/router';

import config from '../config';

import Header from '../components/header/Header';
import Sider from '../components/sider/Sider';
import Main from '../components/main/Main';

import Login from '../components/login/Login';
import {Layout} from 'antd';

//const components = config.main.components;
const headerInfo = {
    ...config.header,
    name: config.userInfo.name,
    aver: config.userInfo.aver
}

const siderInfo = { ...config.sider };

const mainInfo = {
    style: config.sider.style
}

const IndexInfo = {
    permission: config.userInfo.permission,
    loginUrl: config.userInfo.loginUrl
}


class App extends React.Component{
    constructor(props){
        super(props);
    }

    state = {
        collapsed: false,
    };

    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({ collapsed });
    }

    render(){
        const {props} = this;
        let featureId = props.params.FeatureId || config.sider.selectedKey;

        let featureInfo = {
            featureId: featureId,
            params: props.params.params,

            feature: config.main.components[featureId].component,
            title: config.main.components[featureId].title,
        }
        
        if(IndexInfo.permission){
            return  <Layout style={{minHeight: '100%'}}>
                        <Layout.Header>
                            <Header {...headerInfo}/>
                        </Layout.Header>
                        <Layout>
                            <Layout.Sider collapsible
                                        collapsed={this.state.collapsed}
                                        onCollapse={this.onCollapse}>
                                <Sider {...siderInfo} selectedKey={featureId}/>
                            </Layout.Sider>
                            <Layout>
                                <Layout.Content>
                                    <Main {...mainInfo} {...featureInfo}/>
                                </Layout.Content>       
                                <Layout.Footer style={{ textAlign: 'center' }}>
                                    Outdoor cloud platform ©2017 Created 魔步户外
                                </Layout.Footer>  
                            </Layout>   
                        </Layout>
                    </Layout>
        }else{
            return  <div className="nopermission">
                        <Login loginUrl={IndexInfo.loginUrl}/>
                    </div>
        }

    }


}

const App1 = (props) => {

        let featureId = props.params.FeatureId || config.sider.selectedKey;

        let featureInfo = {
            featureId: featureId,
            params: props.params.params,

            feature: config.main.components[featureId].component,
            title: config.main.components[featureId].title,
        }
        
        if(IndexInfo.permission){
            return  <Layout>
                        <Layout.Header>
                            <Header {...headerInfo}/>
                        </Layout.Header>
                        <Layout>
                            <Layout.Sider collapsible
                                        collapsed={this.state.collapsed}
                                        onCollapse={this.onCollapse}>
                                <Sider {...siderInfo} selectedKey={featureId}/>
                            </Layout.Sider>
                            <Layout.Content>
                                <Main {...mainInfo} {...featureInfo}/>
                            </Layout.Content>
                            
                        </Layout>
                    </Layout>
        }else{
            return  <div className="nopermission">
                        <Login loginUrl={IndexInfo.loginUrl}/>
                    </div>
        }
}

export default App;
