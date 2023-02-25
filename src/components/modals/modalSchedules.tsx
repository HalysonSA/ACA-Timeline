import { setModalState } from '@/redux/modalControlsSlice';
import RootState from '@/types/reduxStates';
import { useDispatch, useSelector } from 'react-redux';
import { IoClose } from 'react-icons/io5';
import SchedulesToday from '../calendar/schedules';
import { MdKeyboardArrowDown } from 'react-icons/md';

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
        className="absolute top-0 bottom-0 z-40 flex items-center justify-center w-screen min-h-screen bg-black opacity-25"
      />
      <div className="absolute z-50 modal-size">
        <div className="flex flew-row justify-between items-center py-4 px-10 h-[100px] border-b">
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
        <div className="flex justify-center md:invisible -translate-y-[30px]">
          <button className="flex justify-center items-center bg-white rounded-full w-[50px] h-[50px]">
            <MdKeyboardArrowDown size={30} />
          </button>
        </div>
      </div>
    </>
  );
};

export default ModalSchedules;
