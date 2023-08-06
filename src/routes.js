import React from 'react'

const Schedule = React.lazy(() => import('./views/schedule/page/Schedule'))
const Members = React.lazy(() => import('./views/members/page/Members'))
const Boards = React.lazy(() => import('./views/boards/page/Boards'))
const Admin = React.lazy(() => import('./views/admin/page/Admin'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/schedule', name: 'Schedule', element: Schedule },
  { path: '/members', name: 'Members', element: Members },
  { path: '/boards', name: 'Boards', element: Boards },
  { path: '/admin', name: 'Admin', element: Admin },
]

export default routes
