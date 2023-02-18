import RootState from '@/types/reduxStates';
import { useSelector } from 'react-redux';
import { supabase } from '@/lib/supabaseClient';
import { useEffect, useState } from 'react';
import { Scheduling } from '@/types/scheduling';

interface Props {
  id: number;
  title: string;
  description: string;
  price?: number;
}

const MySchedules = () => {
  const user = useSelector((state: RootState) => state.user);
  const [schedules, setSchedules] = useState<Scheduling[]>([]);
  const [services, setServices] = useState<Props[]>([]);

  async function getMySchedules() {
    const { data, error } = await supabase
      .from('schedules')
      .select('*')
      .eq('user_id', user.id);
    if (data) {
      setSchedules(data);
    }
  }

  async function getServices() {
    const { data, error } = await supabase.from('services').select('*');
    if (data) {
      setServices(data);
    }
  }
  useEffect(() => {
    getMySchedules();
    getServices();
  }, []);

  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-2xl font-bold">My Schedules</h1>
      {schedules.map((schedule) => {
        return (
          <div key={schedule.id}>
            <p>{schedule.date}</p>

            <p> {schedule.time}</p>

            <p>
              {schedule.service_id
                ? services.find((service) => service.id === schedule.service_id)
                    ?.title
                : null}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default MySchedules;
