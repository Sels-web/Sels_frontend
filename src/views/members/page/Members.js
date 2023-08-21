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
import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import {getMember} from "../../../api/member";

const Members = () => {

  useEffect(() => {
    const initMember = async () => {
      let memberList = await getMember()
      console.log(memberList)

    }
    initMember()
  }, [])

  const items = [{
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
      _cellProps: { id: { scope: 'row' } },
    },]
  return (
    <>
      <CCard>
        <CCardHeader className={'d-flex justify-content-between'}>
          <h3>셀스 명단</h3>
          <CButton color="warning">정산하기</CButton>
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
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {items.map(item => {
                return (
                  <CTableRow align={'middle'}>
                    <CTableHeaderCell className={'text-center'}>{item.id}</CTableHeaderCell>
                    <CTableDataCell className={'text-center'}>{item.name}</CTableDataCell>
                    <CTableDataCell className={'text-center'}>{item.attend}</CTableDataCell>
                    <CTableDataCell className={'text-center'}>{item.volunteerHours}</CTableDataCell>
                    <CTableDataCell className={'text-center'}>{item.fine}</CTableDataCell>
                    <CTableDataCell className={'text-center'}>{item.gender}</CTableDataCell>
                    <CTableDataCell className={'text-center'}>{item.position}</CTableDataCell>
                    <CTableDataCell className={'text-center'}>{item.studentId}</CTableDataCell>
                    <CTableDataCell className={'text-center'}>{item.department}</CTableDataCell>
                    <CTableDataCell className={'text-center'}>{item.payout}</CTableDataCell>
                  </CTableRow>
                )})}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </>
  );
}

export default Members