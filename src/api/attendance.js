import Send from "./Send";

export const addAttendance = (data) => {
  return Send({
    method: 'post',
    url: `/calendar-namelist/names`,
    data: data
  })
}