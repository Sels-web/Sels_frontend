import {
  CButton,
  CForm,
  CFormInput, CFormSelect,
  CInputGroup, CInputGroupText,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle
} from "@coreui/react";
import React, {useState} from "react";
import {AddMember} from "../../../api/member";

const AdminAddMemberModal = (props) => {
  const [validated, setValidated] = useState(false)
  const [member, setMember] = useState({
    name: '',
    attendance: 0,
    accumulated_time: 0,
    latencyCost: 0,
    is_admin: '',
    sex: '남자',
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

  const postMember = (event) => {
    const form = event.currentTarget
    event.preventDefault()
    event.stopPropagation()
    if (form.checkValidity() === false) {
      setValidated(true)
    } else {
      AddMember(member).then(r => {
        alert('회원이 추가되었습니다.');
        props.showFunc(false);
        props.initMembers()
        setMember({});
        setValidated(false)
      }).catch(r => {
        if(r.response.status === 400) alert('이미 존재하는 학번입니다.')
        else alert('오류가 발생하였습니다.')
      })
    }

  }

  return (
    <>
      <CModal alignment="center"
              visible={props.show}
              onClose={() => {
                props.showFunc(false)
                setValidated(false)
                setMember({});
              }
      }>
        <CForm validated={validated} noValidate onSubmit={postMember}>
          <CModalHeader>
            <CModalTitle>회원 추가</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CInputGroup className="mb-3">
              <CInputGroupText>이름</CInputGroupText>
              <CFormInput
                  name="name"
                  placeholder="이름"
                  required
                  feedbackInvalid="이름을 적어주세요."
                  tooltipFeedback
                  onChange={handleInputChange}/>
            </CInputGroup>
            <CInputGroup className="mb-3">
              <CInputGroupText>참석 횟수</CInputGroupText>
              <CFormInput 
                  name="attendance" 
                  type="number" 
                  placeholder="참석 횟수" 
                  defaultValue={0}
                  required
                  feedbackInvalid="참석 횟수를 적어주세요."
                  tooltipFeedback
                  onChange={handleInputChange}/>
            </CInputGroup>
            <CInputGroup className="mb-3">
              <CInputGroupText>봉사 시간</CInputGroupText>
              <CFormInput 
                  name="accumulated_time" 
                  type="number" 
                  placeholder="봉사 시간"
                  defaultValue={0}
                  required
                  feedbackInvalid="봉사 시간을 적어주세요."
                  tooltipFeedback
                  onChange={handleInputChange}/>
            </CInputGroup>
            <CInputGroup className="mb-3">
              <CInputGroupText>벌금</CInputGroupText>
              <CFormInput 
                  name="latencyCost" 
                  type="number" 
                  placeholder="벌금" 
                  defaultValue={0}
                  required
                  feedbackInvalid="벌금을 적어주세요."
                  tooltipFeedback
                  onChange={handleInputChange}/>
            </CInputGroup>
            <CInputGroup className="mb-3">
              <CInputGroupText>성별</CInputGroupText>
              <div className={'d-flex align-items-center ps-3 rounded-end border'} style={{flex: '1 1 auto', borderColor: '#dbdfe6'}}>
                <div className="form-check me-2">
                  <input type="radio" name="sex" id="man" value="남자" className={'form-check-input'} defaultChecked onChange={handleInputChange}/>
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
              <CFormSelect name="is_admin"
                           required
                           feedbackInvalid="직책을 선택해 주세요."
                           tooltipFeedback
                           onChange={handleInputChange}>
                <option value="">직책을 선택해 주세요.</option>
                <option value={"부원"}>부원</option>
                <option value={"임원"}>임원</option>
                <option value={"부회장"}>부회장</option>
                <option value={"회장"}>회장</option>
              </CFormSelect>
            </CInputGroup>
            <CInputGroup className="mb-3">
              <CInputGroupText>학번</CInputGroupText>
              <CFormInput 
                  name="school_id" 
                  placeholder="학번"
                  required
                  feedbackInvalid="학번을 적어주세요."
                  tooltipFeedback
                  onChange={handleInputChange}/>
            </CInputGroup>
            <CInputGroup className="mb-3">
              <CInputGroupText>학과</CInputGroupText>
              <CFormInput 
                  name="department" 
                  placeholder="학과"
                  required
                  feedbackInvalid="학과를 적어주세요."
                  tooltipFeedback
                  onChange={handleInputChange}/>
            </CInputGroup>
            <CInputGroup>
              <CInputGroupText>지불비</CInputGroupText>
              <CFormInput 
                  name="accumulated_cost"
                  type="number" 
                  placeholder="지불비" 
                  defaultValue={0}
                  required
                  feedbackInvalid="지불비를 적어주세요."
                  tooltipFeedback
                  onChange={handleInputChange}/>
            </CInputGroup>
          </CModalBody>
          <CModalFooter>
            <CButton type="submit" color="success">저장</CButton>
            <CButton color="secondary" onClick={() => {
              props.showFunc(false);
              setValidated(false)
              setMember({});
            }}>
              취소
            </CButton>
          </CModalFooter>
        </CForm>
      </CModal>
    </>
  )
}

export default AdminAddMemberModal