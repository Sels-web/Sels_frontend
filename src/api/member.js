// @ts-ignore
import Send from './Send.js'

export const getMember = () => {
  return Send({
    method: 'get',
    url: `/namelist/all/0`,
  })
}

export const getSearchMember = (name) => {
  return Send({
    method: 'get',
    url: `/namelist/search/${name}`,
  })
}

export const deleteMember = (schoolId, name) => {
  return Send({
    method: 'delete',
    url: `/namelist/delete-one/${schoolId}/${name}`,
  })
}