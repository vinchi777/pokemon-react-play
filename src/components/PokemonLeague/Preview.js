import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { pokemonActions } from 'modules/entities/pokemons';
import { notification, Row, Col, Input, Button } from 'antd';
import 'styles/preview.css';

const Preview = () => {
  const pokemons = useSelector(state => state.entities.pokemons);
  const pageState = useSelector(state => state.pages.pokemonLeague);
  const [inputs, setInputs] = useState({name: ''});
  const dispatch = useDispatch();

  useEffect(() => {
    if (pokemons.byId[pageState.currentPreview]) {
      console.log('trigger')
      setInputs(pokemons.byId[pageState.currentPreview])
    }
  }, [pageState])

  const handleSubmit = (event) => {
    if (event) { event.preventDefault(); }
    dispatch(pokemonActions.setItem({ [pageState.currentPreview]: inputs }))
    alert('success', 'Saved')
  }

  const handleInputChange = (event) => {
    const {name, value} = event.target;
    setInputs({...inputs, [name]: value});
  }

  const alert = (type, msg) => {
    notification[type]({
      message: msg,
    })
  }

  return (
    <div className="preview-container">
      <h1 className="preview-header">Pokemon Data</h1>
      { !!pageState.currentPreview && (
        <form onSubmit={handleSubmit}>
          <Row gutter={16}>
            <Col span={12}>
              <label>Name</label>
              <Input name="name" onChange={ handleInputChange } value={inputs.name} />
            </Col>

            <Col span={12}>
              <label>Hair style</label>
              <Input name="hairstyle" onChange={ handleInputChange } value={inputs.hairstyle} />
            </Col>

            <Col span={12}>
              <label>Weight</label>
              <Input name="weight" onChange={ handleInputChange } value={inputs.weight} />
            </Col>

            <Col span={12}>
              <label>Height</label>
              <Input name="height" onChange={ handleInputChange } value={inputs.height} />
            </Col>

            <Col span={12}>
              <Button htmlType="submit" type="primary" size="large">Save</Button>
            </Col>
          </Row>
        </form>
      )  }
      { !pageState.currentPreview && (
        <Col span={24}>
          <div className="empty-form">
            <p> Change pokemon data from your lineup. </p>
          </div>
        </Col>
      ) }
    </div>
  )
};

export default Preview;
