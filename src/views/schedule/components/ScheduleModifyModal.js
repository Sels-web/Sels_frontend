import React, {useEffect} from "react";
import {
  CButton, CForm, CFormInput,
  CInputGroup,
  CInputGroupText,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle
} from "@coreui/react";
import {GithubPicker} from "react-color";
import {modifySelectedScheduleAction} from "../../../store/selectedScheduleStore";
import {useDispatch, useSelector} from "react-redux";
import {modifySchedule} from "../../../api/schedule";
import {useParams} from "react-router-dom";

const ScheduleModifyModal = (props) => {
  const {id} = useParams()
  const dispatch = useDispatch()
  const selectedSchedule = useSelector(state => state.selectedScheduleStore)

  const handleFormSubmit = () => {
    modifySchedule(selectedSchedule).then(r => {
      alert('수정 되었습니다.');
      props.showFunc(false);
    }).catch(r => {
      alert('오류가 발생하였습니다.')
    })
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    dispatch(modifySelectedScheduleAction({name, value}))
  };

  const handleColorChange = (color) => {
    const name = 'color';
    const value = color.hex;
    dispatch(modifySelectedScheduleAction({name, value}))
  };

  return (
    <>
      <CModal alignment="center" visible={props.show} onClose={() => props.showFunc(false)}>
        <CModalHeader onClose={() => props.showFunc(false)}>
          <CModalTitle>일정 수정</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm onSubmit={handleFormSubmit}>
            <CInputGroup className={'mt-3'}>
              <CInputGroupText>일정 제목</CInputGroupText>
              <CFormInput type="text" placeholder="일정 제목" name="title" defaultValue={selectedSchedule.title} onChange={handleInputChange}/>
            </CInputGroup>
            <CInputGroup className={'mt-3'}>
              <CInputGroupText>시작 시간</CInputGroupText>
              <CFormInput type="datetime-local" name="startDate" onChange={handleInputChange} defaultValue={selectedSchedule.startDate} />
            </CInputGroup>
            <CInputGroup className={'mt-3'}>
              <CInputGroupText>종료 시간</CInputGroupText>
              <CFormInput type="datetime-local" name="endDate" onChange={handleInputChange} defaultValue={selectedSchedule.endDate}/>
            </CInputGroup>
            <GithubPicker className={'mt-3'} triangle="hide" onChange={handleColorChange} />
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={handleFormSubmit}>수정</CButton>
          <CButton color="secondary" onClick={() => props.showFunc(false)}>
            취소
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default ScheduleModifyModal;
