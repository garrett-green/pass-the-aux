import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import {Button, Grid, Image} from 'semantic-ui-react'
import {withRouter} from 'react-router-dom'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div className="loginButton">
      <Grid centered columns={1}>
        <Grid.Column>
          <Grid.Row centered style={{textAlign: 'center', margin: '5px', padding: '5px'}} >
            {/* <h1>PASS THE AUX</h1> */}
            <Image src='/pass-the-aux-login.png' href="/auth/spotify" fluid style={{padding: '5px', margin: '5px'}} / >
          </Grid.Row>
          <Grid.Row centered style={{textAlign: 'center'}} >
            <Button color="green" href="/auth/spotify" size="massive" style={{textAlign: 'center'}} >
              {displayName} with Spotify
            </Button>
          </Grid.Row>
        </Grid.Column>
      </Grid>
    </div>
  )

  // return (
  //   <div className="loginButton">
  //     <h1 style={{textAlign: 'center'}}>PASS THE AUX</h1>
  // <Button color="green" href="/auth/spotify" size="huge">
  //   {displayName} with Spotify
  // </Button>
  //   </div>
  // )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

export const Login = withRouter(connect(mapLogin, mapDispatch)(AuthForm))
export const Signup = withRouter(connect(mapSignup, mapDispatch)(AuthForm))

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
