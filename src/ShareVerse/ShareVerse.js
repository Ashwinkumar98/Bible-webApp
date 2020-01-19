import React from 'react';
import './ShareVerse.css';

const Shareverse=(props)=>{
    return(<div className="modal">
        <p>{props.data.Verse}</p>
        <button onClick={props.close}>close</button>
    </div>)
}

export default Shareverse;