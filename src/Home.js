import React, { Component } from 'react'
import { fetchDataYesNo } from './actions'
import { connect } from 'react-redux'
import {
  Link
} from 'react-router-dom'
class Home extends Component {
  static fetchData(match, store) {
    return store.dispatch(fetchDataYesNo())
    // return this.handlers.getData()
  }
  componentDidMount() {
    if (!this.props.data) {
      this.props.fetchData()
    }
  }
  render() {
    if (this.props.data)
      return (
        <div>
          <h1>
            {this.props.data.answer}
          </h1>
          <img src={this.props.data.image} alt/>
          <h2 onClick={this.props.fetchData}>Reload</h2>
          <style jsx>
            {`
              h1 {
                color: palevioletred
              }
            `}
          </style>
          <Link to="/people">People List</Link>
        </div>
      )

    else
      return <h1 onClick={this.props.fetchData}>No answer</h1>
  }
}

const mapStateToProps = (state, {params}) => ({
  data: state.data
})
export default connect(mapStateToProps, {fetchData: fetchDataYesNo})(Home)
