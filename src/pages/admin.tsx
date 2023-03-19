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

export default function AdminPage({ userCookie }: { userCookie: User }) {
  const dispatch = useDispatch();

  dispatch(checkUserState(userCookie));

  return (
    <div className="flex flex-col bg-cyan-600 min-h-screen ">
      <Navbar />
      <div className="flex items-center justify-center ">
        <div className="flex flex-row flex-wrap gap-10  w-11/12 md:w-8/12 justify-center font-medium  ">
          <div className="card-admin">
            <span className="flex flex-row items-center gap-2">
              <FaUserFriends size={24} />
              <h1 className="text-2xl">Clientes</h1>
            </span>
            <span className="flex flex-row justify-end">
              <BiArrowToRight size={30} />
            </span>
          </div>
          <div className="card-admin">
            <span className="flex flex-row items-center gap-2">
              <MdWork size={24} />
              <h1 className="text-2xl">Serviços</h1>
            </span>
            <span className="flex flex-row justify-end">
              <BiArrowToRight size={30} />
            </span>
          </div>
          <div className="card-admin">
            <span className="flex flex-row items-center gap-2">
              <BsFillCalendarWeekFill size={24} />
              <h1 className="text-2xl">Agendamentos</h1>
            </span>
            <span className="flex flex-row justify-end">
              <BiArrowToRight size={30} />
            </span>
          </div>
        </div>
      </div>
      <div className="md:absolute bottom-0 w-screen">
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
