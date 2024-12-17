import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [length,setLength]=useState(8);
  const [isnumber,setNumber]=useState(true);
  const [ischaracter,setCharacter]=useState(true);
  const [password,setPassword]=useState("");

  const passwordRef=useRef(null)

  const passwordGenerator=useCallback(()=>{
    let str='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let num='0123456789';
    let char='!@#$^&*+_';

    if(isnumber) str+=num;
    if(ischaracter) str+=char;

    let pwd='';
    for(let i=0;i<=length;i++){
      let random= Math.floor(Math.random()*str.length);
      pwd+=str.charAt(random);
    }

    setPassword(pwd);


  },[length,isnumber,ischaracter,setPassword])

  

  const copyToClipboard=useCallback(()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)

  },[password])

  useEffect(()=>{
    passwordGenerator()
  },[length,isnumber,ischaracter,passwordGenerator])


  

  return (
    <>
      <div className="bg-white bg-opacity-20 backdrop-blur-lg shadow-lg border border-white border-opacity-30 rounded-xl p-8 text-center w-150">
        <h1 className='text-3xl'>Password Generator</h1>
        <div className='flex mt-4 justify-center gap-4'>
          <input className='outline-none w-4/5'
          type='text'
          readOnly
          value={password}
          ref={passwordRef}
          />
          <button onClick={copyToClipboard} className='bg-blue-500 text-white cursor-pointer focus:outline-none hover:font-bold active:bg-blue-600 '>copy</button>
        </div>
        <div className='flex justify-center items-center mt-4 gap-3'>
          <input type='range' id='range' max={101} min={8} defaultValue={length} onChange={(event)=>{
            let len1=event.target.value;
            setLength(len1)
          }}/>
          <label htmlFor='range'>length:{length}</label>
          <input type='checkbox' id='number'  checked={isnumber} onChange={()=>{
            setNumber((prevState)=>!prevState)
            
          }
          }/>
          <label htmlFor='number'>Number</label>
          <input type='checkbox' id='char' checked={ischaracter} onChange={()=>{
            setCharacter((prevState)=>!prevState)
          }}/>
          <label htmlFor='char'>Characters</label>
        </div>
      </div>
    </>
  )
}

export default App
