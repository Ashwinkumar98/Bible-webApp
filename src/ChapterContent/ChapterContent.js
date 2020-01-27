import React,{Component} from 'react';
import PlayerController from '../PlayerController/PlayerController.js';
import logo from '../assets/logo.png';
import SharedVerse from '../ShareVerse/ShareVerse.js';
import Error from '../Errorpage/Error.js';
import Loading from '../Loading/Loading.js';
import  Verse from '../Verses/Verse.js';
import './ChapterContent.css';
class ChapterContent extends Component{
    x = new Audio();
    constructor(props){
        super(props);
        this.state={
            chapters : null,
            verse : null,
            index:null,
            chap:null,
            shareData:null,
            err:null,
            verseNo :null,
            duration:"00:00",
            currentTime:"00:00",
            play:false,
            audio:null,
            muted:false,
            background : 'background_1'
        }  
    }
    setCurrentTime=()=>{
        let cur_min = Math.floor(this.x.currentTime/60);
        let cur_sec = Math.floor(this.x.currentTime - cur_min * 60);
        if(cur_min<10){
            cur_min="0"+cur_min;
        }
        if(cur_sec<10){
            cur_sec=cur_sec+"0";
        }
        this.setState({
            currentTime:cur_min+":"+cur_sec
        });   
    }
    setDuration=()=>{
        let dur_min = Math.floor(this.x.duration/60);
        let dur_sec = Math.floor(this.x.duration - dur_min * 60);
        if(dur_sec<10){
            dur_sec=dur_sec+"0";
        }
        if(dur_min<10){
            dur_min="0"+dur_min;
        }
        this.setState({
            duration: dur_min+":"+dur_sec
        });   
    }
    switchTrack=()=>{
        let val=this.state.index;
        val++;
       if(val>this.state.chapters.Chapter.length){
           this.setData(1,0,1);
       }else{
           this.setData(val,this.state.index,val);
       }
    }
    setData=(index,chapterToLoad,audio_pos)=>{
        this.setState({
            verse : this.state.chapters.Chapter[chapterToLoad],
            index:index,
            audio:'https://wordproaudio.org/bibles/app/audio/30/'+this.state.chap+'/'+ audio_pos +'.mp3' ,
            play: true
        },()=>{
            this.x.src=this.state.audio;
            this.x.load();
            this.x.play().then(_=>{
                this.setDuration();
                this.seekingTimeUpdate();
            }).catch(err=>{
                console.log(err);});});
    }
    getVerse=(e)=>{
        let val = e.target.value;
        let index=++val;
        this.setData(index,e.target.value,index);
    }
    forward_play=()=>{
        let val = this.state.index;
        val++;
        if(val<=this.state.chapters.Chapter.length){
            this.setData(val,this.state.index,val);
        } 
    }
    Backward_play=()=>{
        let val = this.state.index;
        val--;
        let audio_pos=val;
        if(val>=1){
           this.setData(val,--val,audio_pos);
        }
    }
    muted=()=>{
       this.setState({
           muted : !this.state.muted
       },()=>this.x.muted=this.state.muted);
    }
    toggleMusic=()=>{
        this.setState({
            play:!this.state.play,
        },()=>{this.state.play ? this.x.play() :this.x.pause();})
        this.setDuration();
        this.seekingTimeUpdate();
    }
    setVolume=(e)=>{
        this.x.volume=(e.target.value)/100;
    }
    seekmove=(e)=>{
            let seekto = this.x.duration * ( e.target.value / 100);
            if(seekto<this.x.duration){
                this.x.currentTime = seekto;
            }     
        }
    getData=(e,data,verseNo)=>{
        e.preventDefault();
        verseNo++;
        this.setState({
            shareData : data,
            verseNo:verseNo
        })
    }
    closeModal=()=>{
        this.setState({
            shareData:null,
            verseNo:null
        })
    }
    seekingTimeUpdate=()=>{
        let slider=document.getElementById("sliders");
        setInterval(()=>{
            slider.value=this.x.currentTime * (100/this.x.duration);
        },10);
    }
    componentWillMount(){
        fetch('https://tamilbible.herokuapp.com/bible/'+this.props.location.state.data.name).then((res)=>{
                    if(res.ok){
                        res.json().then((data)=>{
                            this.setState({
                                chapters : data[0],
                                verse : data[0].Chapter[0],
                                index:1,
                                chap:this.props.location.state.data.no,
                                audio :'http://wordproaudio.org/bibles/app/audio/30/'+this.props.location.state.data.no+'/'+'1.mp3',
                               
                            },()=>this.x.src=this.state.audio)
                         }); 
                    }else{
                        throw new Error('Something went wrong . Please try again after some times');
                    }
            }).catch((err)=>{
                this.setState({
                    err:err
                })
            });
         setInterval(() => {
            this.setCurrentTime();
            if(this.x.ended===true){
                this.switchTrack();
            }
        }, 10); 
    }
    componentWillUnmount(){
       this.x.pause();
    }
    render(){
        return(this. state.chapters!=null ? <div>
            <div className={this.state.shareData!=null ? this.state.background : null}>
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
              </div>}
              {this.state.chapters!=null && <div className="first_verse">
                  <p className="verse_1">{this.state.chapters.Chapter[0].Verse[0].Verse}</p><p className="verse_first_no">:-{this.props.location.state.data.name} 1:1</p></div>}
            {this.state.chapters!=null &&  <div className="chapter_1">
                <p>Select the Chapter to Read</p>
                <select onChange={(e)=>this.getVerse(e)}  className="chapter_options">
                {this.state.chapters.Chapter.map((data,index)=>
                    <option className="option" key={index} value={index} >அத்தியாயம் {++index}</option>
                    )}
                </select>
            </div>}
            <Verse verse={this.state.verse} 
                   getVerse={this.getData}
                   chapters={this.state.chapters}
                   index={this.state.index}/>
             {this.state.chapters!=null && <PlayerController 
                isplay={this.state.play}
                Muted={this.state.muted}
                muted={this.muted}
                seekmove={this.seekmove}
                currTime={this.state.currentTime}
                duration={this.state.duration}
                setVolume={this.setVolume}
                playMusic={this.toggleMusic}
                forward={this.forward_play}
                backward={this.Backward_play}
                />}
            </div>
            <div> {this.state.shareData!=null ? <SharedVerse close={this.closeModal} 
                                                            data={this.state.shareData} 
                                                            isVerse={true}
                                                            chapter={this.props.location.state.data.name} 
                                                            chapterNo={this.state.index} 
                                                            verseNo={this.state.verseNo}/> : null}</div>
</div>:this.state.err===null ? <Loading/> : <Error/>)}
}
export default ChapterContent;