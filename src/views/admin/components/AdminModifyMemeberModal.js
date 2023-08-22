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
import {patchMember, getMember} from "../../../api/member";
import {useEffect, useState} from "react";

const AdminModifyMemberModal = (props) => {
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

  const initMember = async () => {
    let memberVar = await getMember(props.selectedMember.schoolId)
    setMember(memberVar.data[0])
  }

  useEffect(() => {
    if(props.show) {
        initMember()
    }
  },[props.show])

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setMember((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  };

  const patchMemberFunc = () => {
    console.log(member)
    patchMember(member).then(r => {
      alert('수정 되었습니다.');
      props.initMember();
      props.showFunc(false);
    }).catch(r => {
      alert('오류가 발생하였습니다.')
    })
  }

  return (
      <>
        <CModal alignment="center" visible={props.show} onClose={() => props.showFunc(false)}>
          <CModalHeader onClose={() => props.showFunc(false)}>
            <CModalTitle>회원 수정</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CForm>
              <CInputGroup className="mb-3">
                <CInputGroupText>이름</CInputGroupText>
                <CFormInput placeholder="이름" defaultValue={member.name} onChange={handleInputChange}/>
              </CInputGroup>
              <CInputGroup className="mb-3">
                <CInputGroupText>참석 횟수</CInputGroupText>
                <CFormInput type="number" placeholder="참석 횟수" defaultValue={member.attendance} onChange={handleInputChange}/>
              </CInputGroup>
              <CInputGroup className="mb-3">
                <CInputGroupText>봉사 시간</CInputGroupText>
                <CFormInput type="number" placeholder="봉사시간" defaultValue={member.accumulated_time} onChange={handleInputChange}/>
              </CInputGroup>
              <CInputGroup className="mb-3">
                <CInputGroupText>벌금</CInputGroupText>
                <CFormInput type="number" placeholder="벌금" defaultValue={member.latencyCost} onChange={handleInputChange}/>
              </CInputGroup>
              <CInputGroup className="mb-3">
                <CInputGroupText>성별</CInputGroupText>
                <div className={'d-flex align-items-center ps-3 rounded-end border'} style={{flex: '1 1 auto', borderColor: '#dbdfe6'}}>
                  <div className="form-check me-2">
                    <input type="radio"
                           name="sex"
                           id="man"
                           value="남자"
                           className={'form-check-input'}
                           checked={member.sex === '남자'}
                           onChange={handleInputChange}/>
                    <label className={"form-check-label"} htmlFor="man">남자</label>
                  </div>
                  <div className="form-check">
                    <input type="radio"
                           name="sex"
                           id="woman"
                           value="여자"
                           className={'form-check-input'}
                           checked={member.sex === '여자'}
                           onChange={handleInputChange}/>
                    <label className={"form-check-label"} htmlFor="woman">여자</label>
                  </div>
                </div>
              </CInputGroup>
              <CInputGroup className="mb-3">
                <CInputGroupText>직책</CInputGroupText>
                <CFormInput placeholder="직책" defaultValue={member.is_admin} onChange={handleInputChange}/>
              </CInputGroup>
              <CInputGroup className="mb-3">
                <CInputGroupText>학번</CInputGroupText>
                <CFormInput placeholder="학번" defaultValue={member.school_id} onChange={handleInputChange}/>
              </CInputGroup>
              <CInputGroup className="mb-3">
                <CInputGroupText id="department">학과</CInputGroupText>
                <CFormInput placeholder="학과" defaultValue={member.department} onChange={handleInputChange}/>
              </CInputGroup>
              <CInputGroup>
                <CInputGroupText>지불비</CInputGroupText>
                <CFormInput type="number" placeholder="지불비" defaultValue={member.accumulated_cost} onChange={handleInputChange}/>
              </CInputGroup>
            </CForm>
          </CModalBody>
          <CModalFooter>
            <CButton color="success" onClick={() => patchMemberFunc()}>저장</CButton>
            <CButton color="secondary" onClick={() => props.showFunc(false)}>
              취소
            </CButton>
          </CModalFooter>
        </CModal>
      </>
  )
}

export default AdminModifyMemberModal