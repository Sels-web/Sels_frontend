import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilCalendar, cilPeople, cilSave, cilSpeedometer } from '@coreui/icons'
import { CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavTitle,
    name: '셀스',
  },
  {
    component: CNavItem,
    name: '일정',
    to: '/schedule',
    icon: <CIcon icon={cilCalendar} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: '명단',
    to: '/members',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: '자료실',
    to: '/boards',
    icon: <CIcon icon={cilSave} customClassName="nav-icon" />,
  },
]

export default _nav
