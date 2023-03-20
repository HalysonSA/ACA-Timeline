import Footer from '@/components/home/footer/footer';
import Navbar from '@/components/home/navbar/navbar';
import { checkUserState } from '@/redux/userSlice';
import { User } from '@/types/users';
import cookie from 'cookie';
import { useDispatch } from 'react-redux';
import { supabase } from '@/lib/supabaseClient';
import { useEffect, useState } from 'react';
import { MdAdd, MdArrowBack } from 'react-icons/md';
import formatPrice from '@/utils/formatPrice';

export default function AdminPageServices({
  userCookie,
}: {
  userCookie: User;
}) {
  const dispatch = useDispatch();

  dispatch(checkUserState(userCookie));

  const [services, setServices] = useState([]);
  var counter = 0;

  useEffect(() => {
    const getServices = async () => {
      const { data, error } = await supabase.from('services').select('*');
      if (error) {
        return (
          <div className="flex flex-col items-center justify-center w-full h-full">
            <h1 className="text-2xl font-bold text-white">
              Erro ao carregar os serviços
            </h1>
          </div>
        );
      } else {
        //@ts-ignore
        setServices(data);
      }
    };
    getServices();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-cyan-600 ">
      <Navbar />
      <div className="flex flex-col items-center justify-center overflow-x-auto ">
        <div className="flex flex-col items-start justify-start">
          <div className="flex flex-row items-center justify-between w-full mb-2">
            <h1 className="text-2xl font-bold text-white">Serviços</h1>
          </div>

          {services.length == 0 ? (
            <div className="flex flex-col items-center justify-center w-full h-full">
              <h1 className="text-2xl font-bold text-white">
                Nenhum serviço encontrado
              </h1>
            </div>
          ) : (
            <table className="table-admin">
              <thead>
                <tr>
                  <th>Titulo</th>
                  <th>Descrição</th>
                  <th>Preço</th>
                </tr>
              </thead>
              <tbody>
                {services.map(
                  (service: {
                    id?: number;
                    title: string;
                    description: string;
                    price: number;
                  }) => {
                    counter++;
                    return (
                      <tr key={service.id}>
                        <td>{service.title}</td>
                        <td>{service.description}</td>
                        <td>{formatPrice(service.price)}</td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          )}

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
