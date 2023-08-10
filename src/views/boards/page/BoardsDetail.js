import {CButton, CCard, CCardBody, CCardFooter, CCardHeader} from "@coreui/react";
import React, {useState} from "react";
import BoardsDeleteModal from "../components/BoardsDeleteModal";
import {Link, useParams} from "react-router-dom";

const BoardsDetail = () => {
  const [visible, setVisible] = useState(false);
  const params = useParams();
  const item = {
    title: '제목',
    content: '내용',
    files: [
      {
        id: '1',
        link: 'link.com',
        name: '파일.jpg',
      },
      {
        id: '2',
        link: 'link.com',
        name: '파일2.jpg',
      }
    ],
    date: '2023.08.09',
  }
  return (
    <>
      <CCard>
        <CCardHeader className={'d-flex justify-content-between align-items-end'}>
          <h3 className={'m-0'}>{item.title}</h3>
          <p className={'m-0'}>{item.date}</p>
        </CCardHeader>
        <CCardBody>
          <div>{item.content}</div>
          <div className={'mt-5 p-3 border rounded'}>
            {item.files.map(file => {
              return (
                <>
                  <a className={'mt-1 d-block link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover'}
                     href={file.link}
                     download>
                    {file.name}
                  </a>
                </>
              )
            })}
          </div>
        </CCardBody>
        <CCardFooter className={'d-flex justify-content-end'}>
          <Link to={'/boards/' + params.id + '/edit'}><CButton color={'info'} className={'me-2'}>수정</CButton></Link>
          <CButton color={'danger'} onClick={() => setVisible(!visible)}>삭제</CButton>
        </CCardFooter>
      </CCard>
      <BoardsDeleteModal show={visible} showFunc={setVisible}/>
    </>
  )
}

export default BoardsDetail