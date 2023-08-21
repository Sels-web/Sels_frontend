import {
  CButton,
  CForm, CFormCheck,
  CFormInput,
  CInputGroup, CInputGroupText,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle
} from "@coreui/react";
import {useState} from "react";
import {AddMember} from "../../../api/admin";

const AdminAddMemberModal = (props) => {
  const [member, setMember] = useState({
    name: '',
    attendance: 0,
    volunteerHours: 0,
    fine: 0,
    gender: '남',
    position: '',
    studentId: '',
    department: '',
    payout: 0,
  })

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setMember((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  };

  const postMember = () => {
    let postMember = {
      name: member.name,
      attendance: Number(member.attendance),
      accumulated_time: Number(member.volunteerHours),
      latencyCost: Number(member.fine),
      sex: member.gender,
      is_admin: member.position,
      school_id: member.studentId,
      department: member.department,
      accumulated_cost: Number(member.payout),
    }
    console.log(postMember);
    AddMember(postMember).then(r => {
      console.log(r);
    })
  }

  return (
    <>
      <CModal alignment="center" visible={props.show} onClose={() => props.showFunc(false)}>
        <CModalHeader onClose={() => props.showFunc(false)}>
          <CModalTitle>회원 추가</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <CInputGroup className="mb-3">
              <CInputGroupText>이름</CInputGroupText>
              <CFormInput name="name" placeholder="이름" onChange={handleInputChange}/>
            </CInputGroup>
            <CInputGroup className="mb-3">
              <CInputGroupText>참석 횟수</CInputGroupText>
              <CFormInput name="attendance" type="number" placeholder="참석 횟수" onChange={handleInputChange}/>
            </CInputGroup>
            <CInputGroup className="mb-3">
              <CInputGroupText>봉사 시간</CInputGroupText>
              <CFormInput name="volunteerHours" type="number" placeholder="봉사시간" onChange={handleInputChange}/>
            </CInputGroup>
            <CInputGroup className="mb-3">
              <CInputGroupText>벌금</CInputGroupText>
              <CFormInput name="fine" type="number" placeholder="벌금" onChange={handleInputChange}/>
            </CInputGroup>
            <CInputGroup className="mb-3">
              <CInputGroupText>성별</CInputGroupText>
              <div className={'d-flex align-items-center ps-3 rounded-end border'} style={{flex: '1 1 auto', borderColor: '#dbdfe6'}}>
                <CFormCheck inline type="radio" name="gender" id="man" value="man" label="남자" onChange={handleInputChange}/>
                <CFormCheck inline type="radio" name="gender" id="woman" value="woman" label="여자" onChange={handleInputChange}/>
              </div>
            </CInputGroup>
            <CInputGroup className="mb-3">
              <CInputGroupText>직책</CInputGroupText>
              <CFormInput name="position" placeholder="직책" onChange={handleInputChange}/>
            </CInputGroup>
            <CInputGroup className="mb-3">
              <CInputGroupText>학번</CInputGroupText>
              <CFormInput name="studentId" placeholder="학번" onChange={handleInputChange}/>
            </CInputGroup>
            <CInputGroup className="mb-3">
              <CInputGroupText>학과</CInputGroupText>
              <CFormInput name="department" placeholder="학과" onChange={handleInputChange}/>
            </CInputGroup>
            <CInputGroup>
              <CInputGroupText>지불비</CInputGroupText>
              <CFormInput name="payout" type="number" placeholder="지불비" onChange={handleInputChange}/>
            </CInputGroup>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="success" onClick={() => postMember()}>저장</CButton>
          <CButton color="secondary" onClick={() => {
            props.showFunc(false);
            setMember({});
          }}>
            취소
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default AdminAddMemberModal