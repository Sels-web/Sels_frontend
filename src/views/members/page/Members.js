import {CCard, CCardBody, CCardHeader, CTable} from "@coreui/react";
import React from "react";

const Members = () => {
  const columns = [
    {
      key: 'id',
      label: '',
      _props: { scope: 'col' },
    },
    {
      key: 'name',
      label: '이름',
      _props: { scope: 'col' },
    },
    {
      key: 'attend',
      label: '참석 횟수',
      _props: { scope: 'col' },
    },
    {
      key: 'volunteerHours',
      label: '봉사시간',
      _props: { scope: 'col' },
    },
    {
      key: 'fine',
      label: '벌금',
      _props: { scope: 'col' },
    },
    {
      key: 'gender',
      label: '성별',
      _props: { scope: 'col' },
    },
    {
      key: 'position',
      label: '직책',
      _props: { scope: 'col' },
    },
    {
      key: 'studentId',
      label: '학번',
      _props: { scope: 'col' },
    },
    {
      key: 'department',
      label: '학과',
      _props: { scope: 'col' },
    },
    {
      key: 'payout',
      label: '지불금',
      _props: { scope: 'col' },
    },
  ]
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
      _cellProps: { id: { scope: 'row' } },
    },
  ]
  return (
    <>
      <CCard>
        <CCardHeader>
          <h3>셀스 명단</h3>
        </CCardHeader>
        <CCardBody>
          <CTable hover bordered columns={columns} items={items} tableHeadProps={{ align: 'middle' }}  />
        </CCardBody>
      </CCard>
    </>
  );
}

export default Members