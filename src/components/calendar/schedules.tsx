import RootState from '@/types/reduxStates';
import { Scheduling } from '@/types/scheduling';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { MdTimer } from 'react-icons/md';
import { useCookies } from 'react-cookie';

const SchedulesToday = () => {
  const schedules = useSelector((state: RootState) => state.schedules);
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
    <div className="text-center bg-cyan-700 text-white p-4 rounded-2xl mb-48">
      <h1 className="font-bold text-xl p-2">Agendamentos do dia </h1>
      {schedules.map((schedule: Scheduling) => {
        const { date, time, status } = schedule;
        const dateFormated = moment(date).format('DD/MM/YYYY');
        return (
          <div
            className={` flex justify-between my-2 px-10 py-4 rounded-xl 
            
            ${status == 'available' ? 'bg-cyan-500' : 'bg-red-400'}
            bg-cyan-500  font-medium`}
            key={schedule.id}
          >
            <div className="flex flex-row gap-x-1">
              <MdTimer size={24} />
              <p>{time}</p>
            </div>
            <p>{dateFormated}</p>
            <p>{status == 'available' ? 'Disponível' : 'Reservado'}</p>
          </div>
        );
      })}
      {freeSchedules.map((time) => {
        return (
          <div
            className="flex justify-between my-2 px-10 py-4 rounded-xl bg-cyan-500  font-medium"
            key={time}
          >
            <div className="flex flex-row gap-x-1">
              <MdTimer size={24} />
              <p>{time}</p>
            </div>
            <p>{date}</p>
            <p>Disponível</p>
          </div>
        );
      })}
    </div>
  );
};

export default SchedulesToday;
