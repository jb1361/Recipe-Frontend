import React from 'react';
import {connect} from 'react-redux';
import {RoutePaths} from '../../../../router/RoutePaths';
import {Link} from 'react-router-dom';

function HoldemHome() {
  return (
    <>
      <Link to={RoutePaths.holdemPaths.Lobby}>Play</Link>
    </>
  );
}

const mapDispatchToProps = () => ({});
const mapStateToProps = () => ({});
export default connect(mapStateToProps, mapDispatchToProps)(HoldemHome);
