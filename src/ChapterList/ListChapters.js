import React,{Component} from 'react';
import logo from '../assets/logo.png';
import Loading from '../Loading/Loading.js';
import Error from '../Errorpage/Error.js';
import './ListChapter.css';
class ListChapter extends Component{
    constructor(props){
        super(props);
        this.state={
            HeadingList : null,
            chapter : null,
            err:null
        }
    }

    getChapters=(e,name,id)=>{
        e.preventDefault();
        let pageType = {
            pathname: '/chapter',
            state: {
                data:{
                'name' : name,
                'no' : id
                }}}

        this.props.history.push(pageType);   
    }

    componentWillMount(){
        fetch("https://tamilbible.herokuapp.com/bible/").then((res)=>{
             if(res.ok){
                res.json().then((data)=>{
                    this.setState({
                        HeadingList : data,
                        status:res.status
                    })
                });
             }else{
                 throw new Error('Something went wrong . Please try again after some times')
             }
        }).catch((err)=>{
            this.setState({
                err:err
            })
        }); 
    }
    render(){
        return(this.state.err===null ? 
        <div>
            <h2 className="heading_1">Holy Bible</h2>
            {this.state.HeadingList!=null ? <div className="box_1">
                {this.state.HeadingList!=null && this.state.HeadingList.map((data)=>
                    <div onClick={(e)=>this.getChapters(e,data.name,data._id)} key={data._id} className="container">
                        <img src={logo}/>
                        <p>{data.name}</p>
                    </div>
                )}
            </div>:<Loading/>}
        </div> : <Error/>
        )
        
    }
}

export default ListChapter;