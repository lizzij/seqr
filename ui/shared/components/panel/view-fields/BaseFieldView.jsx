import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Icon } from 'semantic-ui-react'
import styled from 'styled-components'

import { getUser } from 'redux/selectors'
import StaffOnlyIcon from '../../icons/StaffOnlyIcon'
import DispatchRequestButton from '../../buttons/DispatchRequestButton'
import ReduxFormWrapper from '../../form/ReduxFormWrapper'
import Modal from '../../modal/Modal'
import { HorizontalSpacer } from '../../Spacers'

const FieldValue = styled.div`
  padding-bottom: ${props => (props.compact ? 0 : '15px')}; 
  padding-left: ${props => (props.compact ? 0 : '22px')};
  padding-right: ${props => (props.fieldName ? '20px' : '5px')};
  display: ${props => ((props.fieldName && !props.compact) ? 'block' : 'inline-block')};
`

const hasValue = val => val && (!('length' in Object.getOwnPropertyNames(val)) || val.length > 0)

const BaseFieldView = (props) => {
  if (props.isVisible !== undefined && !props.isVisible) {
    return null
  }
  if (props.isPrivate && !props.user.is_staff) {
    return null
  }
  const fieldValue = props.initialValues[props.field]
  if (!props.isEditable && !hasValue(fieldValue)) {
    return null
  }
  const modalId = props.isEditable ? `edit-${props.initialValues[props.idField] || 'new'}-${props.field}` : null

  const editButton = props.isEditable && (props.formFields ?
    <Modal key="edit" title={props.modalTitle} modalName={modalId} trigger={
      <a role="button" tabIndex="0">
        {props.editLabel && <span style={{ cursor: 'pointer', paddingRight: '5px' }}>{props.editLabel}</span>}
        <Icon link size="small" name={props.editIconName || 'write'} />
      </a>
    }
    >
      <div style={props.modalStyle}>
        <ReduxFormWrapper
          onSubmit={props.onSubmit}
          form={modalId}
          initialValues={props.initialValues}
          fields={props.formFields}
          confirmCloseIfNotSaved
        />
      </div>
    </Modal>
    : (
      <DispatchRequestButton
        key="edit"
        buttonContent={<Icon link size="small" name="plus" />}
        onSubmit={() => props.onSubmit(props.initialValues)}
        confirmDialog={props.addConfirm}
      />
    ))
  const deleteButton = props.isDeletable && (
    <DispatchRequestButton
      key="delete"
      buttonContent={<Icon link size="small" name="trash" />}
      onSubmit={() => props.onSubmit({ ...props.initialValues, delete: true })}
      confirmDialog={props.deleteConfirm}
    />
  )
  const buttons = [editButton, deleteButton]

  return (
    <span style={props.style || {}}>
      {props.isPrivate && <StaffOnlyIcon />}
      {props.fieldName && [
        <b key="name">{props.fieldName}{hasValue(fieldValue) && ':'}<HorizontalSpacer width={10} /></b>,
        ...buttons,
        props.compact && (buttons.some(b => b) ? <HorizontalSpacer width={10} key="hs" /> : null),
        !props.compact && <br key="br" />,
      ]}
      {
        hasValue(fieldValue) && !props.hideValue &&
        <FieldValue compact={props.compact} fieldName={props.fieldName}>
          {props.fieldDisplay(fieldValue)}
        </FieldValue>
      }
      {!props.fieldName && buttons}
    </span>)
}

BaseFieldView.propTypes = {
  fieldDisplay: PropTypes.func.isRequired,
  formFields: PropTypes.array,
  isVisible: PropTypes.any,
  isPrivate: PropTypes.bool,
  isEditable: PropTypes.bool,
  isDeletable: PropTypes.bool,
  onSubmit: PropTypes.func,
  modalTitle: PropTypes.string,
  addConfirm: PropTypes.string,
  deleteConfirm: PropTypes.string,
  fieldName: PropTypes.string,
  field: PropTypes.string.isRequired,
  idField: PropTypes.string,
  initialValues: PropTypes.object,
  compact: PropTypes.bool,
  style: PropTypes.object,
  editLabel: PropTypes.string,
  editIconName: PropTypes.string,
  hideValue: PropTypes.bool,
  user: PropTypes.object,
  modalStyle: PropTypes.object,
}

const mapStateToProps = state => ({
  user: getUser(state),
})

export default connect(mapStateToProps)(BaseFieldView)
