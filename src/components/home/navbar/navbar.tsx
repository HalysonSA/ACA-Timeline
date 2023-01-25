import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import { RiLogoutCircleRLine } from 'react-icons/ri';
import { FaUserCircle } from 'react-icons/fa';
export default function Navbar(username: { username: string }) {
  const router = useRouter();

  const [cookies, setCookie, removeCookie] = useCookies(['user']);

  return (
    <nav className="h-28 w-full">
      <div className="h-7 w-full bg-cyan-600"></div>
      <div className="h-16 w-full bg-cyan-800 flex flex-col justify-center items-center ">
        <div className="flex flex-row items-center justify-between  text-white min-w-min max-w-7xl">
          <span className="flex flex-row gap-2">
            <FaUserCircle size={24} />
            <label>
              <b>Olá,</b> {username.username}
            </label>
          </span>
          <button
            onClick={() => {
              removeCookie('user');
              router.push('/login');
            }}
            className="outline-none flex flex-row gap-x-2"
          >
            Sair
            <RiLogoutCircleRLine size={24} />
          </button>
        </div>
      </div>
      <div className="h-3 w-full bg-cyan-700 rounded-b-lg"></div>
    </nav>
  );
}
