import React from 'react';
import {WebState} from '../../../../redux/types/WebState';
import {connect} from 'react-redux';
import {RouteComponentProps} from 'react-router';
import {bindActionCreators, Dispatch} from 'redux';
import {holdemSocketStore} from '../../../../common/redux/holdem/holdemSocket';
import {useMount} from '../../../../hooks/useMount';
import BootstrapTable, {ColumnDescription} from 'react-bootstrap-table-next';
import {HoldemTable, tableStore} from '../../../../common/redux/entities/table';
import IconButton from '../../../../components/util/widgets/IconButton/IconButton';
import {RoutePaths} from '../../../../router/RoutePaths';

type Props = RouteComponentProps & ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

function HoldemLobby({actions: {getLobbyList}, tables}: Props) {

  useMount(async () => {
    await getLobbyList();
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
        <IconButton icon={'arrow-right'} link={RoutePaths.holdemPaths.Play.replace(':tableId', col.id)}/>
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
      <BootstrapTable keyField='id' data={tables} columns={columns}/>
    </>
  );
}

const mapDispatchToProps = (dispatch: Dispatch) => ({actions: bindActionCreators({
    getLobbyList: holdemSocketStore.actions.getLobbyList
  }, dispatch)});
const mapStateToProps = (state: WebState) => ({
  tables: tableStore.selectors.getAsArray(state)
});
export default connect(mapStateToProps, mapDispatchToProps)(HoldemLobby);
