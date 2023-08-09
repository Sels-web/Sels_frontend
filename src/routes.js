import React from 'react'

const Schedule = React.lazy(() => import('./views/schedule/page/Schedule'))
const Members = React.lazy(() => import('./views/members/page/Members'))
const Boards = React.lazy(() => import('./views/boards/page/Boards'))
const BoardsDetail = React.lazy(() => import('./views/boards/components/BoardsDetail'))
const Admin = React.lazy(() => import('./views/admin/page/Admin'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/schedule', name: '일정', element: Schedule },
  { path: '/members', name: '명단', element: Members },
  { path: '/boards', name: '자료실', element: Boards },
  { path: '/boards/:id', name: '자료실 세부', element: BoardsDetail },
  { path: '/admin', name: '관리자', element: Admin },
]

export default routes
