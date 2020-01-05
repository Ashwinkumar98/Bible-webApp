import React,{Component} from 'react';
import './PlayerController.css';

class PlayerController extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
        <div className="player_background">
            <div className="play_back_button">
                <i onClick={this.props.backward} className="fa fa-step-backward"></i>
            {!this.props.isplay ? <i onClick={this.props.playMusic} className="fa fa-play"></i> : <i onClick={this.props.playMusic} className="fa fa-pause"></i>}
                <i onClick={this.props.forward} className="fa fa-step-forward"></i>
            </div>
            <div className="audio_1">
                <p>0.00</p>
                <input id="slider"  className="audio_slider" type="range" min="0" max="100"  step="1"
                onMouseDown={(e)=>this.props.seekDown(e)}/>
                <p>0.00</p>
            </div>
            <div className="volume">
                {!this.props.Muted ? <i onClick={this.props.muted} className="fas fa-volume-up"></i> :  <i onClick={this.props.muted} className="fas fa-volume-mute"></i>}
                <input onMouseMove={(e)=>this.props.setVolume(e)} type="range" min="0" max="100" step="1"></input>
            </div>
        </div>)
    }
}

export default PlayerController;