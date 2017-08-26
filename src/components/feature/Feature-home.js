import React from 'react'



import { Carousel } from 'antd';

export default (props) =>
    <div style={{width: '60%', margin: '0 auto'}}>
        <Carousel autoplay >
            <div>
                <img alt="example" width="100%" src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3656305013,1915597708&fm=26&gp=0.jpg" />
            </div>
            <div>
                <img alt="example" width="100%" src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=295786079,222437363&fm=26&gp=0.jpg" />
            </div>

            <div>
                <img alt="example" width="100%" src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1692143553,1844869234&fm=26&gp=0.jpg" />
            </div>

            <div>
                <img alt="example" width="100%" src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1318027460,1583375633&fm=26&gp=0.jpg" />
            </div>

        </Carousel>
    </div>
