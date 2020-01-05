import React,{Component} from 'react';
import PlayerController from '../PlayerController/PlayerController.js';
import logo from '../assets/logo.png';
import './ChapterContent.css';

class ChapterContent extends Component{

    constructor(props){
        super(props);
        this.state={
            chapters : null,
            verse : null,
            index:null,
            chap:null,
            play:false,
            audio:null,
            seek:false,
            muted:false,
            x: new Audio()
        }   
    }
    
    getVerse=(e)=>{
        e.preventDefault();
        let val = e.target.value;
        val++;
        this.setState({
            verse : this.state.chapters.Chapter[e.target.value],
            index:val,
            audio:'http://wordproaudio.org/bibles/app/audio/30/'+this.state.chap+'/'+val+'.mp3' ,
            play: false
        },()=>this.state.x.pause());
    }

    forward_play=()=>{
        let val = this.state.index;
        val++;
        if(val<this.state.chapters.Chapter.length){
            this.setState({
                verse : this.state.chapters.Chapter[val],
                index:val,
                audio:'http://wordproaudio.org/bibles/app/audio/30/'+this.state.chap+'/'+val+'.mp3' ,
                play: true
            },()=>{this.state.x.src=this.state.audio;this.state.x.play()});
        }
        
    }

    Backward_play=()=>{
        let val = this.state.index;
        val--;
        if(val>0){
            this.setState({
                verse : this.state.chapters.Chapter[val],
                index:val,
                audio:'http://wordproaudio.org/bibles/app/audio/30/'+this.state.chap+'/'+val+'.mp3' ,
                play: true
            },()=>{this.state.x.src=this.state.audio;this.state.x.play()});
        }
    }

    muted=()=>{
       this.setState({
           muted : !this.state.muted
       },()=>this.state.x.muted=this.state.muted);
    }

    toggleMusic=()=>{
        this.setState({
            play:!this.state.play
        },()=>{this.state.play ? this.state.x.play():this.state.x.pause();})
    }

    setVolume=(e)=>{
        this.state.x.volume=(e.target.value)/100;
    }

    seekingDown=(e)=>{
        let x=document.getElementById("slider");
        this.setState({
            seek : true
        },()=>{
            if(this.state.seek){
                let seekto = this.state.x.duration * (e.target.value / 100);
	            this.state.x.currentTime = seekto;
            }
        })
    }


    componentWillMount(){

        fetch('http://localhost:3000/bible/'+this.props.location.state.data.name).then((res)=>{
            res.json().then((data)=>{
                this.setState({
                    chapters : data[0],
                    verse : data[0].Chapter[0],
                    index:1,
                    chap:this.props.location.state.data.no,
                    audio :'http://wordproaudio.org/bibles/app/audio/30/'+this.props.location.state.data.no+'/'+'1.mp3'
                },()=>this.state.x.src=this.state.audio)
            });
        })
        
    }
    render(){
        return(
            <div className="background_2">
              {this.state.chapters!=null && 
              <div className="chapter_info">
                    <div className="container_2">
                        <img src={logo}/>
                        <p>{this.state.chapters.title}</p>
                    </div>
                    <div className="info_1">
                        <p>{this.state.chapters.title}</p>
                        <p>Release Date : Moses-1400 B.C</p>
                        <p>Number of Chapters : {this.state.chapters.Chapter.length}</p>
                        <button className="Play_Button" onClick={()=>this.toggleMusic()}>{!this.state.play? <i className="fa fa-play-circle">Play</i> :<i className="fa fa-pause-circle">Pause</i>}</button>
                    </div>
              </div>
                }
            {this.state.chapters!=null &&<p className="verse_1">{this.state.chapters.Chapter[0].Verse[0].Verse}</p>}
            {this.state.chapters!=null &&  <div className="chapter_1">
                <p>Select the Chapter to Read</p>
                <select onChange={(e)=>this.getVerse(e)} className="chapter_options">
                {this.state.chapters.Chapter.map((data,index)=>
                    <option className="option" key={index} value={index} >அத்தியாயம் {index+1}</option>
                    )}
                </select>
            </div>}
            
            {this.state.verse!=null && this.state.chapters!=null &&
            <div className="verse_2">
                <p>#{this.state.chapters.title} / அத்தியாயம் {this.state.index}</p>
                <div className="verse_1">
                {this.state.verse.Verse.map((data,index)=>
                    <p key={index}>{index+1}. {data.Verse}</p>)}
                </div>
             </div>}
             {this.state.chapters!=null && <PlayerController 
                isplay={this.state.play}
                Muted={this.state.muted}
                muted={this.muted}
                seeking={this.seeking}
                setVolume={this.setVolume}
                playMusic={this.toggleMusic}
                forward={this.forward_play}
                backward={this.Backward_play}
                />}
            </div>
        )
    }
}

export default ChapterContent;