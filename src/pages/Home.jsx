import React, {useState, useEffect} from 'react'
import { useFirebase } from '../context/firebase.jsx';
import { useNavigate } from 'react-router';


const Home = () => {
  const firebase = useFirebase(); 
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log(data);

  useEffect(() => {

    firebase.HandleGetListing().then((res) => {
      setData(res.docs.map((doc) => {
        return {...doc.data(), id: doc.id};
      }));
      setLoading(false);
    });
  }, [firebase.isLoggedIn]);

  if(data.length === 0 || firebase.isLoggedIn === false){
    return <div>Loading....</div>
  }

  return (
    <div className='min-h-screen w-full bg-slate-800 text-white flex flex-col gap-5 p-5'>
      <h1 className='text-2xl font-bold'>Home</h1>
      <div className='flex flex-col gap-5'>
        {
          data.map((val)=>{
            return(
              <div onClick={()=>{
                navigate('/details/view/' + val.id )
              }} key={val.id} className='flex flex-col gap-2 p-5 bg-slate-700 rounded-lg border transition-all duration-110 hover:bg-slate-900'>
                <h1>{val.title}</h1>
                <h1>{val.price}</h1>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Home