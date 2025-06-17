import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { useFirebase } from '../context/firebase.jsx';

const ContentDetails = () => {
    const params = useParams();
    const firebase = useFirebase();

    const [data, setData] = useState({});

    useEffect(() => {
        firebase.HandleGetListingById(params.id).then((res) => {
            setData(res.data());
            console.log(res.data());
        });
    }, [params.id, firebase]);

    if (Object.keys(data).length === 0 || firebase.isLoggedIn === false) {
        return <div>Loading....</div>
    }


    return (
        <div className='min-h-screen w-full bg-slate-800 text-white flex flex-col gap-5 p-5'>
            <h1 className='text-2xl font-bold'>ContentDetails!</h1>
            <div className='flex flex-col gap-5'>
                <div key={data.id} className='flex flex-col gap-2 p-5 bg-slate-700 rounded-lg border transition-all duration-110 hover:bg-slate-900'>
                    <h1>{data.title}</h1>
                    <h1>{data.author}</h1>
                    <h1>{data.ISBN}</h1>
                    <h1>{data.desc}</h1>
                </div>
            </div>
        </div>
    )
}

export default ContentDetails