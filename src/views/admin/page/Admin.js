import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CTable,
  CTableBody, CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow
} from "@coreui/react";
import {Link} from "react-router-dom";
import React from "react";

const Admin = () => {
  const items = [
    {
      id: 1,
      name: '박재현',
      attend: '8회',
      volunteerHours: '19시간',
      fine: '5000원',
      gender: '남',
      position: '부원',
      studentId: '18011672',
      department: '소프트웨어학과',
      payout: '5000원',
      function: '',
      _cellProps: { id: { scope: 'row' } },
    },
  ]
  return (
      <>
        <CCard>
          <CCardHeader className={'d-flex justify-content-between'}>
            <h2>관리자</h2>
            <CButton color="warning">회원 추가</CButton>
          </CCardHeader>
          <CCardBody>
            <CTable hover bordered>
              <CTableHead align={'center'}>
                <CTableRow>
                  <CTableHeaderCell scope="col"></CTableHeaderCell>
                  <CTableHeaderCell scope="col">이름</CTableHeaderCell>
                  <CTableHeaderCell scope="col">참석 횟수</CTableHeaderCell>
                  <CTableHeaderCell scope="col">봉사 시간</CTableHeaderCell>
                  <CTableHeaderCell scope="col">벌금</CTableHeaderCell>
                  <CTableHeaderCell scope="col">성별</CTableHeaderCell>
                  <CTableHeaderCell scope="col">직책</CTableHeaderCell>
                  <CTableHeaderCell scope="col">학번</CTableHeaderCell>
                  <CTableHeaderCell scope="col">학과</CTableHeaderCell>
                  <CTableHeaderCell scope="col">지불비</CTableHeaderCell>
                  <CTableHeaderCell scope="col">기능</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {items.map(item => {
                  return (
                      <CTableRow align={'middle'}>
                        <CTableHeaderCell className={'text-center'}>{item.id}</CTableHeaderCell>
                        <CTableDataCell className={'text-center'}><Link to={''}>{item.name}</Link></CTableDataCell>
                        <CTableDataCell className={'text-center'}>{item.attend}</CTableDataCell>
                        <CTableDataCell className={'text-center'}>{item.volunteerHours}</CTableDataCell>
                        <CTableDataCell className={'text-center'}>{item.fine}</CTableDataCell>
                        <CTableDataCell className={'text-center'}>{item.gender}</CTableDataCell>
                        <CTableDataCell className={'text-center'}>{item.position}</CTableDataCell>
                        <CTableDataCell className={'text-center'}>{item.studentId}</CTableDataCell>
                        <CTableDataCell className={'text-center'}>{item.department}</CTableDataCell>
                        <CTableDataCell className={'text-center'}>{item.payout}</CTableDataCell>
                        <CTableDataCell className={'text-center'}>
                            <CButton color="danger" className={'me-2'}>삭제</CButton>
                            <CButton color="info">수정</CButton>
                        </CTableDataCell>
                      </CTableRow>
                  )})}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </>
  );
}

export default Admin