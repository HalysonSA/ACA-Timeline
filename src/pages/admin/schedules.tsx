import Footer from '@/components/home/footer/footer';
import Navbar from '@/components/home/navbar/navbar';
import { checkUserState } from '@/redux/userSlice';
import { User } from '@/types/users';
import cookie from 'cookie';
import { useDispatch } from 'react-redux';
import { supabase } from '@/lib/supabaseClient';
import { useEffect, useState } from 'react';
import { MdAdd, MdArrowBack } from 'react-icons/md';
import moment from 'moment';

export default function AdminPageSchedules({
  userCookie,
}: {
  userCookie: User;
}) {
  const dispatch = useDispatch();

  dispatch(checkUserState(userCookie));

  const [schedules, setSchedules] = useState([]);
  var counter = 0;

  type Schedule = {
    user: {
      name: string;
    };
    service: {
      title: string;
      price: number;
    };
    date: string;
    time: string;
    status: string;
  };

  useEffect(() => {
    const getSchedules = async () => {
      const { data, error } = await supabase
        .from('schedules')
        .select(
          `user: user_id (name, phone_number, email), service: service_id (title, price) , date, time,  status`
        );
      if (error) {
        return (
          <div className="flex flex-col items-center justify-center w-full h-full">
            <h1 className="text-2xl font-bold text-white">
              Erro ao carregar os agendamentos
            </h1>
          </div>
        );
      } else {
        //@ts-ignore
        setSchedules(data);
      }
    };
    getSchedules();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-cyan-600 ">
      <Navbar />
      <div className="flex flex-col items-center justify-center overflow-x-auto ">
        <div className="flex flex-col items-start justify-start">
          <div className="flex flex-row items-center justify-between w-full mb-2">
            <h1 className="text-2xl font-bold text-white">Agendamentos</h1>
          </div>
          {
            // If there are no schedules, show a message
            schedules.length == 0 ? (
              <div className="flex flex-col items-center justify-center w-full h-full">
                <h1 className="text-2xl font-bold text-white">
                  Nenhum agendamento encontrado
                </h1>
              </div>
            ) : (
              <table className="table-admin">
                <thead>
                  <tr>
                    <th>Cliente</th>
                    <th>Data</th>
                    <th>Horario</th>
                    <th>Serviço</th>
                    <th>Preço</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {schedules.map((schedule: Schedule) => {
                    counter++;

                    return (
                      <tr key={counter}>
                        <td>{schedule.user.name}</td>
                        <td>{moment(schedule.date).format('DD/MM/YYYY')}</td>
                        <td>{schedule.time}</td>
                        <td>{schedule.service.title}</td>
                        <td>{schedule.service.price}</td>
                        <td>{schedule.status}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )
          }

          <div className="flex flex-row justify-between w-full mt-6">
            <a
              href="./"
              className="flex flex-row gap-2 p-2 font-medium text-white rounded-lg bg-cyan-800"
            >
              <MdArrowBack size={24} />
              Voltar
            </a>
            <a
              href="/admin/customers/create"
              className="flex flex-row gap-2 p-2 font-medium text-white rounded-lg bg-cyan-800"
            >
              <MdAdd size={24} /> Adicionar
            </a>
          </div>
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
