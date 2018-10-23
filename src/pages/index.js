import React from 'react'
import { navigateTo } from 'gatsby-link'

import Layout from '../components/layout'

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

class IndexPage extends React.Component {
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()
    const form = e.target
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': form.getAttribute('name'),
        ...this.state,
      }),
    })
      .then(() => navigateTo(form.getAttribute('action')))
      .catch(error => alert(error))
  }

  render() {
    return (
      <Layout>
        <form
          name="contact"
          method="post"
          action="/thanks/"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          onSubmit={this.handleSubmit}
        >
          <div className="form-group">
            <label htmlFor="">Name</label>
            <input
              type="text"
              name="name"
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="button-container">
            <button
              className="button is-rounded secondary-button"
              href="#"
              type="submit"
            >
              Send
            </button>
          </div>
        </form>
      </Layout>
    )
  }
}

export default IndexPage
