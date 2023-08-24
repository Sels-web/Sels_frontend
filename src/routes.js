import React from 'react'

const Schedule = React.lazy(() => import('./views/schedule/page/Schedule'))
const ScheduleAttendance = React.lazy(() => import('./views/schedule/page/ScheduleAttendance'))
const Members = React.lazy(() => import('./views/members/page/Members'))
const Boards = React.lazy(() => import('./views/boards/page/Boards'))
const BoardsAdd = React.lazy(() => import('./views/boards/page/BoardsAdd'))
const BoardsDetail = React.lazy(() => import('./views/boards/page/BoardsDetail'))
const BoardsModify = React.lazy(() => import('./views/boards/page/BoardsModify'))
const Admin = React.lazy(() => import('./views/admin/page/Admin'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/schedule', name: '일정', element: Schedule },
  { path: '/schedule/attendance/:id', name: '참석자', element: ScheduleAttendance },
  { path: '/members', name: '명단', element: Members },
  { path: '/boards', name: '자료실', element: Boards },
  { path: '/boards/add', name: '자료실 등록', element: BoardsAdd },
  { path: '/boards/:id', name: '자료실 세부', element: BoardsDetail },
  { path: '/boards/:id/edit', name: '자료실 수정', element: BoardsModify },
  { path: '/admin', name: '관리자', element: Admin },
]

export default routes
