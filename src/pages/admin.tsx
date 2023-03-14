import Footer from '@/components/home/footer/footer';
import Navbar from '@/components/home/navbar/navbar';
import { checkUserState } from '@/redux/userSlice';
import { User } from '@/types/users';
import cookie from 'cookie';
import { useDispatch } from 'react-redux';
import { supabase } from '@/lib/supabaseClient';
import { useEffect, useState } from 'react';

export default function AdminPage({ userCookie }: { userCookie: User }) {
  const dispatch = useDispatch();

  dispatch(checkUserState(userCookie));

  interface ISchedule {
    time: string;
    status: string;
    user: {
      name: string;
      email: string;
    };
    service: {
      title: string;
      price: number;
    };
  }

  const [schedules, setSchedules] = useState<ISchedule[]>([]);

  useEffect(() => {
    const handleSchedules = async () => {
      const response = await supabase
        .from('schedules')
        .select(
          `time,
          status,
          user:user_id (name, email),
          service:service_id (title, price)
          `
        )
        .eq('date', `${new Date().toISOString().split('T')[0]}`);

      response.data && setSchedules(response.data);
    };
    handleSchedules();
  }, []);

  return (
    <div className="flex flex-col bg-cyan-600 min-h-[100vh] ">
      <Navbar />
      <div className="md:w-11/12">
        <table>
          <tbody>
            <th>
              <td>Horário</td>
              <td>Cliente</td>
              <td>Serviço</td>
              <td>Preço</td>
              <td>Status</td>
            </th>
            {schedules.map((schedule: ISchedule) => {
              return (
                <tr key={schedule.time}>
                  <td>{schedule.time}</td>
                  <td>{schedule.user.name}</td>
                  <td>{schedule.service.title}</td>
                  <td>{schedule.service.price}</td>
                  <td>{schedule.status}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="flex flex-col items-center justify-center"></div>
      </div>
      <div className="flex absolute bottom-0 w-full">
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
