import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CForm,
  CFormInput, CFormSelect,
  CInputGroup,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow
} from "@coreui/react";
import React, {useEffect, useState} from "react";
import AdminAddMemberModal from "../components/AdminAddMemberModal";
import AdminDeleteMemberModal from "../components/AdminDeleteMemeberModal";
import AdminModifyMemberModal from "../components/AdminModifyMemeberModal";
import {getMembers} from "../../../api/member";
import {useDispatch, useSelector} from "react-redux";
import {getMembersAction} from "../../../store/memberStore";
import {getSelectedMemberAction} from "../../../store/selectedMemberStore";
import Pagination from "react-js-pagination";
import '../../../scss/_pagination.scss'

const Admin = () => {
  const [addVisible, setAddVisible] = useState(false)
  const [removeVisible, setRemoveVisible] = useState(false)
  const [modifyVisible, setModifyVisible] = useState(false)

  const [searchParams, setSearchParams] = useState({
    name: '',
    school_id: '',
    latencyCost: '',
    order: 'name',
  });
  const [activePage, setActivePage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)

  const members = useSelector(state => state.membersStore)
  const dispatch = useDispatch()

  const initMembers = async (eventPage) => {
    let params = {
      name: searchParams.name,
      school_id: searchParams.school_id,
      latencyCost: searchParams.latencyCost,
      order: searchParams.order,
      page: eventPage
    }
    let memberList = await getMembers(params,eventPage)
    dispatch(getMembersAction(memberList.data.list))
    setTotalPage(memberList.data.page_count)
    setActivePage(memberList.data.page)
  }

  useEffect(() => {
    initMembers(1)
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
            <h3>관리자</h3>
            <CButton color="warning" onClick={() => setAddVisible(!addVisible)}>회원 추가</CButton>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={(e) => {
              e.preventDefault()
              initMembers(1)
            }}>
              <div className={'d-flex justify-content-end mb-3'}>
                <CInputGroup className="w-50">
                  <CFormInput name='name' placeholder="이름검색" onChange={inputChange}/>
                  <CFormInput type="number" name='latencyCost' placeholder="벌금" onChange={inputChange}/>
                  <CFormSelect  onChange={inputChange} name="order">
                    <option value="name">이름 오름차순</option>
                    <option value="-name">이름 내림차순</option>
                    <option value="attendance">참석 횟수 오름차순</option>
                    <option value="-attendance">참석 횟수 내림차순</option>
                  </CFormSelect>
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
                  <CTableHeaderCell scope="col">누적 봉사 시간</CTableHeaderCell>
                  <CTableHeaderCell scope="col">벌금</CTableHeaderCell>
                  <CTableHeaderCell scope="col">성별</CTableHeaderCell>
                  <CTableHeaderCell scope="col">직책</CTableHeaderCell>
                  <CTableHeaderCell scope="col">학번</CTableHeaderCell>
                  <CTableHeaderCell scope="col">학과</CTableHeaderCell>
                  <CTableHeaderCell scope="col">경고 횟수</CTableHeaderCell>
                  <CTableHeaderCell scope="col">누적 벌금</CTableHeaderCell>
                  <CTableHeaderCell scope="col">기능</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {members.length !== 0 && members.map((member, idx) => {
                  return (
                    <CTableRow align={'middle'} key={idx}>
                      <CTableHeaderCell className={'text-center'}>{idx + 1}</CTableHeaderCell>
                      <CTableDataCell className={'text-center'}>{member.name}</CTableDataCell>
                      <CTableDataCell className={'text-center'}>{member.attendance}회</CTableDataCell>
                      <CTableDataCell className={'text-center'}>{member.accumulated_time}시간</CTableDataCell>
                      <CTableDataCell className={'text-center'}>{member.latencyCost}원</CTableDataCell>
                      <CTableDataCell className={'text-center'}>{member.sex}</CTableDataCell>
                      <CTableDataCell className={'text-center'}>{member.is_admin}</CTableDataCell>
                      <CTableDataCell className={'text-center'}>{member.school_id}</CTableDataCell>
                      <CTableDataCell className={'text-center'}>{member.department}</CTableDataCell>
                      <CTableDataCell className={'text-center'}>{member.penalty_cnt}</CTableDataCell>
                      <CTableDataCell className={'text-center'}>{member.accumulated_cost}원</CTableDataCell>
                      <CTableDataCell className={'text-center'}>
                        <CButton color="danger" className={'me-2'} onClick={() => {
                          setRemoveVisible(!removeVisible);
                          dispatch(getSelectedMemberAction(member))
                        }}>삭제</CButton>
                        <CButton color="info" onClick={() => {
                          setModifyVisible(!modifyVisible);
                          dispatch(getSelectedMemberAction(member))
                        }}>수정</CButton>
                      </CTableDataCell>
                    </CTableRow>
                  )
                })}
                {members.length === 0 &&
                  <CTableRow align={'middle'}>
                    <CTableDataCell className={'text-center'} colSpan={12}>검색결과가 없습니다!</CTableDataCell>
                  </CTableRow>
                }
              </CTableBody>
            </CTable>
          </CCardBody>
          {members.length !== 0 && totalPage >= 2 &&
            <CCardFooter>
              <Pagination
                activePage={activePage}
                itemsCountPerPage={10}
                totalItemsCount={10*totalPage}
                pageRangeDisplayed={5}
                prevPageText={"‹"}
                nextPageText={"›"}
                itemClassPrev={'page-prev'}
                itemClassNext={'page-next'}
                onChange={initMembers}
              />
            </CCardFooter>
          }
        </CCard>
        <AdminAddMemberModal show={addVisible} showFunc={setAddVisible} initMembers={() => initMembers(1)}/>
        <AdminDeleteMemberModal show={removeVisible} showFunc={setRemoveVisible} initMembers={() => initMembers(activePage)}/>
        <AdminModifyMemberModal show={modifyVisible} showFunc={setModifyVisible} initMembers={() => initMembers(activePage)}/>
      </>
  );
}

export default Admin