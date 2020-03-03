import React, { Component } from 'react'
import { withRouter } from 'react-router'

class Footer extends Component {
  render() {
    return (
      <div className="flex pa1 justify-between nowrap orange">
        <div className="flex flex-fixed black">

        </div>
      </div>
    )
  }
}

export default withRouter(Footer)