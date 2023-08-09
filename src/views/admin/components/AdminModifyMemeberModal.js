import {CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle} from "@coreui/react";

const AdminModifyMemberModal = (props) => {
  return (
      <>
        <CModal alignment="center" visible={props.show} onClose={() => props.showFunc(false)}>
          <CModalHeader onClose={() => props.showFunc(false)}>
            <CModalTitle>회원 수정</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <p>추가 내용 작성</p>
          </CModalBody>
          <CModalFooter>
            <CButton color="primary">저장</CButton>
            <CButton color="secondary" onClick={() => props.showFunc(false)}>
              취소
            </CButton>
          </CModalFooter>
        </CModal>
      </>
  )
}

export default AdminModifyMemberModal