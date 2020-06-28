import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {AddIngredient} from './AddIngredient'
/**
 * COMPONENT
 */
export const UserHome = props => {
  const {name} = props

  return (
    <div>
      <h3>Welcome, {name}</h3>
      <AddIngredient id={props.id}/>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    id: state.user.id,
    email: state.user.email,
    name: state.user.name
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
