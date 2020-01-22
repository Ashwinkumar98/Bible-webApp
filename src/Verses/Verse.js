import React from 'react';
import './Verse.css';

const Verse=(props)=>{
    return(<div>
        {props.verse!=null && props.chapters!=null &&
            <div className="verse_2">
                <p>#{props.chapters.title} / அத்தியாயம் {props.index}</p>
                <div className="verse_1">
                {props.verse.Verse.map((data,index)=>
                    <div id="modal" key={index} onClick={(e)=>props.getVerse(e,data,index)}><p>{index+1}. {data.Verse}</p></div>
                    )}
                </div>
             </div>}
    </div>)
}

export default Verse;