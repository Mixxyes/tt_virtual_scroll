import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PostList } from './components/postList';
import { PostPage } from './components/postPage';

import './scss/app.scss';

function App() {
  return (
    <div className="App">
      <div className="content">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<PostList />} />
            <Route path="/post/:id" element={<PostPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
