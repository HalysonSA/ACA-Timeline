import { setModalState } from '@/redux/modalControlsSlice';
import RootState from '@/types/reduxStates';
import { useDispatch, useSelector } from 'react-redux';

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
      <div className="absolute modal-size">Conteudo do modal horários</div>
    </>
  );
};

export default ModalSchedules;
