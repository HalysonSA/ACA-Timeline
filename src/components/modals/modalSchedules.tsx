import { setModalState } from '@/redux/modalControlsSlice';
import RootState from '@/types/reduxStates';
import { useDispatch, useSelector } from 'react-redux';
import { IoClose } from 'react-icons/io5';
import SchedulesToday from '../calendar/schedules';

const ModalSchedules = () => {
  const modal = useSelector((state: RootState) => state.isModalOpen);

  const dispatch = useDispatch();

  if (!modal.isModalOpen || modal.modalType != 'scheduleSchedules') return null;

  return (
    <>
      <div
        onClick={() => {
          dispatch(
            setModalState({
              isModalOpen: false,
              modalType: 'scheduleSchedules',
            })
          );
        }}
        className="absolute top-0 bottom-0 flex items-center justify-center w-screen min-h-screen bg-black opacity-25"
      />
      <div className="absolute modal-size">
        <div className="flex flew-row justify-between items-center py-4 px-10">
          <p className="text-2xl font-semibold">Horários</p>
          <button
            onClick={() => {
              dispatch(
                setModalState({
                  isModalOpen: false,
                  modalType: 'scheduleSchedules',
                })
              );
            }}
          >
            <IoClose size={30} />
          </button>
        </div>
        <SchedulesToday />
      </div>
    </>
  );
};

export default ModalSchedules;
