import { supabase } from '@/lib/supabaseClient';
import { setScheduling } from '@/redux/schedulingSlice';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { GiClick } from 'react-icons/gi';
import { useDispatch } from 'react-redux';
import { Scheduling } from '@/types/scheduling';
import { useCookies } from 'react-cookie';
import { setWeekend } from '@/redux/weekendSlice';
import VerifyWeekend from '@/utils/verifyWeekend';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { setModalState } from '@/redux/modalControlsSlice';

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
    <div className="flex justify-center mx-2 overflow-auto bg-white md:mx-0 md:w-calendar min-h-calendar rounded-3xl drop-shadow-home">
      <div className="flex flex-col ">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-2 my-7">
            <button
              onClick={() => {
                if (month.id == 0) {
                  setMonth(months[11]);
                } else {
                  setMonth(months[month.id - 1]);
                }
              }}
            >
              <MdKeyboardArrowLeft size={30} className="bg-white " />
            </button>

            <h1 className="text-3xl font-bold bg-white select-none">
              {month.name}
            </h1>
            <button
              onClick={() => {
                if (month.id == 11) {
                  setMonth(months[0]);
                } else {
                  setMonth(months[month.id + 1]);
                }
              }}
            >
              <MdKeyboardArrowRight size={30} className="bg-white " />
            </button>
          </div>
          <div className="flex flex-row items-center gap-1">
            <GiClick size={24} className="rotate-30 " />
            <p className="font-light ">
              clique sobre o dia para ver os horários
            </p>
          </div>
        </div>
        <div className="grid w-full grid-cols-7 gap-6">
          {Array.from({ length: month.days }, (_, i) => i + 1).map((day) => {
            return (
              <button
                key={day}
                className="flex items-center justify-center w-12 h-12 text-3xl font-medium bg-white border border-gray-200 md:w-16 md:h-16 hover:drop-shadow-xl"
                onClick={() => {
                  getApointments(day);
                  dispatch(
                    setModalState({
                      isModalOpen: true,
                      modalType: 'scheduleSchedules',
                    })
                  );
                }}
              >
                {day}
              </button>
            );
          })}
        </div>
        <div className="flex items-center justify-center p-2">
          <p className="text-sm font-light">
            correspondente ao mês de {month.name} de {currentYear}
          </p>
        </div>
      </div>
    </div>
  );
};
export default CalendarCheck;
