import React from 'react';
import {Redirect} from 'react-router-dom';
import {RoutePaths} from '../../router/RoutePaths';

export class Home extends React.Component {
  render() {
    return (
      <Redirect to={RoutePaths.Holdem}/>
    );
  }
}
