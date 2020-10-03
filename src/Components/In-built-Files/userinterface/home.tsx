import React from 'react';
import Diaries from './diaries';
import Editor from './editor';function Home() {
  return (
    <div className="App">
      <Editor/>
       <Diaries/>
    </div>
  );
}

export default Home;
