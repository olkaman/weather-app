import ToastContainer from 'react-bootstrap/ToastContainer'
import Toast from 'react-bootstrap/Toast'

function FeedbackMessage(props: { showToast: boolean; message: string; type: string; setShowToast: () => void }) {
  const { showToast, message, type, setShowToast } = props

  return (
    <ToastContainer position='top-center'>
      <Toast show={showToast} autohide delay={3000} bg={type} animation onClose={setShowToast}>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  )
}

export default FeedbackMessage
