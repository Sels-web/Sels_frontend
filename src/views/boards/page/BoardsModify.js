import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CRow
} from "@coreui/react";
import React from "react";
import {useNavigate} from "react-router-dom";

const BoardsModify = () => {
  const navigate = useNavigate();

  return (
      <>
        <CCard>
          <CCardHeader className={'d-flex justify-content-between'}>
            <h3>자료실 수정</h3>
          </CCardHeader>
          <CCardBody>
            <CRow className="mb-4">
              <CFormLabel htmlFor="title" className="col-sm-1 col-form-label">제목</CFormLabel>
              <CCol sm={11}>
                <CFormInput type="text" id="title" />
              </CCol>
            </CRow>
            <CRow className="mb-4">
              <CFormLabel htmlFor="content" className="col-sm-1 col-form-label">내용</CFormLabel>
              <CCol sm={11}>
                <CFormTextarea
                    id="content"
                    rows={3}
                ></CFormTextarea>
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="file" className="col-sm-1 col-form-label">파일</CFormLabel>
              <CCol sm={11}>
                <CFormInput type="file" id="file" />
              </CCol>
            </CRow>
          </CCardBody>
          <CCardFooter className={'d-flex justify-content-end'}>
            <CButton color={'success'} className={'me-2'}>저장</CButton>
            <CButton color={'secondary'} onClick={() => navigate(-1)}>취소</CButton>
          </CCardFooter>
        </CCard>
      </>
  )
}

export default BoardsModify