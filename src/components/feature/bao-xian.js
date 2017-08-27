import { Card } from 'antd';
import React from 'react';

export default (props) =>
    <Card style={{ width: '100%' }} bodyStyle={{ padding: 0 }}>
        <div className="custom-image">
            <img alt="example" width="100%" src="http://img3.imgtn.bdimg.com/it/u=2183664321,2627742484&fm=26&gp=0.jpg" />
        </div>
        <div className="custom-card">
            <h3>Europe Street beat</h3>
            <p>www.instagram.com</p>
        </div>
    </Card>