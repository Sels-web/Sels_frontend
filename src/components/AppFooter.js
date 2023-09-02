import React from 'react'
import { CFooter } from '@coreui/react'
import Instagram from '../assets/images/instagram.svg'

const AppFooter = () => {
  return (
    <CFooter className={'mt-4'}>
      <div>
        <span className="ms-1">&copy; 2023 Sejong Sels.</span>
      </div>
      <div className="ms-2">
        <a href="https://www.instagram.com/sejong_sels/" target="_blank" rel="noreferrer">
          <img width={30} src={Instagram} alt="instagram"/>
        </a>
      </div>
      <div className="ms-auto">
        <span className="me-1">Provided by Chong, Jeong</span>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
