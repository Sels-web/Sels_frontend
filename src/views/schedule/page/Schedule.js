import React from 'react'

import { CCard, CCardBody } from '@coreui/react'
import Calendar from "../components/Calendar";

const Dashboard = () => {
  return (
      <>
        <CCard>
          <CCardBody>
            <Calendar />
          </CCardBody>
        </CCard>
      </>
  )
}

export default Dashboard
