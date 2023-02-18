import { supabase } from '@/lib/supabaseClient';
import { setScheduling } from '@/redux/schedulingSlice';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { FiArrowRight, FiArrowLeft } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { Scheduling } from '@/types/scheduling';
import { useCookies } from 'react-cookie';
import { setWeekend } from '@/redux/weekendSlice';
import VerifyWeekend from '@/utils/verifyWeekend';

interface Month {
  id: number;
  name: string;
  days: number;
}

const CalendarCheck = () => {
  moment.updateLocale('pt-br', {
    monthsShort: 'Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez'.split('_'),
    weekdaysShort: 'Dom_Seg_Ter_Qua_Qui_Sex_Sáb'.split('_'),
  });

  const dispatch = useDispatch();

  const [month, setMonth] = useState<Month>({} as Month);
  const [cookies, setCookie] = useCookies(['date']);

  const currentMonth = moment().month();
  const currentYear = moment().year();

  const months = [
    { id: 0, name: 'Janeiro', days: 31 },
    { id: 1, name: 'Fevereiro', days: 28 },
    { id: 2, name: 'Março', days: 31 },
    { id: 3, name: 'Abril', days: 30 },
    { id: 4, name: 'Maio', days: 31 },
    { id: 5, name: 'Junho', days: 30 },
    { id: 6, name: 'Julho', days: 31 },
    { id: 7, name: 'Agosto', days: 31 },
    { id: 8, name: 'Setembro', days: 30 },
    { id: 9, name: 'Outubro', days: 31 },
    { id: 10, name: 'Novembro', days: 30 },
    { id: 11, name: 'Dezembro', days: 31 },
  ];

  useEffect(() => {
    setMonth(months[currentMonth]);
  }, []);

  async function getApointments(day: number) {
    const realMonth = month.id + 1; //turns the month id into a real number

    var date = currentYear + '-' + realMonth + '-' + day;

    if (realMonth.toString().length === 1) {
      date = currentYear + '-0' + realMonth + '-' + day;
    }
    setCookie('date', date, { path: '/' });

    VerifyWeekend(date)
      ? dispatch(setWeekend(true))
      : dispatch(setWeekend(false));

    const {
      data,
      error,
    }: {
      data: Scheduling[] | null;
      error: any;
    } = await supabase.from('schedules').select().eq('date', date);

    dispatch(setScheduling(data));
  }

  return (
    <div className=" flex flex-col gap-5 p-2 bg-cyan-700 rounded-md mx-2">
      <div className="flex flex-col gap-3 text-gray-800">
        <h1 className="text-2xl  font-bold bg-cyan-900 p-2 text-white text-center">
          {month.name}
        </h1>
        <div className="grid grid-cols-7 gap-2 w-full ">
          {Array.from({ length: month.days }, (_, i) => i + 1).map((day) => {
            return (
              <button
                key={day}
                className="bg-white font-bold  flex justify-center rounded-md p-2 hover:bg-neutral-200"
                onClick={() => {
                  getApointments(day);
                }}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>
      <div className="flex flex-row items-center justify-between full">
        {month.id <= currentMonth ? null : (
          <button
            className="btn-calendar"
            onClick={() => {
              setMonth(months[month.id - 1]);
            }}
          >
            <FiArrowLeft />
            <p>Anterior</p>
          </button>
        )}
        {month.id === 11 ? null : (
          <button
            className="btn-calendar"
            onClick={() => {
              setMonth(months[month.id + 1]);
            }}
          >
            <p>Próximo</p>
            <FiArrowRight />
          </button>
        )}
      </div>
    </div>
  );
};
export default CalendarCheck;
