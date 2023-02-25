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

  const CalendarDay = ({ day }: { day: string }) => {
    return (
      <th
        className={`px-4 py-2 text-sm font-medium tracking-wider text-center uppercase bg-gray-100 border border-gray-200 ${
          day === 'Dom' || day === 'Sáb' ? 'text-red-500' : 'text-gray-500'
        }`}
      >
        {day}
      </th>
    );
  };

  return (
    <div className="calendar-size">
      <div className="flex flex-col w-full">
        <div className="flex flex-row items-center justify-between p-2">
          <div className="flex flex-row items-center gap-6 my-7 ">
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
          <div className="flex flex-row items-center invisible gap-2 font-light md:visible ">
            <GiClick size={20} className="rotate-30 " />
            <p>clique sobre o dia para ver os horários</p>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <CalendarDay day="Dom" />
              <CalendarDay day="Seg" />
              <CalendarDay day="Ter" />
              <CalendarDay day="Qua" />
              <CalendarDay day="Qui" />
              <CalendarDay day="Sex" />
              <CalendarDay day="Sáb" />
            </tr>
          </thead>
          <tbody>
            {month.id !== undefined && (
              <>
                {[
                  ...Array(
                    //to calculate how many rows are needed to show all days of the month,
                    //taking into account the number of days in the month and the day of the week on which the first day of the month falls.
                    Math.ceil(
                      (month.days + moment(month.name, 'MMMM').day()) / 7
                    )
                  ),
                ].map((_, rowIndex) => (
                  <tr key={rowIndex}>
                    {[...Array(7)].map((_, cellIndex) => {
                      //prettier-ignore
                      const dayOfMonth = rowIndex * 7 + cellIndex - moment(month.name, 'MMMM').day() + 1;

                      const cellIsEmpty =
                        dayOfMonth < 1 || dayOfMonth > month.days;
                      return (
                        <td
                          key={cellIndex}
                          {...(!cellIsEmpty && {
                            onClick: () => {
                              getApointments(dayOfMonth);
                              dispatch(
                                setModalState({
                                  isModalOpen: true,
                                  modalType: 'scheduleSchedules',
                                })
                              );
                            },
                          })}
                          className={`cursor-pointer  px-4 py-2 text-sm text-center hover:bg-neutral-200 text-gray-500 border border-gray-200  ${
                            cellIsEmpty ? 'bg-gray-100' : ''
                          }
                          ${
                            dayOfMonth === moment().date() &&
                            month.id === moment().month()
                              ? 'bg-orange-100'
                              : ''
                          }
                          
                          `}
                        >
                          {!cellIsEmpty && dayOfMonth}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
        <div className="flex flex-col items-center justify-center h-full p-2">
          <div className="flex flex-row gap-2 md:invisible">
            <GiClick size={24} className="rotate-30 " />
            <p>Toque sobre o dia para ver os horários</p>
          </div>
          <p className="text-sm font-light">
            correspondente ao mês de {month.name} de {currentYear}
          </p>
        </div>
      </div>
    </div>
  );
};
export default CalendarCheck;
