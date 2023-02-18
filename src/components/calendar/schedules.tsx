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
    <div className="text-center bg-cyan-700 text-white px-4 rounded-2xl  mx-2 overflow-y-scroll h-96">
      <div className="sticky top-0 bg-cyan-700">
        <h1 className="font-bold text-xl p-2 ">Agendamentos do dia </h1>

        {isWeekend}
      </div>
      {schedules.map((schedule: Scheduling) => {
        const { date, time, status } = schedule;
        const dateFormated = moment(date).format('DD/MM/YYYY');
        return (
          <div
            className={` flex justify-between flex-wrap-reverse my-2 px-10 rounded-xl  cursor-pointer
            
            ${
              status == 'available'
                ? 'bg-cyan-500 hover:bg-cyan-600'
                : 'bg-red-400 hover:bg-red-500'
            }
            bg-cyan-500  font-medium`}
            key={schedule.id}
          >
            <div className="flex flex-row gap-x-1 p-3">
              <MdTimer size={24} />
              <p>{time}</p>
            </div>
            <p className="p-3">{dateFormated}</p>
            <p className="p-3">
              {status == 'available' ? 'Disponível' : 'Reservado'}
            </p>
          </div>
        );
      })}
      {freeSchedules.map((time) => {
        return (
          <div
            className={`flex justify-between flex-wrap-reverse cursor-pointer my-2 px-10  rounded-xl ${
              isWeekend
                ? 'bg-red-400 hover:bg-red-500'
                : 'bg-cyan-500 hover:bg-cyan-600'
            }  font-medium`}
            key={time}
          >
            <div className="flex flex-row gap-x-1 p-3">
              <MdTimer size={24} />
              <p>{time}</p>
            </div>
            <p className="p-3">{date}</p>
            <p className="p-3">{isWeekend ? 'Fim de semana' : 'Disponível'}</p>
          </div>
        );
      })}
    </div>
  );
};

export default SchedulesToday;
