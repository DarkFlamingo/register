import * as React from 'react';
import { List } from 'src/components/common/common';
import { blankType } from 'src/common/prop-types/prop-types';

const BlankItem = ({ blank }) => (
  <List.Item>
    <List.Icon name="github" size="large" verticalAlign="middle" />
    <List.Content>
      <List.Header>{`${blank.code.code} - ${blank.code.name}`}</List.Header>
      <List.Description as="a">{blank.issueDate}</List.Description>
      <List.Description as="a">{blank.issueDate}</List.Description>
    </List.Content>
  </List.Item>
);

BlankItem.propTypes = {
  blank: blankType.isRequired
};

export default BlankItem;
