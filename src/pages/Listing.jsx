import React from 'react'
import { useState } from 'react'
import { useFirebase } from '../context/firebase';
import { useNavigate } from 'react-router';

const Listing = () => {

  const firebase = useFirebase();

  const [price, setPrice] = useState('');
  const [ISBN, setISBN] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [desc, setDesc] = useState('');


  return (
    <div className='bg-slate-700 text-white flex flex-col gap-5 min-h-screen'>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <input
        type="text"
        placeholder="ISBN"
        value={ISBN}
        onChange={(e) => setISBN(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      <button onClick={async () => {
        const res = await firebase.HandleListing(title, author, price, ISBN, desc);
        console.log(res);
      }}>Submit</button>
    </div>
  )
}

export default Listing