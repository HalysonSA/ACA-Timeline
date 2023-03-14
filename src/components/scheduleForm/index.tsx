import { supabase } from '@/lib/supabaseClient';
import { useSelector } from 'react-redux';
import RootState from '@/types/reduxStates';
import moment from 'moment';
import VerifyWeekend from '@/utils/verifyWeekend';
import VerifySchedules from '@/utils/verifySchedules';

import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';

type Service = {
  id: string;
  title: string;
};

export default function ScheduleForm() {
  const user = useSelector((state: RootState) => state.user);

  const [selectedHour, setSelectedHour] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [toggle, setToggle] = useState<string>('');
  const [servicesData, setServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState<Service>();

  const hours = [
    '07:30',
    '08:10',
    '08:50',
    '09:30',
    '10:10',
    '10:50',
    '13:30',
    '14:10',
    '14:50',
    '15:30',
    '16:10',
    '16:50',
  ];

  async function searchServices() {
    const { data, error } = await supabase.from('services').select('title, id');
    if (error) {
      toast.error('Ocorreu um erro ao buscar os serviços');
    }

    if (data) {
      setServices(
        data.map((service) => {
          return {
            id: service.id,
            title: service.title,
          };
        })
      );
    }
  }

  useEffect(() => {
    searchServices();
  }, []);

  async function createSchedule(
    date: string,
    time: string,
    service: string | undefined
  ) {
    const isWeekend = VerifyWeekend(date);
    const isAvailable = await VerifySchedules(date, time);

    if (!isWeekend && isAvailable) {
      const { data, error } = await supabase.from('schedules').insert([
        {
          user_id: user.id,
          service_id: service,
          date: date,
          time: time,
          status: 'booked',
        },
      ]);
      if (error) {
        toast.error('Algum campo está vazio');
      } else {
        toast.success('Agendamento feito com sucesso');
      }
    } else {
      toast.error('Horário indisponível');
    }
  }

  return (
    <div>
      <div className="flex flex-col mx-2 md:px-10 gap-y-2">
        <div className="flex flex-col mt-2 max-h-[450px] gap-y-4 overflow-auto">
          <div className="flex flex-col gap-2 ">
            <label className="text-xl font-semibold">Data</label>
            <input
              className="bg-neutral-200 rounded-lg px-4 h-[50px] text-xl outline-none"
              max={moment().format('YYYY-12-31').toString()}
              min={moment().format('YYYY-MM-DD').toString()}
              type="date"
              onChange={(e) => {
                setSelectedDate(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-col gap-2 ">
            <label className="text-xl font-semibold">Horário</label>

            <button
              className="bg-neutral-200 rounded-lg px-4 h-[50px] text-xl outline-none"
              onClick={() => {
                setToggle('hours');
              }}
            >
              {selectedHour ? selectedHour : 'Selecione o horário'}
            </button>
            {toggle === 'hours' && (
              <ul className="overflow-auto max-h-24 ">
                {hours.map((hour) => {
                  return (
                    <li
                      key={hour}
                      value={hour}
                      onClick={() => {
                        setSelectedHour(hour);
                        setToggle('');
                      }}
                      className="py-1 pl-2 bg-neutral-100 hover:bg-neutral-200 hover:cursor-pointer"
                    >
                      {hour}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xl font-semibold">Serviço</label>
            <button
              className="bg-neutral-200 rounded-lg px-4 h-[50px] text-xl outline-none"
              onClick={() => {
                setToggle('services');
              }}
            >
              {selectedService?.id
                ? selectedService.title
                : 'Selecione o serviço'}
            </button>

            {toggle === 'services' && (
              <ul className="overflow-auto max-h-24 ">
                {servicesData.map((service) => {
                  return (
                    <li
                      key={service.id}
                      onClick={() => {
                        setSelectedService(service);
                        setToggle('');
                      }}
                      className="py-1 pl-2 bg-neutral-100 hover:bg-neutral-200 hover:cursor-pointer"
                    >
                      {service.title}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
        <div className="w-full mt-2 md:mt-0 md:absolute md:bottom-0 md:left-0 md:flex md:justify-center md:px-8 md:py-4 md:border-t">
          <button
            onClick={() => {
              createSchedule(selectedDate, selectedHour, selectedService?.id);
            }}
            className="  
           w-full   md:w-8/12   h-[70px] cursor-pointer  bg-cyan-600 text-white text-2xl rounded-full hover:bg-cyan-700  ease-in-out duration-200
           "
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}
