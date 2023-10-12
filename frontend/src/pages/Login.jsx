import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useUser } from '../contexts/UserContext';

const API_URL = import.meta.env.VITE_REACT_APP_API;

const Login = () => {
  const { loginUser } = useUser();
  const navigate = useNavigate();
  // const [userInfo, setUserInfo] = useState('');
  const [form, setForm] = useState({
    email: '',
    password: '',
  })
  const [isActive, setIsActive] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  }

  //when user clicks sign in button
  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
      const res = await fetch(`${API_URL}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password
        })
      })

      if(!res.ok)  {
        toast.error('Wrong Email or Password.', {
          duration: 5000,
          position: 'top-center'
        });

      } else {
        const data = await res.json();
        console.log(data);

        //set user token and id
        //localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.id);
        loginUser(data);
        toast.success('Login Success!', {
          duration: 5000,
          position: 'top-center'
        })
        // navigate user to home
        navigate('/');
      }

    } catch(error) {
      console.error(error);
    }

  }

  useEffect( () => {
   return (form.email !== '' && form.password !== '') ? setIsActive(true) : setIsActive(false);
  }, [form.email, form.password]);

  return(
<div className="w-1/3 h-[26rem] bg-indigo-100 relative py-10 p-[2rem] inset-x-1/3 inset-y-[4rem]">
  <p className="relative text-center font-gabarito font-bold text-5xl">Login</p>
  <form className="px-5 py-8" onSubmit={(user) => handleSubmit(user)}>
    <div className="relative z-0 w-full mb-6 group">
          <input type="text" 
          id="floating_text" 
          name="email" 
          value={form.email}
          onChange={handleChange}
          className="font-manrope block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />

          <label htmlFor="floating_text" className="font-manrope peer-focus:font-medium absolute text-xl text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
      </div>

      <div className="relative z-0 w-full mb-6 group">
          <input type="password" 
          id="floating_password" 
          name="password" 
          value={form.password}
          onChange={handleChange}
          className="font-manrope block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />

          <label htmlFor="floating_password" className="font-manrope peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
      </div>
    { isActive ? 
    <button type="submit" className="font-manrope text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 hover:bg-teal-400 hover:underline dark:focus:ring-blue-800 h-12">Sign In</button>
    :
    <button type="submit" disabled className="font-manrope text-white bg-indigo-400 font-medium rounded-lg text-lg w-full sm:w-auto px-5 py-2.5 text-center h-12">Sign In</button> }
    <p className="font-manrope text-base py-5">Don't have an account yet? <Link to="/register" className="text-black-500 hover:text-teal-400 underline hover:no-underline">Create here</Link></p>
  </form>
  <Toaster/>
</div>
  )
}

export default Login;