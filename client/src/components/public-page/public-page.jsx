import * as React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useAction } from 'src/hooks/useAction';
import {
  Grid,
  CheckBlankModal,
  Modal,
  Button,
  BlankCheckResult,
  Message,
  NavLink
} from 'src/components/common/common';
import { AppRoute } from 'src/common/enums/enums';
import styles from './styles.module.scss';

const PublicPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { blank } = useSelector(state => ({
    blank: state.blank.validBlank,
    extract: state.extract.extract
  }));

  const setOpen = isOpen => {
    setIsModalOpen(isOpen);
  };

  const { checkBlank, setValidBlank } = useAction();

  const handleCheckBlank = async ({ series, number }) => {
    checkBlank({ series, number });
  };

  return (
    <Grid
      textAlign="center"
      verticalAlign="middle"
      className="fill main-content"
    >
      <Grid.Column className={styles['main-user-wrapper']}>
        <Grid.Row className={styles['main-user-check-blank']}>
          <div className={styles['admin-panel']}>
            <Modal
              onClose={() => setOpen(false)}
              onOpen={() => setOpen(true)}
              open={isModalOpen}
              trigger={<Button>Перевірка бланка</Button>}
            >
              <CheckBlankModal
                setOpen={setOpen}
                checkBlank={handleCheckBlank}
              />
            </Modal>
          </div>
          <div className={styles['blank-wrapper']}>
            {blank !== false && (
              <BlankCheckResult
                blank={blank}
                onClose={() => setValidBlank(false)}
              />
            )}
          </div>
        </Grid.Row>
        <Grid.Row className={styles['message-wrapper-container']}>
          <div className={styles['message-wrapper']}>
            <Message className="question">
              Вже з нами?
              <NavLink exact to={AppRoute.LOGIN}>
                Увійти
              </NavLink>
            </Message>
          </div>
        </Grid.Row>
      </Grid.Column>
    </Grid>
  );
};

export default PublicPage;
