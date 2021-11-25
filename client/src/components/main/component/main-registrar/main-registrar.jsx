import * as React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useAction } from 'src/hooks/useAction';
import {
  Grid,
  CheckBlankModal,
  Modal,
  Button,
  BlankItem,
  Image,
  AddBlankModal,
  GetExtractModal,
  Extract
} from 'src/components/common/common';
import moment from 'moment';
import { REGISTAR_AVA_URL } from 'src/common/constants/constants';
import { blank as blankService } from 'src/services/services';
import styles from './styles.module.scss';

const MainRegistrar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddBlank, setIsAddBlank] = useState(false);
  const [isGetExtract, setIsGetExtract] = useState(false);

  const { blank, extract } = useSelector(state => ({
    blank: state.blank.validBlank,
    extract: state.extract.extract
  }));

  const setOpen = isOpen => {
    setIsModalOpen(isOpen);
  };

  const { checkBlank, setExtract } = useAction();

  const handleCheckBlank = async ({ series, number }) => {
    checkBlank({ series, number });
  };

  const handleAddBlank = async data => {
    blankService.addBlank(data);
  };

  return (
    <Grid.Column className={styles['main-user-wrapper']}>
      <Grid.Row className={styles['main-user-ava-wrapper']}>
        <Grid.Column className={styles['main-button-wrapper']}>
          <Modal
            onClose={() => setIsAddBlank(false)}
            onOpen={() => setIsAddBlank(true)}
            open={isAddBlank}
            trigger={<Button>Додати бланк</Button>}
          >
            <AddBlankModal setOpen={setIsAddBlank} addBlank={handleAddBlank} />
          </Modal>
        </Grid.Column>
        <Grid.Column>
          <Image
            className={styles['main-user-ava']}
            size="small"
            src={REGISTAR_AVA_URL}
          />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row className={styles['main-user-check-blank']}>
        <div className={styles['admin-panel']}>
          <Modal
            onClose={() => setIsGetExtract(false)}
            onOpen={() => setIsGetExtract(true)}
            open={isGetExtract}
            trigger={<Button>Отримати витяг</Button>}
          >
            <GetExtractModal setOpen={setIsGetExtract} />
          </Modal>
          {extract && (
            <Extract extract={extract} onClose={() => setExtract(null)} />
          )}
          <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={isModalOpen}
            trigger={<Button>Перевірка бланка</Button>}
          >
            <CheckBlankModal setOpen={setOpen} checkBlank={handleCheckBlank} />
          </Modal>
        </div>
        <div className={styles['blank-wrapper']}>
          {blank && <BlankItem blank={blank} />}
          {blank === null && (
            <div className={styles['blank-check-false']}>
              Інформація про витрачання бланка в Єдиному реєстрі спеціальних
              бланків нотаріальних документів відсутня
            </div>
          )}
          {(blank || blank === null) && (
            <div>
              {`Дата та час перевірки бланка: ${moment().format(
                'MMMM Do YYYY, h:mm:ss'
              )}`}
            </div>
          )}
        </div>
      </Grid.Row>
    </Grid.Column>
  );
};

export default MainRegistrar;
