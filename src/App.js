import { useState,useRef } from 'react'
import './App.css'
import north from './images/north.svg'
import south from './images/south.svg'
import pause from './images/pause.svg'
import playIcon from './images/play.svg'
import refresh from './images/refresh.svg'

let timer;

function App() {
  let [titreSession,setTitreSession] = useState(25)
  let [titreRepos,setTitreRepos] = useState(5)
  let [repos, setRepos] = useState(5);
  let [session, setSession] = useState(25);
  let [sec, setSec] = useState(59);
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
          setSec(sec += 59)
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
            setSec(sec += 59)
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
          <button onClick={() => { if (!play) if (repos > 0){setRepos(repos - 1);setTitreRepos(titreRepos-1)}}}>
            <img alt="" src={south} width={50} />
          </button>
          {/* <img alt="" src={north} width={50} onClick={()=>console.log('On veur incrementer')}  /> */}
          <span>{repos}</span>
          <button onClick={() => { if (!play) if (repos < 30){setRepos(repos + 1);setTitreRepos(titreRepos+1) }}}>
            <img alt="" src={north} width={50} />
          </button>
        </div>
        <div>
          <button onClick={() => { if (!play){setSession(session - 1);setTitreSession(titreSession -1)}  }}>
          <img alt="" src={south} width={50} />
          </button>
          <span>{session}</span>
          <button onClick={() => { if (!play){setSession(session + 1);setTitreSession(titreSession +1)} }}>
          <img alt="" src={north} width={50} />
          </button>
        </div>
      </div>

      <div ref={afficherSession}>
        <span>Session</span>
        <span>{session}:{sec}</span>
        <div>
          <button onClick={() => { setPlay(true); chrono() }}>
          <img alt="" src={playIcon} width={50} />
          </button>
          <button onClick={() => { clearInterval(timer) }}>
          <img alt="" src={pause} width={50} />
          </button>
          <button onClick={() => {
            setTitreRepos(5)
            setTitreSession(25)
            setRepos(5);
            setSession(25);
            setSec(59);
            clearInterval(timer)
            setPlay(false)
          }}>
            <img alt="" src={refresh} width={50} />
          </button>
        </div>
      </div>

      <div ref={afficherBreak}>
        <span>Break</span>
        <span>{repos}:{sec}</span>
        <div>
          <button
            onClick={() => { setPlay(true); chrono() }}
          >
            <img alt="" src={playIcon} width={50} />
          </button>
          <button
            onClick={() => { clearInterval(timer) }}
          >
            <img alt="" src={pause} width={50} />
          </button>
          <button onClick={() => {
            setTitreRepos(5)
            setTitreSession(25)
            setRepos(5);
            setSession(25);
            setSec(59);
            clearInterval(timer)
            setPlay(false)
          }}><img alt="" src={refresh} width={50} /></button>
        </div>
      </div>
    </div>
  );
}

export default App;