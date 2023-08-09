import {useState} from "react";
import {CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle} from "@coreui/react";

const AdminAddMemberModal = (props) => {
  return (
    <>
      <CModal alignment="center" visible={props.show} onClose={() => props.showFunc(false)}>
        <CModalHeader onClose={() => props.showFunc(false)}>
          <CModalTitle>회원 추가</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <p>추가 내용 작성</p>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => props.showFunc(false)}>
            Close
          </CButton>
          <CButton color="primary">저장</CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default AdminAddMemberModal