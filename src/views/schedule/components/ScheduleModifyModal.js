import React, {useState} from "react";
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
import {getSelectedScheduleAction, modifySelectedScheduleAction} from "../../../store/selectedScheduleStore";
import {useDispatch, useSelector} from "react-redux";
import {modifySchedule} from "../../../api/schedule";
import {useParams} from "react-router-dom";

const ScheduleModifyModal = (props) => {
  const {id} = useParams()
  const dispatch = useDispatch()
  const selectedSchedule = useSelector(state => state.selectedScheduleStore)
  const [validated, setValidated] = useState(false)

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    dispatch(modifySelectedScheduleAction({name, value}))
  };

  const handleColorChange = (color) => {
    const name = 'color';
    const value = color.hex;
    dispatch(modifySelectedScheduleAction({name, value}))
  };

  const handleDialogClose = () => {
    props.showFunc(false);
    setValidated(false)
    dispatch(getSelectedScheduleAction({}))
  };

  const handleFormSubmit = (event) => {
    const form = event.currentTarget
    event.preventDefault()
    event.stopPropagation()
    if (form.checkValidity() === false) {
      setValidated(true)
    } else {
      modifySchedule(selectedSchedule).then(r => {
        props.initSchedule()
        alert('수정 되었습니다.');
        handleDialogClose();
      }).catch(r => {
        alert('오류가 발생하였습니다.')
      })
    }
  }

  return (
    <>
      <CModal alignment="center" visible={props.show} onClose={handleDialogClose}>
        <CForm validated={validated} noValidate onSubmit={handleFormSubmit}>
          <CModalHeader>
            <CModalTitle>일정 수정</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CInputGroup className={'mt-3'}>
              <CInputGroupText>일정 제목</CInputGroupText>
              <CFormInput
                  type="text"
                  placeholder="일정 제목"
                  name="title"
                  required
                  feedbackInvalid="일정 제목을 적어주세요."
                  tooltipFeedback
                  defaultValue={selectedSchedule.title}
                  onChange={handleInputChange}/>
            </CInputGroup>
            <CInputGroup className={'mt-3'}>
              <CInputGroupText>시작 시간</CInputGroupText>
              <CFormInput
                  type="datetime-local"
                  name="startDate"
                  required
                  feedbackInvalid="시작 시간을 적어주세요."
                  tooltipFeedback
                  onChange={handleInputChange}
                  defaultValue={selectedSchedule.startDate} />
            </CInputGroup>
            <CInputGroup className={'mt-3'}>
              <CInputGroupText>종료 시간</CInputGroupText>
              <CFormInput
                  type="datetime-local"
                  name="endDate"
                  required
                  feedbackInvalid="종료 시간을 적어주세요."
                  tooltipFeedback
                  onChange={handleInputChange}
                  defaultValue={selectedSchedule.endDate}/>
            </CInputGroup>
            <GithubPicker className={'mt-3'} triangle="hide" onChange={handleColorChange} />
          </CModalBody>
          <CModalFooter>
            <CButton type="submit" color="primary">수정</CButton>
            <CButton color="secondary" onClick={handleDialogClose}>
              취소
            </CButton>
          </CModalFooter>
        </CForm>
      </CModal>
    </>
  );
};

export default ScheduleModifyModal;
