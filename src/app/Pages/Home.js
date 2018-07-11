import React, { PureComponent } from 'react'
import _ from 'lodash'

class Home extends PureComponent {
  constructor(props) {
    super(props)
    this.api = 'https://api.les-aides.fr'
    this.params = '?idc=bf640e06c507f3e08872686b1f2c9b21381f2b6c&format=json'
    this.state = {
      dispositifs: [],
      filieres: [],
      departements: [],
      naf: [],
      currentNaf: [],
      reset: false,
      userApe: '',
      userSiret: '',
      userFilieres: undefined,
      userDepartements: undefined,
    }
  }
  componentDidMount() {
    this.ul = this.el.querySelector('.hasButton ul.naf')
    const getNaf = fetch(`${this.api}/liste/naf/${this.params}`).then((response) => {
      response.json().then(naf => this.setState({ naf, currentNaf: naf }))
    })
    const getFilieres = fetch(`${this.api}/liste/filieres/${this.params}`).then((response) => {
      response.json().then(filieres => this.setState({ filieres }))
    })
    const getDepartements = fetch(`${this.api}/liste/departements/${this.params}`).then((response) => {
      response.json().then(departements => this.setState({ departements }))
    })
    Promise.all([getFilieres, getDepartements, getNaf])
  }
  setFilieres = event => this.setState({ userFilieres: event.target.value }, () => this.query())
  setSiret = event => this.setState({ userSiret: event.target.value }, () => this.query())
  setDepartement = event => this.setState({ userDepartements: event.target.value }, () => this.query())
  resetNaf = () => this.setState({ reset: false, currentNaf: this.state.naf, userApe: '' }, () => this.query())
  filterNaf = (code) => {
    const { currentNaf } = this.state
    const next = currentNaf.filter(r => r.code === code)[0]
    if (next) {
      this.setState({
        currentNaf: next.activites,
        userApe: next.code,
        reset: true,
      }, () => this.query())
    }
  }
  query = () => {
    const {
      userApe,
      userSiret,
      userFilieres,
      userDepartements,
    } = this.state
    if (userApe) {
      let query = `&ape=${userApe}`
      if (userSiret) query += `&siret=${userSiret}`
      if (userFilieres) query += `&filiere=${userFilieres}`
      if (userDepartements) query += `&departement=${userDepartements}`
      fetch(`${this.api}/aides/${this.params}&domaine=4${query}`).then((response) => {
        response.json().then(res => this.setState({ dispositifs: res.dispositifs }))
      })
    }
  }
  toggleNaf = () => this.el.querySelector('.hasButton .field').classList.toggle('active')
  spinner = size => (!size ? <div className="loading"><div className="spinner" /></div> : null)
  dispositifs = () => {
    const { dispositifs } = this.state
    if (_.size(dispositifs) === 0) return null
    return (
      <div className="dispositifs">
        <h1>Dispositifs</h1>
        <ul>
          {dispositifs.map(d => <li key={d.numero}><a href={d.uri} target="_blank">{d.nom} <strong>{d.sigle}</strong></a></li>)}
        </ul>
      </div>
    )
  }
  renderNaf = (currentNaf) => {
    if (_.size(currentNaf) === 0) return null
    return currentNaf.map(n => <li key={`naf${n.code}`} onClick={() => this.filterNaf(n.code)}>{n.code} - {n.libelle}</li>)
  }
  renderButton() {
    const { reset } = this.state
    if (reset) return <button onClick={() => this.resetNaf()}>x</button>
    return <button onClick={() => this.toggleNaf()}>...</button>
  }
  render() {
    const {
      filieres,
      departements,
      currentNaf,
      userApe,
      naf,
    } = this.state
    return (
      <div ref={el => this.el = el} className="container">
        {this.spinner(_.size(naf))}
        <h1>Description de l'entreprise</h1>
        <p>Si votre entreprise existe, entrez son numéro SIRET, sinon choisissez l'activité qui vous concerne grace au bouton […] ou en entrant directement le code NAF</p>
        <label>
          <span>Votre SIRET *</span>
          <div className="field">
            <input type="text" onChange={this.setSiret} />
          </div>
        </label>
        <label className="hasButton">
          <span>ou votre activité *</span>
          <div className="field">
            <input type="text" value={userApe} />
            {this.renderButton()}
            <ul className="naf">
              {this.renderNaf(currentNaf)}
            </ul>
          </div>
        </label>
        <hr />
        <label>
          <span>Filière marché</span>
          <div className="field">
            <select onChange={this.setFilieres}>
              <option value="">Toutes les filières marché</option>
              {filieres.map(filiere => <option key={`fil${filiere.numero}`} value={filiere.numero}>{filiere.libelle}</option>)}
            </select>
          </div>
        </label>
        <label>
          <span>Département</span>
          <div className="field">
            <select onChange={this.setDepartement}>
              <option value="">Tous les départements</option>
              {departements.map(departement => <option key={`dep${departement.departement}`} value={departement.departement}>{departement.nom}</option>)}
            </select>
          </div>
        </label>
        <em>* Les champs suivis d'un astérisque sont obligatoires</em>
        {this.dispositifs()}
      </div>
    )
  }
}

export default Home
