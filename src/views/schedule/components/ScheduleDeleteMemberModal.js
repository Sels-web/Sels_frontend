import {CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle} from "@coreui/react";
import {useNavigate, useParams} from "react-router-dom";
import {deleteAttendance} from "../../../api/attendance";
import {useSelector} from "react-redux";

const ScheduleDeleteMemberModal = (props) => {
  const {id} = useParams()
  const selectedAttendance = useSelector(state => state.selectedAttendanceStore)
  const deleteAttendFunc = () => {
    let params = {
      range: 'one',
      event_id: id,
      school_id: selectedAttendance.school_id
    }
    deleteAttendance(params).then(r => {
      alert('삭제 되었습니다.');
      props.initSchedule();
      props.showFunc(false);
    })
  }

  return (
      <>
        <CModal alignment="center" visible={props.show} onClose={() => props.showFunc(false)}>
          <CModalHeader onClose={() => props.showFunc(false)}>
            <CModalTitle>참가자 삭제</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <p className={'m-0'}>
              삭제 시 복구가 불가능 합니다.<br />
              정말 삭제 하시겠습니까?
            </p>
          </CModalBody>
          <CModalFooter>
            <CButton color="primary" onClick={deleteAttendFunc}>예</CButton>
            <CButton color="secondary" onClick={() => props.showFunc(false)}>
              아니요
            </CButton>
          </CModalFooter>
        </CModal>
      </>
  )
}

export default ScheduleDeleteMemberModal