import React,{Component} from 'react'; 
import './PlayerController.css';
import Media from 'react-media';

class PlayerController extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
        <Media query="(max-width:45rem)">
            {matches=>
             matches ?  
                    <div className="mob_player_background">
                        <input onChange={(e)=>this.props.seekmove(e)} id="sliders" className="mob_audio_slider" type="range" min="0" max="100" defaultValue="0"  step="1" />
                        <div className="mob_audio_duration">
                            <p>{this.props.currTime}</p>
                            <p>{this.props.duration}</p>
                        </div>
                        <div className="mob_play_back_button">
                            <i onClick={this.props.backward} className="fa fa-step-backward"></i>
                        {!this.props.isplay ? <i onClick={this.props.playMusic} className="fa fa-play"></i> : <i onClick={this.props.playMusic} className="fa fa-pause"></i>}
                            <i onClick={this.props.forward} className="fa fa-step-forward"></i>
                        </div>
                </div>:
                <div className="player_background">
                    <div className="play_back_button">
                        <i onClick={this.props.backward} className="fa fa-step-backward"></i>
                    {!this.props.isplay ? <i onClick={this.props.playMusic} className="fa fa-play"></i> : <i onClick={this.props.playMusic} className="fa fa-pause"></i>}
                        <i onClick={this.props.forward} className="fa fa-step-forward"></i>
                    </div>
                    <div className="audio_1">
                    <p>{this.props.currTime}</p>
                        <input onChange={(e)=>this.props.seekmove(e)} id="sliders" className="audio_slider" type="range" min="0" max="100" defaultValue="0"  step="1" />
                    <p>{this.props.duration}</p>
                    </div>
                    <div className="volume">
                        {!this.props.Muted ? <i onClick={this.props.muted} className="fas fa-volume-up"></i> :  <i onClick={this.props.muted} className="fas fa-volume-mute"></i>}
                        <input onMouseMove={(e)=>this.props.setVolume(e)} type="range" min="0" defaultValue="100" max="100" step="1"></input>
                    </div>
                </div>}
        </Media>)}
}

export default PlayerController;