import React, {useState} from 'react';
import {Container, Row, Col, Card} from 'react-bootstrap';
import styles from './Holdem.module.scss';
import {RouteComponentProps} from 'react-router';
import {connect} from 'react-redux';
import {useMount} from '../../hooks/useMount';
import {PageHeader} from '../../components/layout/PageHeader/PageHeader';
import {CenteredSpinner} from '../../components/util/widgets/CenteredSpinner/CenteredSpinner';
import {CenteredErrorMessage} from '../../components/util/widgets/CenteredErrorMessage/CenteredErrorMessage';
import {WebState} from '../../redux/types/WebState';
import HoldemRoutes from './HoldemRoutes';
import {Dispatch} from 'redux';

type Props = RouteComponentProps & ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

function Holdem({match}: Props) {
  const [loading, setLoading] = useState(true);
  const [errorMessage] = useState<string | undefined>();
  useMount(async () => {
    setLoading(false);
  });
  const renderContent = () => {
    return (
      <Row noGutters={true} style={{flexGrow: 1}}>
        <Col>
          <Card className={styles['page-body']} style={{borderLeftWidth: 0, borderRightWidth: 0}}>
            <Card.Body>
              <HoldemRoutes match={match}/>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    );
  };

  return (
    <PageHeader label='Csgo Holdem' removeMargin={true}>
      <Container fluid={true} className={styles['config-container']}>
        {loading ?  <CenteredSpinner/> : (
          errorMessage ? <CenteredErrorMessage message={errorMessage} /> :
            renderContent()
        )}
      </Container>
    </PageHeader>
  );

}

const mapDispatchToProps = (dispatch: Dispatch) => ({});
const mapStateToProps = (state: WebState) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(Holdem);
