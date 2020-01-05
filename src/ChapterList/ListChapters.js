import React,{Component} from 'react';
import logo from '../assets/logo.png';
import './ListChapter.css';
class ListChapter extends Component{
    constructor(props){
        super(props);
        this.state={
            HeadingList : null,
            chapter : null
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

        this.props.history.push(pageType)
       
    }

    componentWillMount(){
        fetch('http://localhost:3000/bible/').then((res)=>{
            res.json().then((data)=>{
                this.setState({
                    HeadingList : data
                })
            })
        })  
    }
    render(){
        return(
        <div >
            <h2 className="heading_1">Holy Bible</h2>
            <div className="box_1">
                {this.state.HeadingList!=null && this.state.HeadingList.map((data)=>
                    <div onClick={(e)=>this.getChapters(e,data.name,data._id)} key={data._id} className="container">
                        <img src={logo}/>
                        <p>{data.name}</p>
                    </div>
                )}
            </div>
        </div>)
        
    }
}

export default ListChapter;