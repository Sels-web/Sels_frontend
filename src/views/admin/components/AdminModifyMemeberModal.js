import {
  CButton,
  CForm, CFormCheck,
  CFormInput, CFormSelect,
  CInputGroup, CInputGroupText,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle
} from "@coreui/react";
import {patchMember} from "../../../api/member";
import {useDispatch, useSelector} from "react-redux";
import {modifySelectedMemberAction} from "../../../store/selectedMemberStore";
import React from "react";

const AdminModifyMemberModal = (props) => {
  const dispatch = useDispatch()
  const selectedMember = useSelector(state => state.selectedMemberStore)

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    dispatch(modifySelectedMemberAction({name, value}))
  };

  const patchMemberFunc = () => {
    patchMember(selectedMember).then(r => {
      alert('수정 되었습니다.');
      props.showFunc(false);
      props.initMembers();
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
                <CFormInput name="name" placeholder="이름" defaultValue={selectedMember.name} onChange={handleInputChange}/>
              </CInputGroup>
              <CInputGroup className="mb-3">
                <CInputGroupText>참석 횟수</CInputGroupText>
                <CFormInput name="attendance" type="number" placeholder="참석 횟수" defaultValue={selectedMember.attendance} onChange={handleInputChange}/>
              </CInputGroup>
              <CInputGroup className="mb-3">
                <CInputGroupText>봉사 시간</CInputGroupText>
                <CFormInput name="accumulated_time" type="number" placeholder="봉사시간" defaultValue={selectedMember.accumulated_time} onChange={handleInputChange}/>
              </CInputGroup>
              <CInputGroup className="mb-3">
                <CInputGroupText>벌금</CInputGroupText>
                <CFormInput name="latencyCost" type="number" placeholder="벌금" defaultValue={selectedMember.latencyCost} onChange={handleInputChange}/>
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
                           checked={selectedMember.sex === '남자'}
                           onChange={handleInputChange}/>
                    <label className={"form-check-label"} htmlFor="man">남자</label>
                  </div>
                  <div className="form-check">
                    <input type="radio"
                           name="sex"
                           id="woman"
                           value="여자"
                           className={'form-check-input'}
                           checked={selectedMember.sex === '여자'}
                           onChange={handleInputChange}/>
                    <label className={"form-check-label"} htmlFor="woman">여자</label>
                  </div>
                </div>
              </CInputGroup>
              <CInputGroup className="mb-3">
                <CInputGroupText>직책</CInputGroupText>
                <CFormSelect name="is_admin" defaultValue={selectedMember.is_admin} onChange={handleInputChange}>
                  <option>직책을 선택해 주세요.</option>
                  <option value={"부원"}>부원</option>
                  <option value={"임원"}>임원</option>
                  <option value={"부회장"}>부회장</option>
                  <option value={"회장"}>회장</option>
                </CFormSelect>
              </CInputGroup>
              <CInputGroup className="mb-3">
                <CInputGroupText>학번</CInputGroupText>
                <CFormInput name="school_id" placeholder="학번" defaultValue={selectedMember.school_id} onChange={handleInputChange}/>
              </CInputGroup>
              <CInputGroup className="mb-3">
                <CInputGroupText id="department">학과</CInputGroupText>
                <CFormInput name="department" placeholder="학과" defaultValue={selectedMember.department} onChange={handleInputChange}/>
              </CInputGroup>
              <CInputGroup>
                <CInputGroupText>지불비</CInputGroupText>
                <CFormInput name="accumulated_cost" type="number" placeholder="지불비" defaultValue={selectedMember.accumulated_cost} onChange={handleInputChange}/>
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