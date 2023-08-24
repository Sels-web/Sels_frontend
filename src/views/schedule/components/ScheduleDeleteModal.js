import {CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle} from "@coreui/react";
import {deleteSchedule} from "../../../api/schedule";
import {useNavigate, useParams} from "react-router-dom";

const ScheduleDeleteModal = (props) => {
  const {id} = useParams()
  const navigate = useNavigate();
  const deleteScheduleFunc = () => {
    deleteSchedule(id).then(r => {
      alert('삭제 되었습니다.');
      navigate('/schedule');
    })
  }

  return (
      <>
        <CModal alignment="center" visible={props.show} onClose={() => props.showFunc(false)}>
          <CModalHeader onClose={() => props.showFunc(false)}>
            <CModalTitle>일정 삭제</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <p className={'m-0'}>
              삭제 시 복구가 불가능 합니다.<br />
              정말 삭제 하시겠습니까?
            </p>
          </CModalBody>
          <CModalFooter>
            <CButton color="primary" onClick={deleteScheduleFunc}>예</CButton>
            <CButton color="secondary" onClick={() => props.showFunc(false)}>
              아니요
            </CButton>
          </CModalFooter>
        </CModal>
      </>
  )
}

export default ScheduleDeleteModal