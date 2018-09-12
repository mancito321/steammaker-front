import React from 'react';
import { browserHistory, Router, Route, Link, withRouter } from 'react-router';
class Filter extends React.Component {
constructor(props) {
super(props);
this.onChange = this.onChange.bind(this);
}  
onChange(e) {
 this.props.setFilter(e.target.value) 
}
render() {
 return (
            <div className="searchInput">
                <span>Buscar</span><input 
                  type="text" 
                  className="form-control filter"
                  placeholder="Ingresa un término de búsqueda" 
                  onChange={this.onChange}
                />
                
              </div> 
 )
}
}
export default Filter;