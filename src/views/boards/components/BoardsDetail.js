import {CCard, CCardBody, CCardFooter, CCardHeader} from "@coreui/react";
import React from "react";

const BoardsDetail = () => {
  const item = {
    title: '제목',
    content: '내용',
    files: [{
      id: '1',
      link: 'link.com',
      name: '파일',
    }],
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
          {item.content}
        </CCardBody>
        <CCardFooter>
          {item.files.map(file => {
            return (
              <>
                <a href={file.link} download>{file.name}</a>
              </>
            )
          })}
        </CCardFooter>
      </CCard>
    </>
  )
}

export default BoardsDetail