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
  const [validated, setValidated] = useState(false)

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
      latencyCost: '',
      order: 'name',
      page: 1,
    }
    getMembers(params, 1).then(r=> {
      console.log(r.data)
      setSearchMembers(r.data.list)
    })
  },[])

  const handleFormSubmit = (event) => {
    const form = event.currentTarget
    event.preventDefault()
    event.stopPropagation()
    if (form.checkValidity() === false) {
      setValidated(true)
    } else {
      addAttendance(newUser).then(r => {
        alert('참석자가 등록되었습니다.')
        props.initSchedule()
        props.showFunc(false)
        setValidated(false)
      }).catch(r => {
        if(r.response.status === 400) alert('이미 존재하는 참석자입니다.')
        else alert('오류가 발생하였습니다.')
      })
    }
  };

  const handleInputChange = (event) => {
    const { value } = event.target;
    console.log(typeof value)

    let params = {
      name: value === null ? '' : value,
      school_id: '',
      latencyCost: 0,
      order: 'name',
      page: 1
    }
    getMembers(params,1).then(r=> {
      setSearchMembers(r.data.list === undefined ? [] : r.data.list)
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
        onClose={() => {
          props.showFunc(false)
          setValidated(false)
        }}
      >
        <CForm validated={validated} noValidate onSubmit={handleFormSubmit}>
          <CModalHeader>
            <CModalTitle>참석 인원 추가</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CInputGroup className="mb-3">
              <CInputGroupText>이름</CInputGroupText>
              <CFormInput name="name" placeholder="이름" onChange={handleInputChange}/>
            </CInputGroup>
            <CFormSelect
                required
                feedbackInvalid="참석자를 선택주세요."
                tooltipFeedback
                onChange={selectChange}>
              <option value="">참석자를 선택해 주세요.</option>
              {searchMembers.length !== 0 && searchMembers.map((searchMember,idx) => {
                return(
                  <option value={searchMember.school_id} key={idx}>{searchMember.name} {searchMember.school_id} {searchMember.department}</option>
                )
              })}
            </CFormSelect>
          </CModalBody>
          <CModalFooter>
            <CButton type="submit" color="primary">추가</CButton>
            <CButton color="secondary" onClick={() => {
              props.showFunc(false)
              setValidated(false)
            }}>
              취소
            </CButton>
          </CModalFooter>
        </CForm>
      </CModal>
    </>
  );
};

export default ScheduleAddMemberModal;
