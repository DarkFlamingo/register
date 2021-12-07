/* eslint-disable */
import * as React from 'react';
import moment from 'moment';
import { BlankItem, Button } from 'src/components/common/common';
import './styles.scss';

const BlankCheckResult = ({ blank, onClose }) => {
  return (
    <>
      <div className={'modal-custom-check'}>
        <div className={'modal-content'}>
          <div className={'blank-check-wrapper'}>
            {blank && <BlankItem blank={blank} />}
            {blank === null && (
              <div className={'blank-check-false'}>
                Інформація про витрачання бланка в Єдиному реєстрі спеціальних
                бланків нотаріальних документів відсутня
              </div>
            )}
            {(blank || blank === null) && (
              <div
                className={'blank-check-data'}
              >{`Дата та час перевірки бланка: ${moment().format(
                'DD / MM / YY, h:mm:ss'
              )}`}</div>
            )}
          </div>
          <Button className={'blank-check-btn'} color="black" onClick={onClose}>
            Закрити
          </Button>
        </div>
      </div>
    </>
  );
};

export default BlankCheckResult;
