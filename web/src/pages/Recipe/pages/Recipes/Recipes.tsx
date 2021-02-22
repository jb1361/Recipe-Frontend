import React, {useState} from 'react';
import {WebState} from '../../../../redux/types/WebState';
import {connect} from 'react-redux';
import {RouteComponentProps} from 'react-router';
import {bindActionCreators, Dispatch} from 'redux';
import BootstrapTable, {ColumnDescription} from 'react-bootstrap-table-next';
import {loadRecipes, Recipe, recipeStore} from '../../../../common/redux/entities/recipe';
import IconButton from '../../../../components/util/widgets/IconButton/IconButton';
import {RoutePaths} from '../../../../router/RoutePaths';
import {Redirect} from 'react-router-dom';

type Props = RouteComponentProps & ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

function Recipes({recipes}: Props) {
  const [redirectUrl, setRedirectUrl] = useState('');
  const renderRedirect = () => redirectUrl ? <Redirect to={redirectUrl}/> : null;

  const viewButton = (row: any, col: Recipe) => {
    return (
      <div>
        <IconButton
          icon={'eye'}
          link={RoutePaths.recipePaths.View.replace(':recipeId', col.id.toString())}
          customSize={20}
          iconToolTipText={'View Recipe'}
        />
      </div>
    );
  };

  const columns: ColumnDescription[] = [
    {
      dataField: 'author',
      text: 'Author'
    },
    {
      dataField: 'title',
      text: 'Title'
    },
    {
      dataField: 'editRecipe',
      text: '',
      isDummyField: true,
      formatter: (row: any, col: any) => viewButton(row, col),
      headerStyle: () => {
        return { width: '3rem'};
      },
      style: () => {
        return { width: '3rem'};
      }
    }
  ];

  return (
    <>
      {renderRedirect()}
      <div style={{display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem', marginRight: '.5rem'}}>
        <IconButton icon={'plus-circle'} onClick={() => setRedirectUrl(RoutePaths.recipePaths.New)} size={'2x'} iconToolTipText={'Add Recipe'}/>
      </div>
      <BootstrapTable keyField='id' data={recipes} columns={columns}/>
    </>
  );
}

const mapDispatchToProps = (dispatch: Dispatch) => ({ actions: bindActionCreators({loadRecipes: loadRecipes}, dispatch)});
const mapStateToProps = (state: WebState) => ({recipes: recipeStore.selectors.getAsArray(state)});
export default connect(mapStateToProps, mapDispatchToProps)(Recipes);
