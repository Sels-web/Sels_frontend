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
            {/*<Link to={'/boards/add'}><CButton color="warning">게시물 등록</CButton></Link>*/}
          </CCardHeader>
          <CCardBody>
            <p>준비중입니다.</p>
            {/*<CTable hover bordered>*/}
            {/*  <CTableHead align={'center'}>*/}
            {/*    <CTableRow>*/}
            {/*      <CTableHeaderCell scope="col"></CTableHeaderCell>*/}
            {/*      <CTableHeaderCell scope="col">제목</CTableHeaderCell>*/}
            {/*      <CTableHeaderCell scope="col" className={'w-25'}>작성일</CTableHeaderCell>*/}
            {/*    </CTableRow>*/}
            {/*  </CTableHead>*/}
            {/*  <CTableBody>*/}
            {/*    {items.map((item,idx) => {*/}
            {/*      return (*/}
            {/*      <CTableRow align={'middle'} key={idx}>*/}
            {/*        <CTableHeaderCell className={'text-center'} scope="row">{item.id}</CTableHeaderCell>*/}
            {/*        <CTableDataCell>*/}
            {/*          <Link to={'/boards/' + item.id} className={'link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover'}>{item.title}</Link>*/}
            {/*        </CTableDataCell>*/}
            {/*        <CTableDataCell className={'text-center'}>{item.date}</CTableDataCell>*/}
            {/*      </CTableRow>*/}
            {/*      )})}*/}
            {/*  </CTableBody>*/}
            {/*</CTable>*/}
          </CCardBody>
        </CCard>
      </>
  );
}

export default Boards