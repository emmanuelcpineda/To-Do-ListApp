import { Link } from 'react-router-dom';
import { useState } from 'react'

const Navbar = () => {
  const [active, setActive] = useState("");

  return(
    <nav className="bg-sky-400 p-4 text-xl">
      <div className="container mx-auto flex justify-between items-center font-gabarito">
        <Link to="/" className="flex items-center gap-2 text-white text-2xl font-semibold"
        onClick={() => { setActive("");
        window.scrollTo(0, 0);
        }}>
          <img width="66" height="66" src="https://img.icons8.com/external-smashingstocks-flat-smashing-stocks/66/external-Notes-writing-and-translation-services-smashingstocks-flat-smashing-stocks.png" className="w-9 h-9 object-contain" />
          <p className="text-white text-[18px] font-bold cursor-pointer"><span className="sm:block hidden">To-Do List App</span></p>
        </Link>
        <ul className="flex space-x-4">
          <li>
            <a href="/" className="text-white hover:text-gray-200">Home</a>
          </li>
          <li>
            <a href="/login" className="text-white hover:text-gray-200">Login</a>
          </li>
          <li>
            <a href="/register" className="text-white hover:text-gray-200">Register</a>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar;