import { supabase } from '@/lib/supabaseClient';

const VerifySchedules = async (date: string, time: string) => {
  const { data: schedules, error } = await supabase
    .from('schedules')
    .select('*')
    .eq('date', date)
    .eq('time', time);
  if (schedules === null || schedules.length === 0) {
    return true;
  }
  return false;
};

export default VerifySchedules;
