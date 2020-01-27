import React from 'react';
import {WhatsappShareButton, WhatsappIcon} from 'react-share';
import logo from '../assets/logo.png';
import './ShareVerse.css';

const Shareverse=(props)=>{
    return(<div className="modal">
       <div className="pop_buttons">
            {props.isVerse===true ?<WhatsappShareButton  url={props.data.Verse + "\n" + ":-" + props.chapter + props.chapterNo +":"+ props.verseNo +"\n"+ "https://bibleapp-front-end.herokuapp.com/"} ><WhatsappIcon size={25} round={true} logoFillColor="white"/></WhatsappShareButton>:null}
            <span onClick={props.close} className="close">&times;</span>
       </div>
        <div className="img_share_container">
            <img className="img_123" src={logo}/>
            <p>Holy Bible</p>
        </div>
        <div className="shared_verse_12">
            {props.isVerse===true ? <p>{props.data.Verse}</p> : <p>The  purpose of the app is to read bible easily in tamil with audio. Please feel free to email me with any feedback about the website</p>}
            {props.isVerse===true ? <p className="chapter_no">-: {props.chapter} {props.chapterNo}:{props.verseNo}</p> : <p className="chapter_no">rpaswin008@gmail.com</p>}
        </div>
    </div>)
}

export default Shareverse;