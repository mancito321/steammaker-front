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
                <input 
                  type="text" 
                  className="form-control"
                  placeholder="Filtrar" 
                  onChange={this.onChange}
                />
                <label htmlFor="Buscar" className="icon icon-1202" rel="tooltip" title="buscar"></label>
              </div> 
 )
}
}
export default Filter;