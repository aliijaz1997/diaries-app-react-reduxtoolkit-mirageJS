import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Diaries from './diaries';
// import Editor from './editor';

function Home() {
//  const [editor, setEditor] = useState(false);
  return (
    <div >
       <Diaries />
    </div>
  );
}

export default Home;
