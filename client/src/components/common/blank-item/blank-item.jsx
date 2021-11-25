/* eslint-disable */
import * as React from 'react';
import { List } from 'src/components/common/common';
import moment from 'moment';
import { blankType } from 'src/common/prop-types/prop-types';

const BlankItem = ({ blank }) => (
  <List.Item>
    <List.Content>
      <List.Header>{`Серія: ${blank.series}`}</List.Header>
      <List.Description>{`Номер: ${blank.number}`}</List.Description>
      {blank.code ? (
        <>
          <List.Description>{`Код: ${blank.code.code}`}</List.Description>
          <List.Description>{`Номер: ${blank.code.name}`}</List.Description>
        </>
      ) : (
        <List.Description>{`Бланк не витрачений`}</List.Description>
      )}
      <List.Description>{`Дата створення: ${moment(blank.issueDate).format(
        'DD / MM / YY, h:mm:ss'
      )}`}</List.Description>
    </List.Content>
  </List.Item>
);

BlankItem.propTypes = {
  blank: blankType.isRequired
};

export default BlankItem;
