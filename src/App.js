import { useState,useRef } from 'react'
import './App.css'

let timer;

function App() {
  let [titreSession,setTitreSession] = useState(2)
  let [titreRepos,setTitreRepos] = useState(5)
  let [repos, setRepos] = useState(5);
  let [session, setSession] = useState(2);
  let [sec, setSec] = useState(5);
  let [play, setPlay] = useState(false)
  let afficherSession = useRef(null)
  let afficherBreak = useRef(null)
  // afficherBreak.current.style.display = 'none';
  // afficherSession.current.style.display = 'none';

  const chrono = () => {

    setSec(sec--)
    clearInterval(timer)

    timer = setInterval(() => {
      if(session>0){
        afficherBreak.current.style.display = 'none';
        afficherSession.current.style.display = 'flex';
        if (sec > 0) {
          setSec(sec--)
        }
        else {
          setSec(sec += 6)
          setSession(session -= 1)
          setSec(sec--)
        }
      }else{
        if(repos>0){
          afficherBreak.current.style.display = 'flex';
          afficherSession.current.style.display = 'none';
          if (sec > 0) {
            setSec(sec--)
          }
          else {
            setSec(sec += 6)
            setRepos(repos -= 1)
            setSec(sec--)
          }
        }
        else{
          setSession(2)
          setSec(6)
        }
      }
    }, 1000);

  }

  return (
    <div className="App">
      <div>
        <span>{titreSession + "+" + titreRepos + "Clocks"}</span>
      </div>

      <div>
        <div>
          <button onClick={() => { if (!play) if (repos > 0){setRepos(repos - 1);setTitreRepos(titreRepos-1)}}}>DecremBreak</button>
          <span>{repos}</span>
          <button onClick={() => { if (!play) if (repos < 30){setRepos(repos + 1);setTitreRepos(titreRepos+1) }}}>IncremBreak</button>
        </div>
        <div>
          <button onClick={() => { if (!play){setSession(session - 1);setTitreSession(titreSession -1)}  }}>DecremSession</button>
          <span>{session}</span>
          <button onClick={() => { if (!play){setSession(session + 1);setTitreSession(titreSession +1)} }}>IncremSession</button>
        </div>
      </div>

      <div ref={afficherSession}>
        <span>Session</span>
        <span>{session}:{sec}</span>
        <div>
          <button
            onClick={() => { setPlay(true); chrono() }}
          >Play</button>
          <button
            onClick={() => { clearInterval(timer) }}
          >
            Pause
          </button>
          <button onClick={() => {
            setRepos(5);
            setSession(25);
            setSec(59);
            clearInterval(timer)
            setPlay(false)
          }}>Actualiser</button>
        </div>
      </div>

      <div ref={afficherBreak}>
        <span>Break</span>
        <span>{repos}:{sec}</span>
        <div>
          <button
            onClick={() => { setPlay(true); chrono() }}
          >Play</button>
          <button
            onClick={() => { clearInterval(timer) }}
          >
            Pause
          </button>
          <button onClick={() => {
            setRepos(5);
            setSession(25);
            setSec(59);
            clearInterval(timer)
            setPlay(false)
          }}>Actualiser</button>
        </div>
      </div>
    </div>
  );
}

export default App;