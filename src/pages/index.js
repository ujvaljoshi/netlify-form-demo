import React from 'react'
import { navigateTo } from 'gatsby-link'

import Layout from '../components/layout'

const encode = data => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

class IndexPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = { name: '', email: '', message: '' }
  }

  handleSubmit = e => {
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({ 'form-name': 'contact-us', ...this.state }),
    })
      .then(() => alert('Success!'))
      .catch(error => alert(error))

    e.preventDefault()
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value })

  render() {
    const { name, email, message } = this.state
    return (
      <Layout>
        <form
          onSubmit={this.handleSubmit}
          data-netlify="true"
          data-netlify-honeypot="bot-field"
        >
          <p>
            <label>
              Your Name:{' '}
              <input
                type="text"
                name="name"
                value={name}
                onChange={this.handleChange}
              />
            </label>
          </p>
          <p>
            <label>
              Your Email:{' '}
              <input
                type="email"
                name="email"
                value={email}
                onChange={this.handleChange}
              />
            </label>
          </p>
          <p>
            <label>
              Message:{' '}
              <textarea
                name="message"
                value={message}
                onChange={this.handleChange}
              />
            </label>
          </p>
          <p>
            <button type="submit">Send</button>
          </p>
        </form>
      </Layout>
    )
  }
}

export default IndexPage
