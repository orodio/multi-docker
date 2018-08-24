import React from 'react'
import axios from 'axios'

export class Fib extends React.Component {
  state = {
    seenIndexes: [],
    values: {},
    index: '',
  }

  componentDidMount () {
    axios
      .get('/api/values/current')
      .then(({ data }) => this.setState({ values: data }))

    axios
      .get('/api/values/all')
      .then(({ data }) => this.setState({ seenIndexes: data }))
  }

  handleSubmit = e => {
    e.preventDefault()

    axios
      .post('/api/values', { index: this.state.index })
      .then(_ => this.setState({ index: '' }))
  }

  render () {
    const { index, seenIndexes, values } = this.state
    return <div>
      <form onSubmit={this.handleSubmit}>
        <label>Enter your index:</label>
        <input value={index} onChange={e => this.setState({ index: e.target.value })}/>
        <button onClick={this.handleSubmit}>Submit</button>
      </form>

      <h3>Indexes I have seen:</h3>
      {seenIndexes.map(d => d.number).join(', ')}

      <h3>Calculated values:</h3>
      {Object.keys(values).map(key => {
        return <div key={key}>
          For index {key} I calculated {values[key]}
        </div>
      })}
    </div>
  }
}
