
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';

const API_URL = import.meta.env.VITE_REACT_APP_API;

const Register = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassw: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
      const res = await fetch(`${API_URL}/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phoneNumber: form.phoneNumber,
          password: form.password
        })
      });

      if(!res.ok)  {
        toast.error('User Registration Failed.', {
          duration: 5000,
          position: 'top-center'
        });

      } else {
        const data = await res.json();
        console.log(data);

        toast.success('Registration Success!', {
          duration: 5000,
          position: 'top-center'
        })

        // navigate user to login
        navigate('/login');
      }

    }catch(error) {
      console.error(error);
    }
    
  }

  useEffect(() => {
    if( (form.name !== ''
    && form.email !== ''
    && form.phoneNumber !== ''
    && form.password !== ''
    && form.confirmPassw !== '') 
    && form.password === form.confirmPassw ) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [form.name, form.email, form.phoneNumber, form.password, form.confirmPassw]);

  return(
<div className="w-1/2 h-1/2 bg-indigo-100 relative py-10 p-[2rem] inset-x-1/4 inset-y-[4rem]">
  <p className="relative text-center font-gabarito font-bold text-5xl">Create Account</p>
  <form className="px-5 py-8" onSubmit={handleSubmit}>
    <div className="relative z-0 w-full mb-6 group">
        <input type="text" 
        id="floating_text" 
        name="name"
        value={form.name} 
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

    <div className="relative z-0 w-full mb-6 group">
        <input type="password" 
        id="floating_confirm_password" 
        name="confirmPassw"
        value={form.confirmPassw} 
        onChange={handleChange}
        className="font-manrope block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />

        <label htmlFor="floating_confirm_password" className="font-manrope peer-focus:font-medium absolute text-xl text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm Password</label>
    </div>
    <div className="grid md:grid-cols-2 md:gap-6">
      <div className="relative z-0 w-full mb-6 group">
          <input type="email" 
          id="floating_email" 
          name="email" 
          value={form.email} 
          onChange={handleChange}
          className="font-manrope block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />

          <label htmlFor="floating_email" className="font-manrope peer-focus:font-medium absolute text-xl text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
      </div>
      <div className="relative z-0 w-full mb-6 group">
          <input type="tel" 
          id="floating_phone_num" 
          name="phoneNumber" 
          value={form.phoneNumber} 
          onChange={handleChange}
          className="font-manrope block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />

          <label htmlFor="floating_phone_num" className="font-manrope peer-focus:font-medium absolute text-xl text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone Number</label>
      </div>
    </div>
    <div className="flex justify-between">
      { isActive ? 
      <button type="submit" className="font-manrope text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 hover:bg-teal-400 hover:underline dark:focus:ring-blue-800 h-12">Sign In</button>
      :
      <button type="submit" disabled className="font-manrope text-white bg-indigo-400 font-medium rounded-lg text-lg w-full sm:w-auto px-5 py-2.5 text-center h-12">Sign In</button> }
      <p className="font-manrope text-base py-5">Already have an account? <Link to="/login" className="text-black-500 hover:text-teal-400 underline hover:no-underline">Login</Link></p>
    </div>
  <Toaster />
  </form>
</div>
  )
}

export default Register;