import {CCard, CCardBody, CTable} from "@coreui/react";

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
          <CCardBody>
            <CTable hover bordered columns={columns} items={items} />
          </CCardBody>
        </CCard>
      </>
  );
}

export default Boards