import {CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle} from "@coreui/react";

const BoardsDeleteModal = (props) => {
  return (
      <>
        <CModal alignment="center" visible={props.show} onClose={() => props.showFunc(false)}>
          <CModalHeader onClose={() => props.showFunc(false)}>
            <CModalTitle>회원 삭제</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <p>정말 삭제 하시겠습니까?</p>
          </CModalBody>
          <CModalFooter>
            <CButton color="primary">예</CButton>
            <CButton color="secondary" onClick={() => props.showFunc(false)}>
              아니요
            </CButton>
          </CModalFooter>
        </CModal>
      </>
  )
}

export default BoardsDeleteModal