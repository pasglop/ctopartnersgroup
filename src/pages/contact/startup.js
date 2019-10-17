import React from 'react'
import { navigate } from 'gatsby-link'
import Layout from '../../components/Layout'

function encode(data) {
  const formData = new FormData()

  for (const key of Object.keys(data)) {
    formData.append(key, data[key])
  }

  return formData
}

export default class Startup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleAttachment = e => {
    this.setState({ [e.target.name]: e.target.files[0] })
  }

  handleSubmit = e => {
    e.preventDefault()
    const form = e.target
    fetch('/', {
      method: 'POST',
      body: encode({
        'form-name': form.getAttribute('name'),
        ...this.state,
      }),
    })
      .then(() => navigate(form.getAttribute('action')))
      .catch(error => alert(error))
  }

  render() {
    return (
      <Layout>
        <section className="section">
          <div className="container">
            <div className="content column is-offset-1 is-10">
              <h1>Déposer un dossier</h1>
              <form
                name="file-upload"
                method="post"
                action="/contact/thanks/"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                onSubmit={this.handleSubmit}
              >
                {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
                <input type="hidden" name="form-name" value="file-upload" />
                <div hidden>
                  <label>
                    Don’t fill this out:{' '}
                    <input name="bot-field" onChange={this.handleChange} />
                  </label>
                </div>
                  <div className="field">
                      <label className="label" htmlFor={'name'}>
                          Votre nom
                      </label>
                      <div className="control">
                          <input
                              className="input"
                              type={'text'}
                              name={'name'}
                              onChange={this.handleChange}
                              id={'name'}
                              required={true}
                          />
                      </div>
                  </div>
                <div className="field">
                  <label className="label" htmlFor={'email'}>
                    Votre email
                  </label>
                  <div className="control">
                    <input
                        className="input"
                        type={'email'}
                        name={'email'}
                        onChange={this.handleChange}
                        id={'email'}
                        required={true}
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label" htmlFor={'email'}>
                    Votre téléphone
                  </label>
                  <div className="control">
                    <input
                        className="input"
                        type={'tel'}
                        name={'tel'}
                        onChange={this.handleChange}
                        id={'tel'}
                        required={true}
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label" htmlFor={'message'}>
                    Nom & description de votre projet
                  </label>
                  <div className="control">
                    <textarea
                        className="textarea"
                        name={'message'}
                        onChange={this.handleChange}
                        id={'message'}
                        required={true}
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label" htmlFor={'name'}>
                    Vous pouvez nous joindre un deck (optionnel)
                  </label>
                  <div className="file">
                    <label className="file-label">
                      <input
                        className="file-input"
                        type="file"
                        name="attachment"
                        onChange={this.handleAttachment}
                      />
                      <span className="file-cta">
                        <span className="file-label">Choose a file…</span>
                      </span>
                    </label>
                  </div>
                </div>
                <div className="field">
                  <button className="button is-link" type="submit">
                    Envoyer mon dossier
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </Layout>
    )
  }
}
