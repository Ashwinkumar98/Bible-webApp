import React from 'react';
import ListChapter from './ChapterList/ListChapters.js';
import ChapterContent from './ChapterContent/ChapterContent.js';
import  Header from './Header/Header.js';
import ShareVerse from './ShareVerse/ShareVerse.js'
import {BrowserRouter as Router,Route,Redirect,Switch} from 'react-router-dom';
import './App.css';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      isopen:false
    }
  }
  handlePopUp=()=>{
    this.setState({
      isopen : !this.state.isopen
    })
  }

  render()
  {  return (
      <Router>
      <Header handlepopup={this.handlePopUp}/>
      <div className="background">
        <Switch>
          <Route path="/contents" component={ListChapter}/>
          <Route path="/chapter" component = {ChapterContent}/>
        </Switch>
      </div>
      {this.state.isopen===true ? <ShareVerse close={this.handlePopUp} isVerse={false}/> : null}
    </Router>
    );}
}

export default App;
