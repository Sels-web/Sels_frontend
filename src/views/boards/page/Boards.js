import {CCard, CCardBody, CCardHeader, CTable} from "@coreui/react";
import React from "react";

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
          <CCardHeader>
            <h3>셀스 자료실</h3>
          </CCardHeader>
          <CCardBody>
            <CTable hover bordered columns={columns} items={items} tableHeadProps={{ align: 'middle' }} />
          </CCardBody>
        </CCard>
      </>
  );
}

export default Boards