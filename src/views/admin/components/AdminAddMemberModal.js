import {
  CButton,
  CForm,
  CFormInput,
  CInputGroup, CInputGroupText,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle
} from "@coreui/react";
import {useState} from "react";
import {AddMember} from "../../../api/member";

const AdminAddMemberModal = (props) => {
  const [member, setMember] = useState({
    name: '',
    attendance: 0,
    accumulated_time: 0,
    latencyCost: 0,
    is_admin: '',
    sex: '',
    school_id: '',
    department: '',
    accumulated_cost: 0,
  })

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setMember((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  };

  const postMember = () => {
    AddMember(member).then(r => {
      alert('회원이 추가되었습니다.');
      props.showFunc(false);
      setMember({});
    }).catch(r => {
      alert('오류가 발생하였습니다.')
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
              <CFormInput name="accumulated_time" type="number" placeholder="봉사시간" onChange={handleInputChange}/>
            </CInputGroup>
            <CInputGroup className="mb-3">
              <CInputGroupText>벌금</CInputGroupText>
              <CFormInput name="latencyCost" type="number" placeholder="벌금" onChange={handleInputChange}/>
            </CInputGroup>
            <CInputGroup className="mb-3">
              <CInputGroupText>성별</CInputGroupText>
              <div className={'d-flex align-items-center ps-3 rounded-end border'} style={{flex: '1 1 auto', borderColor: '#dbdfe6'}}>
                <div className="form-check me-2">
                  <input type="radio" name="sex" id="man" value="남자" className={'form-check-input'} onChange={handleInputChange}/>
                  <label className={"form-check-label"} htmlFor="man">남자</label>
                </div>
                <div className="form-check">
                  <input type="radio" name="sex" id="woman" value="여자" className={'form-check-input'} onChange={handleInputChange}/>
                  <label className={"form-check-label"} htmlFor="woman">여자</label>
                </div>
              </div>
            </CInputGroup>
            <CInputGroup className="mb-3">
              <CInputGroupText>직책</CInputGroupText>
              <CFormInput name="is_admin" placeholder="직책" onChange={handleInputChange}/>
            </CInputGroup>
            <CInputGroup className="mb-3">
              <CInputGroupText>학번</CInputGroupText>
              <CFormInput name="school_id" placeholder="학번" onChange={handleInputChange}/>
            </CInputGroup>
            <CInputGroup className="mb-3">
              <CInputGroupText>학과</CInputGroupText>
              <CFormInput name="department" placeholder="학과" onChange={handleInputChange}/>
            </CInputGroup>
            <CInputGroup>
              <CInputGroupText>지불비</CInputGroupText>
              <CFormInput name="accumulated_cost" type="number" placeholder="지불비" onChange={handleInputChange}/>
            </CInputGroup>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="success" onClick={() => {
            postMember()
            props.initMembers()
          }}>저장</CButton>
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