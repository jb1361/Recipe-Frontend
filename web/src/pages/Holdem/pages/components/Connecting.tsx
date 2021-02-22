import React, {useEffect} from 'react';
import {WebState} from '../../../../redux/types/WebState';
import {connect} from 'react-redux';
import {RouteComponentProps} from 'react-router';
import {bindActionCreators, Dispatch} from 'redux';
import {holdemSocketStore} from '../../../../common/redux/holdem/holdemSocket';
import {CenteredSpinner} from '../../../../components/util/widgets/CenteredSpinner/CenteredSpinner';

type Props = RouteComponentProps & ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

function Connecting({actions: {connectToServer}}: Props) {
  useEffect(() => {
    const reconnectInterval = setInterval(() => connectToServer(), 5000);
    return () => clearInterval(reconnectInterval);
  });

  return (
    <>
      <CenteredSpinner/>
      Connecting
    </>
  );
}

const mapDispatchToProps = (dispatch: Dispatch) => ({actions: bindActionCreators({
    connectToServer: holdemSocketStore.actions.connect
  }, dispatch)});
const mapStateToProps = (state: WebState) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(Connecting);
