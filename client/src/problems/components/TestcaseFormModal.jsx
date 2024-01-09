import Modal from '../../shared/components/ui-elements/Modal'
import TestcaseForm from "./TestcaseForm";

export default function TestcaseFormModal({visible, onClose, onSubmit, title, testcase, isLoading}) {
  return (
    <Modal title={title}
    onClose={onClose}
    visible={visible}
    >
        <TestcaseForm 
        testcase={testcase}
        onSubmit={onSubmit}
        isLoading={isLoading}
        />
    </Modal>
  )
}
