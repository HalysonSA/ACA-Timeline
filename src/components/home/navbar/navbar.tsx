import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import { RiLogoutCircleRLine } from 'react-icons/ri';
import { FaUserCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import RootState from '@/types/reduxStates';
import Link from 'next/link';

export default function Navbar() {
  const router = useRouter();

  const user = useSelector((state: RootState) => state.user);

  const [cookies, setCookie, removeCookie] = useCookies(['user']);

  return (
    <nav className="flex flex-row justify-center w-full select-none h-28">
      <div className="flex flex-row items-center justify-between w-full px-6 text-white max-w-screen-2xl">
        <span className="flex flex-row items-center gap-4 flex-wrap">
          <FaUserCircle size={30} />
          <label className="text-xl ">
            <b>Olá,</b> {user.username}
          </label>
          {user.role === 'admin' && (
            <Link href="/admin">Página de Administração</Link>
          )}
        </span>
        <Link
          href="/login"
          onClick={() => {
            removeCookie('user');
          }}
          className="flex flex-row items-center gap-2 text-xl"
        >
          Sair
          <RiLogoutCircleRLine size={24} />
        </Link>
      </div>
    </nav>
  );
}
