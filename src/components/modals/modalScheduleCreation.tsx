import { setModalState } from '@/redux/modalControlsSlice';
import RootState from '@/types/reduxStates';
import { IoClose } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import ScheduleForm from '../scheduleForm';

const ModalScheduleCreation = () => {
  const modal = useSelector((state: RootState) => state.isModalOpen);

  const dispatch = useDispatch();

  if (!modal.isModalOpen || modal.modalType != 'scheduleCreation') return null;

  return (
    <>
      <div
        onClick={() => {
          dispatch(
            setModalState({
              isModalOpen: false,
              modalType: 'scheduleCreation',
            })
          );
        }}
        className="absolute top-0 bottom-0 z-40 flex items-center justify-center w-screen min-h-screen bg-black opacity-25"
      />
      <div className="absolute z-50 overflow-auto modal-size">
        <div className="flex flew-row justify-between items-center py-4 px-10 h-[100px] border-b">
          <p className="text-2xl font-semibold">Faça seu agendamento</p>
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
        <ScheduleForm />
      </div>
    </>
  );
};

export default ModalScheduleCreation;
