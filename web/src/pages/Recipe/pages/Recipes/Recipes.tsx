import React, {useState} from 'react';
import {WebState} from '../../../../redux/types/WebState';
import {connect} from 'react-redux';
import {RouteComponentProps} from 'react-router';
import {bindActionCreators, Dispatch} from 'redux';
import BootstrapTable, {ColumnDescription} from 'react-bootstrap-table-next';
import {HoldemTable, tableStore} from '../../../../common/redux/entities/table';
import {useMount} from '../../../../hooks/useMount';
import {handleAxiosError} from '../../../../common/util/http';
import {loadRecipes, recipeStore} from '../../../../common/redux/entities/recipe';

type Props = RouteComponentProps & ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

function Recipes({recipes, actions, match}: Props) {
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [leftPaneExpanded, setLeftPaneExpanded] = useState(false);

  useMount(async () => {
    try {
      await actions.loadRecipes();
    } catch (e) {
      setErrorMessage(handleAxiosError(e, {connectionMsg: 'Failed to load recipes'}));
    }
    setLoading(false);
  });

  const tableStatusFormatter = (cell: any, table: HoldemTable) => {
    return (
      <>
        <div style={{marginRight: '10px', display: 'flex', justifyContent: 'center'}}>
          {table.started ? 'Playing' : 'Waiting for players'}
        </div>
      </>
    );
  };

  const joinButton = (row: any, col: HoldemTable) => {
    return (
      <div>
        test
        {/*<IconButton icon={'arrow-right'} link={RoutePaths.holdemPaths.Play.replace(':tableId', col.id)}/>*/}
      </div>
    );
  };

  const columns: ColumnDescription[] = [
    {
      dataField: 'name',
      text: 'Name'
    },
    {
      dataField: 'buyInAmount',
      text: 'Buy In'
    },
    {
      dataField: 'tableStatusField',
      text: 'Status',
      isDummyField: true,
      formatter: tableStatusFormatter,
      headerStyle: () => {
        return { width: '10rem'};
      },
      style: () => {
        return { width: '10rem'};
      }
    },
    {
      dataField: 'players',
      text: 'Players'
    },
    {
      dataField: 'joinTable',
      text: '',
      isDummyField: true,
      formatter: (row: any, col: any) => joinButton(row, col)
    }
  ];

  return (
    <>
      <BootstrapTable keyField='id' data={recipes} columns={columns}/>
    </>
  );
}

const mapDispatchToProps = (dispatch: Dispatch) => ({ actions: bindActionCreators({loadRecipes: loadRecipes}, dispatch)});
const mapStateToProps = (state: WebState) => ({recipes: recipeStore.selectors.getAsArray(state)});
export default connect(mapStateToProps, mapDispatchToProps)(Recipes);
