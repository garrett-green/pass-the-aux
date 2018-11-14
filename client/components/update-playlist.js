// import React, {Component} from 'react'
// import {withRouter} from 'react-router-dom'
// import {createNewPlaylist} from '../store/playlist'
// import {connect} from 'react-redux'
// import {Button, Segment, Grid} from 'semantic-ui-react'

// const mapState = state => {
//   return {
//     user: state.user,
//     playlist: state.newPlaylist
//   }
// }

// const mapDispatch = dispatch => {
//   return {
//     makePlaylist: (user, title) => dispatch(createNewPlaylist(user, title))
//   }
// }

// export class UpdatePlaylist extends Component {
//   constructor() {
//     super()
//     this.state = {
//       title: ''
//     }
//     this.handleSubmit = this.handleSubmit.bind(this)
//   }

//   handleSubmit(evt) {
//     evt.preventDefault()
//     const user = this.props.user
//     user.playlistName = this.state.title
//     this.props.makePlaylist(user).then(playlist => {
//       console.log('playlist made:', playlist)
//     })
//   }

//   componentDidUpdate(prevProps) {
//     if (
//       this.props.playlist.id &&
//       this.props.playlist.id !== prevProps.playlist.id
//     ) {
//       this.props.history.push('/pick-genre')
//     }
//   }

//   render() {
//     return (
//       <div
//         style={{
//           padding: '10px',
//           margin: '10px'
//         }}
//       >
//         <Grid centered columns={2}>
//           <Segment>
//             <form onSubmit={this.handleSubmit}>
//               <Grid.Column>
//                 <input
//                   type="text"
//                   required
//                   id="playlist-title"
//                   label="Playlist Name"
//                   value={this.state.title}
//                   onChange={evt => this.setState({title: evt.target.value})}
//                 />
//               </Grid.Column>

//               <Grid.Column>
//                 <Button color="green" type="submit">
//                   Create Playlist
//                 </Button>
//               </Grid.Column>
//             </form>
//           </Segment>
//         </Grid>
//       </div>
//     )
//   }
// }

// export default withRouter(connect(mapState, mapDispatch)(UpdatePlaylist))
