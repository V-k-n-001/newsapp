import './App.css';

import React, { Component } from 'react';
import NavBar from './components/NavBar';
import News  from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  pageSize=9;
  apiKey=process.env.REACT_APP_NEWS_API

  state={
    progress:0
  }
  setProgress=(progress)=>{
    this.setState({progress: progress})
  }
  render() {
    return (
      <div>
        <Router>
        <NavBar/>
        <LoadingBar
        color='#f11946'
        progress={this.state.progress}
       
      />
        <Routes>
          <Route exact path ="/"  element={<News setProgress={this.setProgress}  apiKey={this.apiKey}   key="General" pageSize={this.pageSize} country="in" category='General'/>} />
          <Route exact path ="/business" element={<News setProgress={this.setProgress}  apiKey={this.apiKey}   key="Business" pageSize={this.pageSize} country="in" category='Business'/>} />
          <Route exact path ="/entertainment" element={<News setProgress={this.setProgress}  apiKey={this.apiKey}    key="Entertainment" pageSize={this.pageSize} country="in" category='Entertainment'/>} />
          <Route exact path ="/health" element={<News setProgress={this.setProgress}  apiKey={this.apiKey}    key="Health" pageSize={this.pageSize} country="in" category='Health'/>} />
          <Route exact path ="/general" element={<News setProgress={this.setProgress}  apiKey={this.apiKey}    key="General" pageSize={this.pageSize} country="in" category='General'/>} />
          <Route exact path ="/science" element={<News setProgress={this.setProgress}  apiKey={this.apiKey}   key="Science" pageSize={this.pageSize} country="in" category='Science'/>} />
          <Route exact path ="/sports" element={<News setProgress={this.setProgress}  apiKey={this.apiKey}   key="Sports" pageSize={this.pageSize} country="in" category='Sports'/>} />
          <Route exact path ="/technology" element={<News setProgress={this.setProgress}  apiKey={this.apiKey}   key="Technology" pageSize={this.pageSize} country="in" category='Technology'/>} />
        </Routes>
        </Router>
      </div>
    );
  }
}

