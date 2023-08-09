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
import React from "react";
import { Link } from 'react-router-dom';

const Boards = () => {
  const columns = [
    {
      key: 'id',
      label: '',
      _props: { scope: 'col' },
    },
    {
      key: 'title',
      label: '제목',
      _props: { scope: 'col' },
    },
    {
      key: 'date',
      label: '작성일',
      _props: { scope: 'col' },
    },
  ]
  const items = [
    {
      id: 1,
      title: '타이틀',
      date: '2023.08.08',
      _cellProps: { id: { scope: 'row' } },
    },
  ]
  return (
      <>
        <CCard>
          <CCardHeader className={'d-flex justify-content-between'}>
            <h3>셀스 자료실</h3>
            <CButton color="warning" className={'me-2'}>게시물 등록</CButton>
          </CCardHeader>
          <CCardBody>
            <CTable hover bordered>
              <CTableHead align={'center'}>
                <CTableRow>
                  <CTableHeaderCell scope="col"></CTableHeaderCell>
                  <CTableHeaderCell scope="col">제목</CTableHeaderCell>
                  <CTableHeaderCell scope="col">작성일</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {items.map(item => {
                  return (
                  <CTableRow align={'middle'}>
                    <CTableHeaderCell className={'text-center'} scope="row">{item.id}</CTableHeaderCell>
                    <CTableDataCell className={'text-center'}><Link to={''}>{item.title}</Link></CTableDataCell>
                    <CTableDataCell className={'text-center'}>{item.date}</CTableDataCell>
                  </CTableRow>
                  )})}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </>
  );
}

export default Boards