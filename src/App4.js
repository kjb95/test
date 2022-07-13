import { useCallback, useState } from 'react';
import Box from './components/Box';

function App(){
  const [size, setSize] = useState(100);
  const [isDark, setIsDark] = useState(false);

  const createBoxStyle = useCallback(() => {
    return {
      backgroundColor: 'pink',
      width: `${size}px`,
      height: `${size}px`
    }
  }, [size]);

  return <div style={{
    background: isDark ? 'black' : 'white'
  }}>
    <input 
      type='number'
      value={size}
      onChange={event => setSize(event.target.value)}
     />
     <button onClick={() => {
      setIsDark(!isDark)
     }}>
      Chage Theme
     </button>
     <Box createBoxStyle={createBoxStyle}/>
    
  </div>
}

export default App;