import { useEffect, useState } from 'react';

async function getTwo() {
  let two = 99;
  two = await new Promise(res => {
    setTimeout(() => {
      res(2);
    }, 1000);
  });
  return two;
}

function App() {
  const [state, setState] = useState();

  useEffect(() => {
    setState(getTwo());
  }, [])
  
  console.log('state : ', state);
  return 'hi';
}

export default App;