import React, { Component } from 'react';
import api from '../../api';
import './Countries.css';

class Countries extends Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: []
    }
  }
  handleDelete(idClicked) {
    api.deleteCountry(idClicked)
    .then(data => {
      console.log('Delete', data)
      this.setState({
        // The new countries are the ones where the _id are differenty from idClicked
        countries: this.state.countries.filter(c => c._id !== idClicked)
      })
    })
  }
  render() {
    return (
      <div className="Countries">
        <h2>List of countries</h2>
        <table className="countries-list">
          <thead>
            <tr>
              <th>Name</th>
              <th>Capital</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.countries.map(c => 
            <tr key={c._id}>
              <td>{c.name}</td>
              <td>{c.capitals}</td>
              <td><button onClick={()=> this.handleDelete(c._id)}>Delete</button><button>Edit</button></td>
            </tr>
            )}
          </tbody>
        </table>
        
      </div>
    );
  }
  componentDidMount() {
    api.getCountries()
      .then(countries => {
        console.log(countries)
        this.setState({
          countries: countries
        })
      })
      .catch(err => console.log(err))
  }
}

export default Countries;
