import Calendar from "../components/Calendar";
import '../styles/schedule.sass'
const Schedule = () => {
  return (
    <main className={'schedule'}>
      <h1>SELS 일정</h1>
      <Calendar />
    </main>
  )
}

export default Schedule