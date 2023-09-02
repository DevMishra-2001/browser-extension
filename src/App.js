import './App.css';
import {images} from './db/image.js'
import {Home} from "./pages/Home/Home.js"
import {Task} from "./pages/Task/Task.js"
import { useBrowser } from './context/browser-context';
import {useEffect} from "react"

const indx = Math.floor(Math.random()*images.length)
const bgImg = images[indx].image

function App() {
  
  const {name,browserDispatch} = useBrowser();
  useEffect ( () => {
     const userName = localStorage.getItem('name')
     browserDispatch({
      type : "NAME",
      payload : userName
     })
  },[])
  return (
    <div className="app" style={{backgroundImage: `url("${bgImg}")`}}>
     {name ? <Task/> : <Home/>}
    </div>
  );
}

export default App;
