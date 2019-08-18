import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { pokemonSelectors } from 'modules/entities/pokemons';
import { pageActions } from 'modules/pages/pokemonLeague';
import { Card, Row, Col } from 'antd';
import 'styles/lineup.css';

const Lineup = () => {
  const pokemons = useSelector(state => state.entities.pokemons);
  const dispatch = useDispatch();
  const registeredPokemons = useSelector(state => pokemonSelectors.registered(state.entities.pokemons));
  const pageState = useSelector(state => state.pages.pokemonLeague);
  const numberOfCards = 6;

  const preview = (id) => {
    console.log(id)
    dispatch(pageActions.preview(id))
  }

  return (
    <div className="lineup-container">
      <h1 className="lineup-header">Pokemon Lineup</h1>
      <Row gutter={16}>
        {
          registeredPokemons.map(id => (
            <Col span={8} key={id}>
              <Card
                hoverable
                bordered
                className={ (pageState.currentPreview && pageState.currentPreview == id) ? "active" : "" }
                onClick={ () => preview(id) }
              >
                <img alt="example" src={ pokemons.byId[id].sprites.front_default } width="100%"/>
              </Card>
            </Col>

          ) )
        }
        {
          [...Array(numberOfCards - registeredPokemons.length)].map((e, i) => (
            <Col span={8} key={i}>
              <div className="empty-entry-lineup">
                <p className="">{ registeredPokemons.length + i + 1 }</p>
              </div>
            </Col>
          ))
        }
      </Row>

    </div>
  )
}

export default Lineup;
