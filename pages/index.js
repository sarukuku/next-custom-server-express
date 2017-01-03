import React from 'react'

export default class extends React.Component {
  static getInitialProps ({ query }) {
    return { query }
  }

  render () {
    return (
      <div>
        {JSON.stringify(this.props.query)}
      </div>
    )
  }
}
