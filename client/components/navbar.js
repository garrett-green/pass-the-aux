import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {Menu} from 'semantic-ui-react'

class Navbar extends Component {
  constructor() {
    super()
    this.state = {}
  }
  handleItemClick = (e, {name}) => this.setState({activeItem: name})

  render() {
    const {handleClick, isLoggedIn} = this.props
    const {activeItem} = this.state

    return (
      <div
        style={{
          float: 'center',
          textAlign: 'center',
          padding: '5px',
          margin: '5px',
          fontSize: 'h1'
        }}
      >
        <h1
          style={{
            justifyContent: 'center',
            padding: '5px',
            margin: '5px',
            alignContent: 'center'
          }}
        >
          PASS THE AUX
        </h1>
        <nav
          style={{
            // display: 'flex',
            justifyContent: 'center',
            float: 'center',
            textAlign: 'center',
            fontSize: 'h2'
          }}
        >
          {isLoggedIn ? (
            <div
              style={{
                justifyContent: 'center'
              }}
            >
              {/* The navbar will show these links after you log in */}
              <Menu
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  textAlign: 'center',
                  float: 'center',
                  fontSize: 'h2'
                }}
              >
                <Menu.Item
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    textAlign: 'center',
                    float: 'center',
                    fontSize: 'h2'
                  }}
                  as={Link}
                  name="home"
                  to="/home"
                  active={activeItem === 'home'}
                  onClick={this.handleItemClick}
                >
                  Home
                </Menu.Item>

                <Menu.Item
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    textAlign: 'center',
                    float: 'center',
                    fontSize: 'h2'
                  }}
                  as={Link}
                  name="make-playlist"
                  to="/name-playlist"
                  active={activeItem === 'make-playlist'}
                  onClick={this.handleItemClick}
                >
                  Make A New Playlist
                </Menu.Item>

                {/* <Menu.Item
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    textAlign: 'center',
                    float: 'center',
                    fontSize: 'h2'
                  }}
                  as={Link}
                  name="select-playlist"
                  to="/select-playlist"
                  active={activeItem === 'select-playlist'}
                  onClick={this.handleItemClick}
                >
                  Add To An Existing Playlist
                </Menu.Item> */}

                <Menu.Item
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    textAlign: 'center',
                    float: 'center',
                    fontSize: 'h2'
                  }}
                  name="logout"
                  active={activeItem === 'logout'}
                  onClick={handleClick}
                >
                  Logout
                </Menu.Item>
              </Menu>
            </div>
          ) : (
            <div>
              <Menu>
                <Menu.Item
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    textAlign: 'center',
                    float: 'center',
                    fontSize: 'h2'
                  }}
                  as={Link}
                  name="login"
                  to="/login"
                  active={activeItem === 'login'}
                  onClick={this.handleItemClick}
                >
                  Login
                </Menu.Item>

                <Menu.Item
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    textAlign: 'center',
                    float: 'center',
                    fontSize: 'h2'
                  }}
                  as={Link}
                  name="signup"
                  to="/signup"
                  active={activeItem === 'signup'}
                  onClick={this.handleItemClick}
                >
                  Sign Up
                </Menu.Item>
              </Menu>
            </div>
          )}
        </nav>
        <hr />
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
