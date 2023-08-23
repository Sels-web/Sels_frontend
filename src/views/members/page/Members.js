import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader, CForm, CFormInput, CInputGroup,
  CTable,
  CTableBody, CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow
} from "@coreui/react";
import React, {useEffect, useState} from "react";
import {getMembers} from "../../../api/member";
import {getMembersAction} from "../../../store/memberStore"
import {useDispatch, useSelector} from "react-redux";

const Members = () => {
  const [searchParams, setSearchParams] = useState({
    name: '',
    school_id: '',
    latencyCost: 0,
    order: 'name',
  });
  const members = useSelector(state => state.membersStore)
  const dispatch = useDispatch()

  const initMembers = async () => {
    let memberList = await getMembers(searchParams)
    dispatch(getMembersAction(memberList.data))
  }

  useEffect(() => {
    initMembers()
  }, [])

  const inputChange = (event) => {
    const { name, value } = event.target;
    setSearchParams((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  }

  return (
    <>
      <CCard>
        <CCardHeader className={'d-flex justify-content-between'}>
          <h3>셀스 명단</h3>
          <CButton color="warning">정산하기</CButton>
        </CCardHeader>
        <CCardBody>
          <CForm onSubmit={(e) => {
            e.preventDefault()
            initMembers()
          }}>
            <div className={'d-flex justify-content-end mb-3'}>
                <CInputGroup className="w-25">
                  <CFormInput name="name" placeholder="이름검색" onChange={inputChange}/>
                  <CFormInput name='latencyCost' placeholder="벌금" onChange={inputChange}/>
                  <CButton type="submit" color="warning" variant="outline">검색</CButton>
                </CInputGroup>
            </div>
          </CForm>
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
              {members.map((member, idx) => {
                return (
                    members.length != 0 ? (
                    <CTableRow align={'middle'} key={idx}>
                      <CTableHeaderCell className={'text-center'}>{idx + 1}</CTableHeaderCell>
                      <CTableDataCell className={'text-center'}>{member.name}</CTableDataCell>
                      <CTableDataCell className={'text-center'}>{member.attendance}</CTableDataCell>
                      <CTableDataCell className={'text-center'}>{member.accumulated_time}</CTableDataCell>
                      <CTableDataCell className={'text-center'}>{member.latencyCost}</CTableDataCell>
                      <CTableDataCell className={'text-center'}>{member.sex}</CTableDataCell>
                      <CTableDataCell className={'text-center'}>{member.is_admin}</CTableDataCell>
                      <CTableDataCell className={'text-center'}>{member.school_id}</CTableDataCell>
                      <CTableDataCell className={'text-center'}>{member.department}</CTableDataCell>
                      <CTableDataCell className={'text-center'}>{member.accumulated_cost}</CTableDataCell>
                    </CTableRow>
                  ) : (
                    <CTableRow align={'middle'}>
                      <CTableDataCell className={'text-center'} colSpan={7}>검색결과가 없습니다!</CTableDataCell>
                    </CTableRow>
                  )
              )})}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </>
  );
}

export default Members