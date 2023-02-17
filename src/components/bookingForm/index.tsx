import { supabase } from '@/lib/supabaseClient';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useSelector } from 'react-redux';
import RootState from '@/types/reduxStates';
import moment from 'moment';
import VerifyWeekend from '@/utils/verifyWeekend';
import VerifySchedules from '@/utils/verifySchedules';

import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';

export default function BookingForm() {
  const user = useSelector((state: RootState) => state.user);

  type Inputs = {
    date: string;
    time: string;
    service: string;
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  async function createSchedule(date: string, time: string, service: string) {
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
      toast.success('Agendamento feito com sucesso');
      if (error) {
        toast.error('Ocorreu um erro ao criar o agendamento');
      }
    } else {
      toast.error('Horário indisponível');
    }
  }

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const { date, time, service } = data;
    createSchedule(date, time, service);
  };

  return (
    <div>
      <ToastContainer />
      <h1>Booking Form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          max={moment().format('YYYY-12-31').toString()}
          min={moment().format('YYYY-MM-DD').toString()}
          type="date"
          {...register('date', { required: true })}
        />
        <select {...register('time', { required: true })}>
          <option value="07:30">07:30</option>
          <option value="08:10">08:10</option>
          <option value="08:50">08:50</option>
          <option value="09:30">09:30</option>
          <option value="10:10">10:10</option>
          <option value="10:50">10:50</option>
          <option value="13:30">13:30</option>
          <option value="14:10">14:10</option>
          <option value="14:50">14:50</option>
          <option value="15:30">15:30</option>
          <option value="16:10">16:10</option>
          <option value="16:50">16:50</option>
        </select>

        <select {...register('service', { required: true })}>
          <option value="1">Corte</option>
          <option value="2">Barba</option>
          <option value="3">Corte + Barba</option>
        </select>
        <button type="submit">Criar agendamento</button>
      </form>
    </div>
  );
}
