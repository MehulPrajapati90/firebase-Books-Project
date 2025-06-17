import React, { useEffect } from 'react';
import { useFirebase } from '../context/firebase.jsx';
import { useNavigate } from 'react-router';

const Signup = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  
  const navigate = useNavigate();
  const fireBase = useFirebase();
  console.log(fireBase);


  useEffect(() => {
    if (fireBase.isLoggedIn) {
      navigate('/');
    }
  }, [fireBase, navigate]);


  return (
    <div>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={async () => {
        const res = await fireBase.SignupWithEmailandpassword(email, password);
        console.log(res);
      }}>Submit</button>
    </div>
  )
}

export default Signup