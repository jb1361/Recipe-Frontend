import React from 'react';
import {Redirect} from 'react-router-dom';
import {RoutePaths} from '../../router/RoutePaths';

export function Home() {
    return (
      <Redirect to={RoutePaths.Recipe}/>
    );
}
