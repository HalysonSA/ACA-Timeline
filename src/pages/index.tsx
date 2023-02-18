import CalendarCheck from '@/components/calendar';
import SchedulesToday from '@/components/calendar/schedules';
import Footer from '@/components/home/footer/footer';
import Navbar from '@/components/home/navbar/navbar';
import { checkUserState } from '@/redux/userSlice';
import { User } from '@/types/users';
import cookie from 'cookie';
import { useDispatch } from 'react-redux';
import BookingForm from '@/components/bookingForm';
import MySchedules from '@/components/mySchedules';

export default function HomePage({ userCookie }: { userCookie: User }) {
  const dispatch = useDispatch();

  dispatch(checkUserState(userCookie));

  return (
    <div className="min-w-screen min-h-screen bg-teal-50">
      <Navbar />
      <div className="md:min-h-screen w-screen flex flex-col  items-center">
        <div className="overflow-x-auto max-w-calendar flex flex-col gap-8 min-h-screen  w-full h-auto select-none mt-20 ">
          <CalendarCheck />
          <SchedulesToday />
          <BookingForm />
          <MySchedules />
        </div>
      </div>
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
