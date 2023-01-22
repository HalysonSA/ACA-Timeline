import { User } from '@/types/users';
import cookie from 'cookie';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';

export default function HomePage({ userCookie }: { userCookie: User }) {
  const router = useRouter();

  const [cookies, setCookie, removeCookie] = useCookies(['user']);

  return (
    <div>
      <h1>Olá {userCookie.username}</h1>
      <button
        onClick={() => {
          removeCookie('user');
          router.push('/login');
        }}
      >
        Sair
      </button>
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

  const userCookie = JSON.parse(parsedUserCookie);

  return { props: { userCookie } };
}
