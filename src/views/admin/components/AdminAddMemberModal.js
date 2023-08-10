import {
  CButton,
  CForm, CFormCheck,
  CFormInput,
  CInputGroup, CInputGroupText,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle
} from "@coreui/react";

const AdminAddMemberModal = (props) => {
  return (
    <>
      <CModal alignment="center" visible={props.show} onClose={() => props.showFunc(false)}>
        <CModalHeader onClose={() => props.showFunc(false)}>
          <CModalTitle>회원 추가</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <CInputGroup className="mb-3">
              <CInputGroupText id="name">이름</CInputGroupText>
              <CFormInput placeholder="이름" aria-label="이름" aria-describedby="name"/>
            </CInputGroup>
            <CInputGroup className="mb-3">
              <CInputGroupText id="attend">참석 횟수</CInputGroupText>
              <CFormInput placeholder="참석 횟수" aria-label="참석 횟수" aria-describedby="attend"/>
            </CInputGroup>
            <CInputGroup className="mb-3">
              <CInputGroupText id="volunteerHours">봉사 시간</CInputGroupText>
              <CFormInput placeholder="봉사시간" aria-label="봉사시간" aria-describedby="volunteerHours"/>
            </CInputGroup>
            <CInputGroup className="mb-3">
              <CInputGroupText id="fine">벌금</CInputGroupText>
              <CFormInput placeholder="벌금" aria-label="벌금" aria-describedby="fine"/>
            </CInputGroup>
            <CInputGroup className="mb-3">
              <CInputGroupText id="gender">성별</CInputGroupText>
              <div className={'d-flex align-items-center ps-3 rounded-end border'} style={{flex: '1 1 auto', borderColor: '#dbdfe6'}}>
                <CFormCheck inline type="radio" name="gender" id="man" value="man" label="남자"/>
                <CFormCheck inline type="radio" name="gender" id="woman" value="woman" label="여자"/>
              </div>
            </CInputGroup>
            <CInputGroup className="mb-3">
              <CInputGroupText id="position">직책</CInputGroupText>
              <CFormInput placeholder="직책" aria-label="직책" aria-describedby="position"/>
            </CInputGroup>
            <CInputGroup className="mb-3">
              <CInputGroupText id="studentId">학번</CInputGroupText>
              <CFormInput placeholder="학번" aria-label="학번" aria-describedby="studentId"/>
            </CInputGroup>
            <CInputGroup className="mb-3">
              <CInputGroupText id="department">학과</CInputGroupText>
              <CFormInput placeholder="학과" aria-label="학과" aria-describedby="department"/>
            </CInputGroup>
            <CInputGroup>
              <CInputGroupText id="payout">지불비</CInputGroupText>
              <CFormInput placeholder="지불비" aria-label="지불비" aria-describedby="payout"/>
            </CInputGroup>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="success">저장</CButton>
          <CButton color="secondary" onClick={() => props.showFunc(false)}>
            취소
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default AdminAddMemberModal