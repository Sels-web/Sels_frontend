import React from 'react'

import {CButton, CCard, CCardBody, CCardHeader} from '@coreui/react'
import Calendar from "../components/Calendar";

const Dashboard = () => {
  return (
      <>
        <CCard>
          <CCardHeader>
            <h3>셀스 일정</h3>
          </CCardHeader>
          <CCardBody>
            <Calendar />
          </CCardBody>
        </CCard>
      </>
  )
}

export default Dashboard
