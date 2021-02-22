import React, {useState} from 'react';
import {Container, Row, Col, Card} from 'react-bootstrap';
import styles from './Recipe.module.scss';
import {RouteComponentProps} from 'react-router';
import {connect} from 'react-redux';
import {useMount} from '../../hooks/useMount';
import {PageHeader} from '../../components/layout/PageHeader/PageHeader';
import {CenteredSpinner} from '../../components/util/widgets/CenteredSpinner/CenteredSpinner';
import {CenteredErrorMessage} from '../../components/util/widgets/CenteredErrorMessage/CenteredErrorMessage';
import {WebState} from '../../redux/types/WebState';
import RecipeRoutes from './RecipeRoutes';
import {bindActionCreators, Dispatch} from 'redux';
import {handleAxiosError} from '../../common/util/http';
import {loadRecipes} from '../../common/redux/entities/recipe';

type Props = RouteComponentProps & ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

function Recipe({match, actions}: Props) {
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  useMount(async () => {
    try {
      await actions.loadRecipes();
    } catch (e) {
      setErrorMessage(handleAxiosError(e, {connectionMsg: 'Failed to load recipes'}));
    }
    setLoading(false);
  });

  const renderContent = () => {
    return (
      <Row noGutters={true} style={{flexGrow: 1}}>
        <Col>
          <Card className={styles['page-body']} style={{borderLeftWidth: 0, borderRightWidth: 0}}>
            <Card.Body>
              <RecipeRoutes match={match}/>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    );
  };

  return (
    <PageHeader label='Recipes' removeMargin={true}>
      <Container fluid={true} className={styles['config-container']}>
        {loading ?  <CenteredSpinner/> : (
          errorMessage ? <CenteredErrorMessage message={errorMessage} /> :
            renderContent()
        )}
      </Container>
    </PageHeader>
  );

}

const mapDispatchToProps = (dispatch: Dispatch) => ({ actions: bindActionCreators({loadRecipes: loadRecipes}, dispatch)});
const mapStateToProps = (state: WebState) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(Recipe);
