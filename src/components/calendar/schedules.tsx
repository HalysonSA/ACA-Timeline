import RootState from '@/types/reduxStates';
import { Scheduling } from '@/types/scheduling';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { MdTimer } from 'react-icons/md';
import { useCookies } from 'react-cookie';

const SchedulesToday = () => {
  const schedules = useSelector((state: RootState) => state.schedules);
  const isWeekend = useSelector((state: RootState) => state.isWeekend);
  const [cookies, setCookie] = useCookies(['date']);

  const date = moment(cookies.date).format('DD/MM/YYYY');

  const freeTimes = [
    '07:30:00',
    '08:10:00',
    '08:50:00',
    '09:30:00',
    '10:10:00',
    '10:50:00',
    '13:30:00',
    '14:10:00',
    '14:50:00',
    '15:30:00',
    '16:10:00',
    '16:50:00',
  ];

  const freeSchedules = freeTimes.filter((times) => {
    return schedules.every((schedule) => schedule.time !== times);
  });
  return (
    <div className=" text-white px-4 rounded-2xl mx-2 overflow-y-scroll max-h-[42em]">
      {schedules.map((schedule: Scheduling) => {
        const { date, time, status } = schedule;
        const dateFormated = moment(date).format('DD/MM/YYYY');
        return (
          <div
            className={` flex justify-between items-center flex-wrap-reverse px-5 my-2  h-[70px] rounded-[20px]  cursor-pointer
            
            ${status == 'available' ? 'bg-cyan-500' : 'bg-rose-600 '}
            `}
            key={schedule.id}
          >
            <div className="flex flex-row gap-x-1  text-xl font-medium">
              <MdTimer size={30} />
              <p>{time}</p>
            </div>
            <p className="">
              {status == 'available' ? 'Disponível' : 'Indisponível'}
            </p>
          </div>
        );
      })}
      {freeSchedules.map((time) => {
        return (
          <div
            className={`flex justify-between items-center flex-wrap-reverse cursor-pointer my-2 px-5  h-[70px] rounded-[20px]   ${
              isWeekend ? 'bg-rose-600 ' : 'bg-cyan-500 '
            }  `}
            key={time}
          >
            <div className="flex flex-row gap-x-1 font-medium text-xl ">
              <MdTimer size={30} />
              <p>{time}</p>
            </div>
            <p>{isWeekend ? 'Fim de semana' : 'Disponível'}</p>
          </div>
        );
      })}
    </div>
  );
};

export default SchedulesToday;
