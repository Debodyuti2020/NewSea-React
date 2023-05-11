import './App.css';

import React, {useState} from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

const App = () => {
  // c = "Debodyuti"

  const pageSize = 6;
  
  const apiKey = process.env.REACT_APP_NEWS_API;

  const [progress, setProgress] = useState(0)

  return (
    <div>
      <Router>
        <NavBar />
        <LoadingBar
          height={3}
          color='#f11946'
          progress={progress}
        />
        <Routes>
          <Route exact path="/" element={<News setProgress={setProgress} apiKey={apiKey} key='general' pageSize={pageSize} country='in' category='general' pageTitle='home' />} />
          <Route exact path="/business" element={<News setProgress={setProgress} apiKey={apiKey} key='business' pageSize={pageSize} country='in' category='business' pageTitle='business' />} />           
          <Route exact path="/entertainment" element={<News setProgress={setProgress} apiKey={apiKey} key='entertainment'pageSize={pageSize} country='in' category='entertainment' pageTitle='entertainment' />} />
          <Route exact path="/general" element={<News setProgress={setProgress} apiKey={apiKey} key='general'pageSize={pageSize} country='in' category='general' pageTitle='general' />} />
          <Route exact path="/health" element={<News setProgress={setProgress} apiKey={apiKey} key='health'pageSize={pageSize} country='in' category='health' pageTitle='health' />} />
          <Route exact path="/science" element={<News setProgress={setProgress} apiKey={apiKey} key='science'pageSize={pageSize} country='in' category='science' pageTitle='science' />} />
          <Route exact path="/sports" element={<News setProgress={setProgress} apiKey={apiKey} key='sports'pageSize={pageSize} country='in' category='sports' pageTitle='sports' />} />
          <Route exact path="/technology" element={<News setProgress={setProgress} apiKey={apiKey} key='technology'pageSize={pageSize} country='in' category='technology' pageTitle='technology' />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App;