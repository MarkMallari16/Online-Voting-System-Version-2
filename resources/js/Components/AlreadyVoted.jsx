import React,{useState} from 'react'
import PrimaryButton from './PrimaryButton'
import Modal from './Modal'
import DangerButton from './DangerButton'


const AlreadyVoted = ({ castedVotes }) => {
  const [showModal, setShowModal] = useState(false);
  const handleSeeCastedVote = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };
  return (
    <div className='mt-10 w-full flex justify-center items-center'>
      <div>

        <div className='text-5xl'>Thank you for voting!</div>
        <div className='text-center mt-3'>
          <PrimaryButton onClick={handleSeeCastedVote} className='bg-blue-500 hover:bg-blue-700 text-white px-6 py-3 rounded-md'>See Casted Vote</PrimaryButton>
        </div>
      </div>
      <Modal show={showModal} onClose={handleClose} maxWidth='md'>

        <div className="mt-5 flex justify-center gap-1">
          <DangerButton type="button" className="mr-2 " onClick={handleClose}>
            Close
          </DangerButton>
        </div>
      </Modal>
    </div>

  )
}

export default AlreadyVoted