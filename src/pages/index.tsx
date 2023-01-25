import Footer from '@/components/home/footer/footer';
import Navbar from '@/components/home/navbar/navbar';
import { User } from '@/types/users';
import cookie from 'cookie';

export default function HomePage({ userCookie }: { userCookie: User }) {
  return (
    <div className="min-w-screen min-h-screen bg-cyan-50">
      <Navbar username={userCookie.username} />
      <Footer />
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
