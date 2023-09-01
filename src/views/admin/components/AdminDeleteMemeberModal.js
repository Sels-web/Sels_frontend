import {CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle} from "@coreui/react";
import {deleteMember, getSearchMember} from "../../../api/member";
import {useSelector} from "react-redux";

const AdminDeleteMemberModal = (props) => {
  const selectedMember = useSelector(state => state.selectedMemberStore)

  const deleteMemberFunc = () => {
    let params = {
      range: 'one',
      name: selectedMember.name,
      school_id: selectedMember.school_id
    }
    deleteMember(params).then(r => {
      alert('삭제 되었습니다.');
      props.initMembers(props.activePage);
      props.showFunc(false);
    }).catch(r => {
      alert('오류가 발생하였습니다.')
    })
  }

  return (
      <>
        <CModal alignment="center" visible={props.show} onClose={() => props.showFunc(false)}>
          <CModalHeader onClose={() => props.showFunc(false)}>
            <CModalTitle>회원 삭제</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <p className={'m-0'}>
              삭제 시 복구가 불가능 합니다.<br />
              정말 삭제 하시겠습니까?
            </p>
          </CModalBody>
          <CModalFooter>
            <CButton color="primary" onClick={deleteMemberFunc}>예</CButton>
            <CButton color="secondary" onClick={() => props.showFunc(false)}>
              아니요
            </CButton>
          </CModalFooter>
        </CModal>
      </>
  )
}

export default AdminDeleteMemberModal