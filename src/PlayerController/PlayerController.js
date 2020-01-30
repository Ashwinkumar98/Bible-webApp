import React from 'react'; 
import './PlayerController.css';
import Media from 'react-media';

const PlayerController=(props)=>{
        return(
        <Media query="(max-width:45rem)">
            {matches=>
             matches ?  
                    <div className="mob_player_background">
                        <input onChange={(e)=>props.seekmove(e)} id="sliders" className="mob_audio_slider" type="range" min="0" max="100" defaultValue="0"  step="1" />
                        <div className="mob_audio_duration">
                            <p>{props.currTime}</p>
                            <p>{props.duration}</p>
                        </div>
                        <div className="mob_play_back_button">
                            <i onClick={props.backward} className="fa fa-step-backward"></i>
                        {!props.isplay ? <i onClick={props.playMusic} className="fa fa-play"></i> : <i onClick={props.playMusic} className="fa fa-pause"></i>}
                            <i onClick={props.forward} className="fa fa-step-forward"></i>
                        </div>
                </div>:
                <div className="player_background">
                    <div className="play_back_button">
                        <i onClick={props.backward} className="fa fa-step-backward"></i>
                    {!props.isplay ? <i onClick={props.playMusic} className="fa fa-play"></i> : <i onClick={props.playMusic} className="fa fa-pause"></i>}
                        <i onClick={props.forward} className="fa fa-step-forward"></i>
                    </div>
                    <div className="audio_1">
                    <p>{props.currTime}</p>
                        <input onChange={(e)=>props.seekmove(e)} id="sliders" className="audio_slider" type="range" min="0" max="100" defaultValue="100"  step="1" />
                    <p>{props.duration}</p>
                    </div>
                    <div className="volume">
                        {!props.Muted ? <i onClick={props.muted} className="fas fa-volume-up"></i> :  <i onClick={props.muted} className="fas fa-volume-mute"></i>}
                        <input onMouseMove={(e)=>props.setVolume(e)} type="range" min="0" defaultValue="100" max="100" step="1"></input>
                    </div>
                </div>}
        </Media>);
}

export default PlayerController;