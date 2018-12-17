import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {Menu, Container} from 'semantic-ui-react'

class Navbar extends Component {
  constructor() {
    super()
    this.state = {}
  }
  handleItemClick = (e, {name}) => this.setState({activeItem: name})

  render() {
    const {handleClick, isLoggedIn} = this.props
    const {activeItem} = this.state

    if (isLoggedIn) {
      return (
        <>
          <h1 style={{textAlign: 'center'}}>PASS THE AUX</h1>
          <Menu fluid widths={3} size="huge">
            <Menu.Item
              as={Link}
              name="home"
              to="/home"
              active={activeItem === 'home'}
              onClick={this.handleItemClick}
            >
              Home
            </Menu.Item>

            <Menu.Item
              as={Link}
              name="make-playlist"
              to="/name-playlist"
              active={activeItem === 'make-playlist'}
              onClick={this.handleItemClick}
            >
              Make A New Playlist
            </Menu.Item>

            <Menu.Item
              name="logout"
              active={activeItem === 'logout'}
              onClick={handleClick}
            >
              Logout
            </Menu.Item>
          </Menu>
        </>
      )
    } else {
      return <div />
    }
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
