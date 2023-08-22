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
import React, {useState} from "react";
import AdminAddMemberModal from "../components/AdminAddMemberModal";
import AdminDeleteMemberModal from "../components/AdminDeleteMemeberModal";
import AdminModifyMemberModal from "../components/AdminModifyMemeberModal";

const Admin = () => {
  const [addVisible, setAddVisible] = useState(false)
  const [removeVisible, setRemoveVisible] = useState(false)
  const [modifyVisible, setModifyVisible] = useState(false)

  const items = [
    {
      id: 1,
      name: '박재현',
      attend: '8회',
      accumulated_time: '19시간',
      latencyCost: '5000원',
      gender: '남',
      is_admin: '부원',
      school_id: '18011672',
      department: '소프트웨어학과',
      accumulated_cost: '5000원',
      function: '',
      _cellProps: { id: { scope: 'row' } },
    },
  ]
  return (
      <>
        <CCard>
          <CCardHeader className={'d-flex justify-content-between'}>
            <h3>관리자</h3>
            <CButton color="warning" onClick={() => setAddVisible(!addVisible)}>회원 추가</CButton>
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
                        <CTableDataCell className={'text-center'}>{item.accumulated_time}</CTableDataCell>
                        <CTableDataCell className={'text-center'}>{item.latencyCost}</CTableDataCell>
                        <CTableDataCell className={'text-center'}>{item.gender}</CTableDataCell>
                        <CTableDataCell className={'text-center'}>{item.is_admin}</CTableDataCell>
                        <CTableDataCell className={'text-center'}>{item.school_id}</CTableDataCell>
                        <CTableDataCell className={'text-center'}>{item.department}</CTableDataCell>
                        <CTableDataCell className={'text-center'}>{item.accumulated_cost}</CTableDataCell>
                        <CTableDataCell className={'text-center'}>
                            <CButton color="danger" className={'me-2'} onClick={() => setRemoveVisible(!removeVisible)}>삭제</CButton>
                            <CButton color="info" onClick={() => setModifyVisible(!modifyVisible)}>수정</CButton>
                        </CTableDataCell>
                      </CTableRow>
                  )})}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
        <AdminAddMemberModal show={addVisible} showFunc={setAddVisible}/>
        <AdminDeleteMemberModal show={removeVisible} showFunc={setRemoveVisible}/>
        <AdminModifyMemberModal show={modifyVisible} showFunc={setModifyVisible}/>
      </>
  );
}

export default Admin