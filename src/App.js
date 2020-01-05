import React from 'react';
import ListChapter from './ChapterList/ListChapters.js';
import ChapterContent from './ChapterContent/ChapterContent.js';
import {BrowserRouter as Router,Route,Redirect,Switch} from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
    <div className="background">
      <Switch>
         <Route path="/contents" component={ListChapter}/>
         <Route path="/chapter" component = {ChapterContent}/>
      </Switch>
    </div>
  </Router>
  );
}

export default App;
