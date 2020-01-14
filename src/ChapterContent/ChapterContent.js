import React,{Component} from 'react';
import PlayerController from '../PlayerController/PlayerController.js';
import logo from '../assets/logo.png';
import './ChapterContent.css';
import { func } from 'C:/Users/765070/AppData/Local/Microsoft/TypeScript/3.6/node_modules/@types/prop-types/index.js';

class ChapterContent extends Component{

    constructor(props){
        super(props);
        this.state={
            chapters : null,
            verse : null,
            index:null,
            chap:null,
            duration:"00:00",
            currentTime:"00:00",
            play:false,
            audio:null,
            muted:false,
            x: new Audio()
        }   
        //this.state.x.addEventListener("timeupdate",function(){this.setDuration()});
    }
    setDuration=()=>{
        let dur_min = Math.floor(this.state.x.duration/60);
        let dur_sec = Math.floor(this.state.x.duration - dur_min * 60);
        let cur_min = Math.floor(this.state.x.currentTime/60);
        let cur_sec = Math.floor(this.state.x.currentTime - cur_min * 60);
        if(dur_sec<10){
            dur_sec=dur_sec+"0";
        }
        if(dur_min<10){
            dur_min="0"+dur_min;
        }
        if(cur_min<10){
            cur_min="0"+cur_min;
        }
        if(cur_sec<10){
            cur_sec=cur_sec+"0";
        }
        this.setState({
            duration: dur_min+":"+dur_sec,
            currentTime:cur_min+":"+cur_sec
        });   
    }

    setData=(val,audio_pos)=>{
        this.setState({
            verse : this.state.chapters.Chapter[val],
            index:val,
            audio:'http://wordproaudio.org/bibles/app/audio/30/'+this.state.chap+'/'+ audio_pos +'.mp3' ,
            play: true
        },()=>{
            this.state.x.src=this.state.audio;
            this.state.x.load();
            this.state.x.play().then(_=>{
                console.log("Playing");
                this.setDuration();
            }).catch(err=>{
                console.log(err);
            });
        });
    }
    
    getVerse=(e)=>{
        e.preventDefault();
        let val = e.target.value;
        val++;
        this.setData(val,val);
    }

    forward_play=()=>{
        let val = this.state.index;
        val++;
        let audio_pos = val+1;
        if(val<this.state.chapters.Chapter.length){
            this.setData(val,audio_pos);
        } 
    }

    Backward_play=()=>{
        let val = this.state.index;
        val--;
        let audio_pos = val+1;
        if(val>=0){
           this.setData(val,audio_pos);
        }
    }

    muted=()=>{
       this.setState({
           muted : !this.state.muted
       },()=>this.state.x.muted=this.state.muted);
    }

    toggleMusic=()=>{
        this.setState({
            play:!this.state.play,
            duration: Math.round(this.state.x.duration/60) +":"+ Math.round(this.state.x.duration- Math.round(this.state.x.duration/60)*60),
            currentTime: Math.round(this.state.x.currentTime/60) +":"+ Math.round(this.state.x.currentTime- Math.round(this.state.x.currentTime/60)*60),
        },()=>{this.state.play ? this.state.x.play() :this.state.x.pause();})
    }

    setVolume=(e)=>{
        this.state.x.volume=(e.target.value)/100;
    }

    componentWillMount(){

        fetch('http://localhost:3000/bible/'+this.props.location.state.data.name).then((res)=>{
            res.json().then((data)=>{
                this.setState({
                    chapters : data[0],
                    verse : data[0].Chapter[0],
                    index:0,
                    chap:this.props.location.state.data.no,
                    audio :'http://wordproaudio.org/bibles/app/audio/30/'+this.props.location.state.data.no+'/'+'1.mp3',
                   
                },()=>this.state.x.src=this.state.audio)
            });
        });
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
                <p>#{this.state.chapters.title} / அத்தியாயம் {this.state.index+1}</p>
                <div className="verse_1">
                {this.state.verse.Verse.map((data,index)=>
                    <p key={index}>{index+1}. {data.Verse}</p>)}
                </div>
             </div>}
             {this.state.chapters!=null && <PlayerController 
                isplay={this.state.play}
                Muted={this.state.muted}
                muted={this.muted}
                currTime={this.state.currentTime}
                duration={this.state.duration}
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