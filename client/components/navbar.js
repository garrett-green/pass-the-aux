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
      <div>
        <h1>PASS THE AUX</h1>
        <nav>
          {isLoggedIn ? (
            <div>
              {/* The navbar will show these links after you log in */}
              <Menu>
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
                  as={Link}
                  name="login"
                  to="/login"
                  active={activeItem === 'login'}
                  onClick={this.handleItemClick}
                >
                  Login
                </Menu.Item>

                <Menu.Item
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

// import React from 'react'
// import PropTypes from 'prop-types'
// import {connect} from 'react-redux'
// import {Link} from 'react-router-dom'
// import {logout} from '../store'

// const Navbar = ({handleClick, isLoggedIn}) => (
//   <div>
//     <h1>COMING SOON: DOPE PLAYLISTS</h1>
//     <nav>
//       {isLoggedIn ? (
//         <div>
//           {/* The navbar will show these links after you log in */}
//           <Link to="/home">Home</Link>
//           <a href="#" onClick={handleClick}>
//             Logout
//           </a>
//         </div>
//       ) : (
//         <div>
//           {/* The navbar will show these links before you log in */}
//           <Link to="/login">Login</Link>
//           <Link to="/signup">Sign Up</Link>
//         </div>
//       )}
//     </nav>
//     <hr />
//   </div>
// )

// /**
//  * CONTAINER
//  */
// const mapState = state => {
//   return {
//     isLoggedIn: !!state.user.id
//   }
// }

// const mapDispatch = dispatch => {
//   return {
//     handleClick() {
//       dispatch(logout())
//     }
//   }
// }

// export default connect(mapState, mapDispatch)(Navbar)

// /**
//  * PROP TYPES
//  */
// Navbar.propTypes = {
//   handleClick: PropTypes.func.isRequired,
//   isLoggedIn: PropTypes.bool.isRequired
// }
