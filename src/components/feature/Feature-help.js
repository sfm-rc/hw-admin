
import { Collapse } from 'antd';
const Panel = Collapse.Panel;
import React from 'react';

function callback(key) {
    console.log(key);
}

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

export default (props) =>
    <Collapse onChange={callback}>
        <Panel header={'平台功能说明'} key="1">
            <p>{text}</p>
        </Panel>
        <Panel header={'俱乐部职责'} key="2">
            <p>{text}</p>
        </Panel>
        <Panel header={'活动管理'} key="3">
            <p>{text}</p>
        </Panel>
        <Panel header={'活动报名'} key="4">
            <p>{text}</p>
        </Panel>
        <Panel header={'游记分享'} key="5">
            <p>{text}</p>
        </Panel>
        <Panel header={'个人中心'} key="6">
            <p>{text}</p>
        </Panel>
    </Collapse>;