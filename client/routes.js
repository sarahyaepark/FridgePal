import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Login, Signup, UserHome, Recipes, Footer} from './components'
import {me} from './store'

class Routes extends Component {
  componentDidMount() {
    if(this.props.isLoggedIn) {
      this.props.loadInitialData(this.props.id)
    }
  }

  render() {
    const {isLoggedIn} = this.props
    return (
      <div>
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/home" component={UserHome} />
            <Route path="/recipes" component={Recipes} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Footer isLoggedIn={isLoggedIn}/>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    id: state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData(id) {
      dispatch(me(id))
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  // loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
