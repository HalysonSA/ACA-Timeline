import Footer from '@/components/home/footer/footer';
import Navbar from '@/components/home/navbar/navbar';
import { checkUserState } from '@/redux/userSlice';
import { User } from '@/types/users';
import cookie from 'cookie';
import { useDispatch } from 'react-redux';
import { BiArrowToRight } from 'react-icons/bi';
import { BsFillCalendarWeekFill } from 'react-icons/bs';
import { MdWork } from 'react-icons/md';
import { FaUserFriends } from 'react-icons/fa';
import Link from 'next/link';

export default function AdminPage({ userCookie }: { userCookie: User }) {
  const dispatch = useDispatch();

  dispatch(checkUserState(userCookie));

  return (
    <div className="flex flex-col min-h-screen bg-cyan-600 ">
      <Navbar />
      <div className="flex items-center justify-center ">
        <div className="flex flex-row flex-wrap justify-center w-11/12 gap-10 font-medium md:w-8/12 ">
          <Link href="/admin/customers" className="card-admin">
            <span className="flex flex-row items-center gap-2">
              <FaUserFriends size={24} />
              <h1 className="text-2xl">Clientes</h1>
            </span>
            <span className="flex flex-row justify-end">
              <BiArrowToRight size={30} />
            </span>
          </Link>
          <Link href="/admin/services" className="card-admin">
            <span className="flex flex-row items-center gap-2">
              <MdWork size={24} />
              <h1 className="text-2xl">Serviços</h1>
            </span>
            <span className="flex flex-row justify-end">
              <BiArrowToRight size={30} />
            </span>
          </Link>
          <Link href="/admin/schedules" className="card-admin">
            <span className="flex flex-row items-center gap-2">
              <BsFillCalendarWeekFill size={24} />
              <h1 className="text-2xl">Agendamentos</h1>
            </span>
            <span className="flex flex-row justify-end">
              <BiArrowToRight size={30} />
            </span>
          </Link>
        </div>
      </div>
      <div className="bottom-0 w-screen md:absolute">
        <Footer />
      </div>
    </div>
  );
}

export async function getServerSideProps(ctx: any) {
  if (!ctx.req.headers.cookie) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
  const parsedCookies = cookie.parse(ctx.req.headers.cookie);
  const parsedUserCookie = parsedCookies.user;

  if (!parsedUserCookie || parsedUserCookie === 'undefined') {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  const userCookie: User = JSON.parse(parsedUserCookie);

  if (userCookie.role != 'admin') {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return { props: { userCookie } };
}
