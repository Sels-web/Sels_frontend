// @ts-ignore
import Send from './Send.js'

export const getMembers = () => {
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

export const getMember = (schoolId) => {
  return Send({
    method: 'get',
    url: `/namelist/detail/${schoolId}`,
  })
}

export const AddMember = (data) => {
  return Send({
    method: 'post',
    url: `/namelist/register`,
    data: data
  })
}

export const patchMember = (data) => {
  return Send({
    method: 'patch',
    url: '/namelist',
    data: data
  })
}

export const deleteMember = (schoolId, name) => {
  return Send({
    method: 'delete',
    url: `/namelist/delete-one/${schoolId}/${name}`,
  })
}