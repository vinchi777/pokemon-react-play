import React from 'react';
import { Layout, Row, Col } from 'antd';
import Pokedex from './Pokedex';
import Lineup from './Lineup';
import Preview from './Preview';
import './style.css';

const { Header, Content } = Layout;

const PokemonLeague = () => {
  return (
    <Layout>
      <Header>
        <h2 className="title">Pokemon League</h2>
      </Header>
      <Layout>
        <Content style={{ padding: '30px 50px' }}>
          <Row>
            <Col span={14} className="lineup-preview-container" style={{ padding: '0px 50px' }}>
              <Lineup />
              <Preview />
            </Col>
            <Col span={10} className="pokedex-container" style={{ padding: '0px 50px' }}>
              <Pokedex />
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  )
}

export default PokemonLeague;
