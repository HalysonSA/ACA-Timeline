import { User } from './users';
import { Scheduling } from './scheduling';

export default interface RootState {
  user: User;
  schedules: Scheduling[];
  isWeekend: boolean;
}
