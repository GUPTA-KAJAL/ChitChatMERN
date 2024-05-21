import './App.css';
import {createBrowserRouter,RouterProvider} from "react-router-dom"
import HomePage from './components/HomePage';
import Signup from './components/Signup';
import Login from './components/Login';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import io from "socket.io-client";
import { setSocket } from './redux/socketSlice';
import { setOnlineUsers } from './redux/userSlice';

const router=createBrowserRouter([
  {
    path:"/",
    element:<HomePage/>
  },
  {
    path:"/register",
    element:<Signup/>
  },
  {
    path:"/login",
    element:<Login/>
  },

])
function App() {
  const {authUser}=useSelector(store=>store.user)
  const {socket} = useSelector(store=>store.socket);
  const dispatch = useDispatch();
  useEffect(()=>{
    if(authUser){
      const socket=io("http://localhost:8080" ,{
        query:{
          userId:authUser._id
        }
      })
      dispatch(setSocket(socket));
      // piche backend se humne emit use kia tha data bhjne ko toh hum usse recieve kar rhe h
      socket.on('getOnlineUsers', (onlineUsers)=>{
        dispatch(setOnlineUsers(onlineUsers))
      })
      // ye cleaniup karega when u leave the app socket.close discoonect wle ko call karega socket.js file se
      return () => socket.close();
    }else{
      if(socket){
        socket.close();
        dispatch(setSocket(null));
      }
    }
  },[authUser])
  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;




