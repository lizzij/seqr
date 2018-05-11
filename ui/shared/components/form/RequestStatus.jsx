import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Icon, Popup } from 'semantic-ui-react'

const ColorIcon = styled(Icon)`
  color: ${props => props.color};
`

class RequestStatus extends React.Component {

  static NONE = 'NONE'
  static IN_PROGRESS = 'IN_PROGRESS'
  static SUCCEEDED = 'SUCCEEDED'
  static ERROR = 'ERROR'

  static propTypes = {
    status: PropTypes.string,
    errorMessage: PropTypes.string,
  }

  render() {
    switch (this.props.status) {
      case RequestStatus.IN_PROGRESS:
        return <ColorIcon loading name="spinner" color="#4183c4" />
      case RequestStatus.SUCCEEDED:
        return <Popup
          trigger={
            <ColorIcon name="check circle" color="#00C000" />
          }
          content="Success"
          position="top center"
          size="small"
        />
      case RequestStatus.ERROR:
        return <Popup
          trigger={
            <ColorIcon name="warning circle" color="#F00000" />
          }
          content={`Error: ${this.props.errorMessage || ''}`}
          position="top center"
          size="small"
        />
      default:
        return <ColorIcon name="square outline" color="rgba(0, 0, 0, 0.0)" />
    }
  }
}

export default RequestStatus
