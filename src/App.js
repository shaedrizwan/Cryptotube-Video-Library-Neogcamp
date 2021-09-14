import './App.css';
import {Routes, Route, Navigate} from "react-router-dom";
import {Home} from "./pages";
import {VideoDetails} from "./pages";
import {History} from "./pages";
import {LikedVideos} from "./pages";
import {Playlist} from "./pages";
import {WatchLater} from "./pages";
import {NavAside} from "./nav";
import {Login} from "./pages";
import {NoMatch} from "./pages";
import { useAuth } from './authContext';
import {PlaylistVideos} from "./pages"
import {Register} from './pages';
import { MobileHeader } from './components';

function App() {
  const {login} = useAuth();

  function PrivateRoute({login,path,...props}){
    return login?<Route path={path} {...props}/>:<Navigate state={{from:path}} replace to="/login"/>
  }
  return ( 
    <div className="App">
      <MobileHeader/>
      <nav>
        <NavAside/>
      </nav>
      <div className="main">
         <Routes>
           <Route end path="/" element={<Home/>}/>
           <Route path="/history" element={<History/>}/>
           <PrivateRoute path="/liked-videos" element={<LikedVideos/>} login = {login}/>
           <PrivateRoute path="/playlist" login={login} element={<Playlist/>}/>
           <PrivateRoute path="/watch-later" login={login} element={<WatchLater/>}/>
           <Route path="/video/:slug" element={<VideoDetails/>}/>
           <Route path="/login" element={<Login/>}/>
           <Route path="/register" element={<Register/>}/>
           <PrivateRoute login={login} path="/playlist/:name" element={<PlaylistVideos/>}/>
           <Route path="*" element={<NoMatch/>}/>
         </Routes>
      </div>
    </div>
  );
}

export default App;
