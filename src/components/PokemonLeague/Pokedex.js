import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { pokemonActions } from 'modules/entities/pokemons';
import { Divider, Card, Alert, notification, Progress, Tag, Row, Col, Input, Button, Spin, Avatar } from 'antd';
import { pokemonSelectors } from 'modules/entities/pokemons';
import { pageActions } from 'modules/pages/pokemonLeague';
import 'styles/pokedex.css';

const { Search } = Input;

const Pokedex = () => {
  const dispatch = useDispatch();
  const [searchedId, setSearchedId] = useState();
  const [loading, setLoading] = useState(false);
  const pokemons = useSelector(state => state.entities.pokemons);
  const registeredPokemons = useSelector(state => pokemonSelectors.registered(state.entities.pokemons));

  const search = (name) => {
    if ( !name ) { alert('warning', 'Please enter pokemon name'); return };
    setLoading(true)
    dispatch(pokemonActions.search(name))
      .then((pokemon) => {
        setSearchedId(pokemon.id);
      })
      .catch(e => {
        let msg = (e.respons && e.response.status === 404) ? "Pokemon Not Found" :  "Something went wrong";
        alert('error', msg);
      })
      .finally(_ => {
        setLoading(false);
      });
  }

  const register = () => {
    if (registeredPokemons.length >= 6) {
      alert('error', 'Pokemon Lineup Full');
    } else {
      const pokemon = pokemons.byId[searchedId]
      pokemon['registered'] = true;
      dispatch(pokemonActions.setItem({ [pokemon.id]: pokemon }))
    }
  }

  const unregister = () => {
    const pokemon = pokemons.byId[searchedId]
    pokemon['registered'] = false;
    dispatch(pokemonActions.setItem({ [pokemon.id]: pokemon }));
    dispatch(pageActions.preview(null));
  }

  const alert = (type, msg) => {
    notification[type]({
      message: msg,
    })
  }

  return (
    <Card className="pokedex-wrapper">
      <Search
        placeholder="search a pokemon"
        enterButton
        size="large"
        autoFocus
        onSearch={ val => search(val) }
      />

      <Spin spinning={loading}>
        { pokemons.byId[searchedId] &&
          <Row type="flex" justify="center" style={{marginTop: '20px'}}>
            <Col span={24} align="center">
              <Avatar src={ pokemons.byId[searchedId].sprites.front_default } size={128} style={{ backgroundColor: '#eee' }}/>
              <h1 className="pokemon-name">{ pokemons.byId[searchedId].name }</h1>
            </Col>
            <Divider />
            <Col span={24} className="pokemon-details">
              <h1>Details</h1>
              <Col span={12}>
                <label>Weight:</label> <span>{ pokemons.byId[searchedId].weight }</span>
              </Col>
              <Col span={12}>
                <label>Height:</label> <span>{ pokemons.byId[searchedId].height }</span>
              </Col>
              <Col span={12}>
                <label>Hairstyle:</label> <span>{ pokemons.byId[searchedId].hairstyle }</span>
              </Col>
              <Col span={12}>
                <label>Experience</label> <span>{ pokemons.byId[searchedId].base_experience }</span>
              </Col>
            </Col>

            <Col span={24} className="pokemon-abilities">
              <h1>Stats</h1>
              { pokemons.byId[searchedId].stats.map((item) => (
                <div key={item.stat.name} >
                  <span>{ item.stat.name }</span>
                  <Progress percent={item.base_stat} />
                </div>
              )) }
            </Col>

            <Col span={24} className="pokemon-abilities">
              <h1>Abilities</h1>
              { pokemons.byId[searchedId].abilities.map((skill) => (
                <Tag key={skill.ability.name} color="magenta">{ skill.ability.name }</Tag>
              )) }
            </Col>

            <Col span={24} className="pokemon-forms">
              <h1>Forms</h1>
              { pokemons.byId[searchedId].forms.map((form) => (
                <Tag key={form.name} color="volcano">{ form.name }</Tag>
              )) }
            </Col>

            <Col span={24} className="pokemon-types">
              <h1>Types</h1>
              { pokemons.byId[searchedId].types.map((item) => (
                <Tag key={item.type.name} color="cyan">{ item.type.name }</Tag>
              )) }
            </Col>
            <Col span={24} style={{ margin: "30px 0px", textAlign: "center" }}>
              { !pokemons.byId[searchedId]["registered"] && <Button onClick={register} size="large" type="primary" block> Add to Lineup</Button> }
              { pokemons.byId[searchedId]["registered"] && <Alert message="Added to Lineup" type="success"/> }
              { pokemons.byId[searchedId]["registered"] && <Button style={{ marginTop: "10px" }} onClick={unregister} type="danger" ghost> Remove </Button> }
            </Col>
          </Row>
        }
        {
          !pokemons.byId[searchedId] &&
            <Row align="middle" justify="center" type="flex" style={{minHeight: '500px'}}>
              <Col span={24} align="center">
                <h1>POKEDEX</h1>
                <p>Search your best pokemons and add them to your lineup</p>
              </Col>
            </Row>
        }
      </Spin>
    </Card>
  )
};

export default Pokedex
