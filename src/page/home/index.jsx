import React from 'react'
import {Link} from 'react-router-dom'
import staticServer from 'server/static-server.jsx'
const _staticServer=new staticServer();
import Muitl from 'util/util.jsx'
const _util=new Muitl();


import './index.scss'
import PageTitle from 'component/page-title/index.jsx'
class Home extends React.Component{
    constructor(props){
        super(props);
        this.state={
           userCount:"-",
           productCount:"-",
           orderCount:"-"
        }
    }
    componentDidMount(){
        this.loadData();
    }
    loadData(){
        _staticServer.baseCount().then(res=>{
            this.setState(res)
        }).catch(err=>{
            _util.errorTips(err)
        })
    }
    render(){
        return (<div id="page-wrapper">
           <PageTitle title="首页" />
               <div className="row">
                    <div className="col-md-4">
                        <Link to="/user" className="color-box brown">
                            <p className="count">{this.state.userCount}</p>
                            <div className="desc">
                                <i className="fa fa-user-o"></i>
                                <span>用户总数</span>
                            </div>
                        </Link>
                    </div>
                    <div className="col-md-4">
                         <Link to="/product" className="color-box green">
                            <p className="count">{this.state.productCount}</p>
                            <div className="desc">
                                <i className="fa fa-list"></i>
                                <span>商品总数</span>
                            </div>
                        </Link>
                    </div>
                    <div className="col-md-4">
                        <Link to="/order" className="color-box blue">
                            <p className="count">{this.state.orderCount}</p>
                            <div className="desc">
                                <i className="fa fa-check-square-o"></i>
                                <span>订单总数</span>
                            </div>
                        </Link>
                    </div>
               </div>
        </div>)
    }
}
export default Home;