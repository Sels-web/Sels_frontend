import React, {useEffect, useState} from "react";

import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CForm,
  CFormInput, CInputGroupText, CInputGroup, CFormSelect,
} from "@coreui/react";
import {useParams} from "react-router-dom";
import {addAttendance} from "../../../api/attendance";
import {getMembers} from "../../../api/member";

const ScheduleAddMemberModal = (props) => {
  const {id} = useParams()
  const [newUser, setNewUser] = useState({
    calendar_id: id,
    name: '',
    school_id: '',
  });
  const [searchMembers, setSearchMembers] = useState([{
    name: '',
    school_id: '',
    department: '',
  }]);

  useEffect(()=> {
    let params = {
      name: '',
      school_id: '',
      latencyCost: 0,
      order: 'name',
    }
    getMembers(params).then(r=> {
      setSearchMembers(r.data)
    })
  },[])

  const handleFormSubmit = (event) => {
    event.preventDefault()
    addAttendance(newUser).then(r => {
      alert('참석자가 등록되었습니다.')
      props.initSchedule()
    })
    props.showFunc(false);
  };

  const handleInputChange = (event) => {
    const { value } = event.target;

    let params = {
      name: value,
      school_id: '',
      latencyCost: 0,
      order: 'name',
    }
    getMembers(params).then(r=> {
      setSearchMembers(r.data)
    })
  };

  const selectChange = (event) => {
    let select = searchMembers.filter(member => member.school_id === event.target.value)
    let filterMember = {
      calendar_id: id,
      name: select[0].name,
      school_id: select[0].school_id,
    }
    setNewUser(filterMember)
  }

  return (
    <>
      <CModal
        alignment="center"
        visible={props.show}
        onClose={() => props.showFunc(false)}
      >
        <CForm onSubmit={handleFormSubmit}>
          <CModalHeader onClose={() => props.showFunc(false)}>
            <CModalTitle>참석 인원 추가</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CInputGroup className="mb-3">
              <CInputGroupText>이름</CInputGroupText>
              <CFormInput name="name" placeholder="이름" onChange={handleInputChange}/>
            </CInputGroup>
            <CFormSelect onChange={selectChange}>
              <option>참석자를 선택해 주세요.</option>
              {searchMembers.map((searchMember,idx) => {
                return(
                  <option value={searchMember.school_id} key={idx}>{searchMember.name} {searchMember.school_id} {searchMember.department}</option>
                )
              })}
            </CFormSelect>
          </CModalBody>
          <CModalFooter>
            <CButton
              type="submit"
              color="primary"
              onClick={() => props.showFunc(false)}
            >
              추가
            </CButton>
            <CButton color="secondary" onClick={() => props.showFunc(false)}>
              취소
            </CButton>
          </CModalFooter>
        </CForm>
      </CModal>
    </>
  );
};

export default ScheduleAddMemberModal;
