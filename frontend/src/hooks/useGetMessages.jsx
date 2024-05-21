import  { useEffect } from 'react'
import axios from "axios"
import { useDispatch, useSelector } from 'react-redux'
import { setMessages } from '../redux/messageSlice'

const useGetMessages = () => {
    const {selectedUser}=useSelector(store=>store.user)
    const dispatch=useDispatch()
    useEffect(()=>{
        if (!selectedUser) {
            // Handle case when selectedUser is undefined
            return;
        }
        const fetchMessages =async()=>{
            try {
                axios.defaults.withCredentials=true;
                const res= await axios.get(`http://localhost:8080/api/message/${selectedUser?._id}`)
                // console.log(res);
                dispatch(setMessages(res.data))
            } catch (error) {
                console.log(error);
            }
        }
        fetchMessages();
    },[selectedUser])
}

export default useGetMessages