import React, {FormEvent, useEffect, useState} from 'react';
import IconButton from '../../../../components/util/widgets/IconButton/IconButton';
import {RoutePaths} from '../../../../router/RoutePaths';
import {bindActionCreators, Dispatch} from 'redux';
import {holdemSocketStore} from '../../../../common/redux/holdem/holdemSocket';
import {WebState} from '../../../../redux/types/WebState';
import {connect} from 'react-redux';
import {useMount} from '../../../../hooks/useMount';
import {RouteComponentProps} from 'react-router';
import {Button, Form} from 'react-bootstrap/es';
import {EPokerAction, EPokerStatus, gamesStore, HoldemCard, HoldemPlayer} from '../../../../common/redux/holdem/games';
import {FormControlProps} from 'react-bootstrap/FormControl';
import {getCard} from '../../../../appTheme';
import uuid from 'uuid';

type Props = RouteComponentProps<{tableId: string}> & ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

function HoldemGame(props: Props) {
  const {currentGame, getOldPlayerId, actions: {joinTable, leaveTable, joinSeat, sendPokerAction}, match: {params: {tableId}}} = props;
  useMount(async () => {
    const oldId = getOldPlayerId(tableId);
    if (!currentGame && oldId) {
      await joinTable(tableId, oldId);
    } else {
      await joinTable(tableId, null);
    }
  });

  useEffect(() => {
    function exit() {
      leaveTable();
    }
    return () => exit();
  }, [tableId, leaveTable]);

  const [currentBet, setCurrentBet] = useState('');

  const renderButtonOrPlayer = (seat: number) => {
    if (currentGame !== null) {
      const player = currentGame.holdemPlayers.find((p: HoldemPlayer) => p.seat === seat);
      if (player) {
        return renderPlayer(player);
      }
      if (!currentGame.started) {
        return (
          <Button onClick={() => joinSeat(tableId, seat)}>Seat {seat}</Button>
        );
      } else {
        return (
          <Button onClick={() => false} disabled={true}>Seat {seat}</Button>
        );
      }
    }
  };

  const renderTable = () => {
    return (
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', marginLeft: '4rem', marginRight: '4rem'}}>
          {renderButtonOrPlayer(7)}
        </div>
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-around', marginLeft: '4rem', marginRight: '4rem'}}>
          {renderButtonOrPlayer(8)}
          {renderButtonOrPlayer(6)}
        </div>
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', marginLeft: '4rem', marginRight: '4rem'}}>
          <div style={{display: 'flex', justifyContent: 'center'}}>
            {renderButtonOrPlayer(1)}
          </div>
          <label>Pot: {currentGame ? currentGame.pot : 0}</label>
          <div>
            {currentGame ? renderCards(currentGame.tableCards) : null}
          </div>
          <div style={{display: 'flex', justifyContent: 'center'}}>
            {renderButtonOrPlayer(5)}
          </div>
        </div>
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-around', marginLeft: '4rem', marginRight: '4rem'}}>
          {renderButtonOrPlayer(2)}
          {renderButtonOrPlayer(4)}
        </div>
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', marginLeft: '4rem', marginRight: '4rem'}}>
          {renderButtonOrPlayer(3)}
        </div>
      </div>
    );
  };

  const renderBlind = (seat: number) => {
    if (seat === currentGame!.bigBlindSeat) {
      return (
        <label>Big blind: {currentGame!.bigBlindAmount}</label>
      );
    }
    if (seat === currentGame!.smallBlindSeat) {
      return (
        <label>Small blind: {currentGame!.bigBlindAmount / 2}</label>
      );
    }
  };

  const renderCards = (cards: HoldemCard[]) => {
    return cards.map(card => {
      return (
        <img
          key={`${card.suit}${card.rank}-${uuid.v4().toString()}`}
          src={getCard(`${card.suit}${card.rank}`)}
          style={{marginRight: '1rem', maxHeight: '8rem'}}
          alt={`${card.suit} ${card.rank}`}
        />
      );
    });
  };
  const renderPlayer = (p: HoldemPlayer) =>  (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <label>{p.username}</label>
      <label>Chips: {p.chips}</label>
      <label>Cards: {renderCards(p.cards)}</label>
      <label>Status: {EPokerStatus[p.pokerStatus]}</label>
      {renderBlind(p.seat)}
    </div>
  );

  const renderActions = () => {
    return currentGame?.currentPlayer?.pokerActions.map((action: EPokerAction) => {
      if (EPokerAction[action] === 'Raise') {
        return (
          <div key={action}>
            <div style={{marginLeft: '1rem', marginRight: '1rem'}}>
              <Button onClick={() => sendPokerAction(action, currentBet)}>{EPokerAction[action]}</Button>
            </div>
            <Form>
              <Form.Control
                type={'number'}
                value={currentBet.toString()}
                onChange={(event: FormEvent<FormControlProps>) => {
                setCurrentBet(event.currentTarget.value!.toString());
              }}
              />
            </Form>
          </div>
        );
      }
      return (
        <div key={action} style={{marginLeft: '1rem', marginRight: '1rem'}}>
          <Button onClick={() => sendPokerAction(action, '')}>{EPokerAction[action]}</Button>
        </div>
      );
    });
  };

  const renderOtherInformation = () => currentGame ? (
    <>
      <div style={{display: 'flex'}}>
        <label>Spectators: {currentGame.holdemPlayers.filter((p: HoldemPlayer) => p.seat === 0).length}</label>
      </div>
    </>
  ) : null;

  return (
    <>
      <div>
        <IconButton icon={'arrow-left'} link={RoutePaths.holdemPaths.Lobby} styles={{marginRight: '1rem'}}/>
        Leave
      </div>
      <div style={{display: 'flex', minHeight: '75%', justifyContent: 'center'}}>
        {renderTable()}
      </div>
      <div style={{display: 'flex', justifyContent: 'center', marginTop: '2rem'}}>
        {renderActions()}
      </div>
      {renderOtherInformation()}
    </>
  );
}

const mapDispatchToProps = (dispatch: Dispatch) => ({actions: bindActionCreators({
    joinTable: holdemSocketStore.actions.joinTable,
    leaveTable: holdemSocketStore.actions.leaveTable,
    joinSeat: holdemSocketStore.actions.joinSeat,
    startGame: holdemSocketStore.actions.startGame,
    sendPokerAction: holdemSocketStore.actions.sendPokerAction
  }, dispatch)});
const mapStateToProps = (state: WebState) => ({
  currentGame: gamesStore.selectors.getCurrentGame(state),
  getOldPlayerId: gamesStore.selectors.getPreviousPlayerId(state)
});
export default connect(mapStateToProps, mapDispatchToProps)(HoldemGame);
