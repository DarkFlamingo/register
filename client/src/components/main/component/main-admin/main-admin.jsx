import * as React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useAction } from 'src/hooks/useAction';
import {
  Grid,
  CheckBlankModal,
  Modal,
  Button,
  Image,
  ManageRegistrarsModal,
  ManageUsersModal,
  GetExtractModal,
  Extract,
  LogsModal,
  BlankCheckResult
} from 'src/components/common/common';
import { ADMIN_AVA_URL } from 'src/common/constants/constants';
import styles from './styles.module.scss';

const MainAdmin = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isManageRegistrars, setIsManageRegistrars] = useState(false);
  const [isManageUsers, setIsManageUsers] = useState(false);
  const [isGetExtract, setIsGetExtract] = useState(false);
  const [isLogsModal, setIsLogsModal] = useState(false);

  const { blank, extract } = useSelector(state => ({
    blank: state.blank.validBlank,
    extract: state.extract.extract
  }));

  const setOpen = isOpen => {
    setIsModalOpen(isOpen);
  };

  const { checkBlank, setExtract, setValidBlank } = useAction();

  const handleCheckBlank = async ({ series, number }) => {
    checkBlank({ series, number });
  };

  return (
    <Grid.Column className={styles['main-user-wrapper']}>
      <Grid.Row className={styles['main-user-ava-wrapper']}>
        <Grid.Column className={styles['main-button-wrapper']}>
          <Button onClick={() => setIsLogsModal(true)}>Перегляд історії</Button>
          {isLogsModal && <LogsModal onClose={() => setIsLogsModal(false)} />}
        </Grid.Column>
        <Grid.Column>
          <Image
            className={styles['main-user-ava']}
            size="small"
            src={ADMIN_AVA_URL}
          />
        </Grid.Column>
        <Grid.Column className={styles['main-button-wrapper']}>
          <Button onClick={() => setIsManageRegistrars(true)}>
            Керування Реєстраторами
          </Button>
          {isManageRegistrars && (
            <ManageRegistrarsModal
              onClose={() => setIsManageRegistrars(false)}
            />
          )}
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
          <Button onClick={() => setIsManageUsers(true)}>
            Зареєструвати реєстратора
          </Button>
          <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={isModalOpen}
            trigger={<Button>Перевірка бланка</Button>}
          >
            <CheckBlankModal setOpen={setOpen} checkBlank={handleCheckBlank} />
          </Modal>
        </div>
        {isManageUsers && (
          <ManageUsersModal onClose={() => setIsManageUsers(false)} />
        )}
        <div className={styles['blank-wrapper']}>
          {blank !== false && (
            <BlankCheckResult
              blank={blank}
              onClose={() => setValidBlank(false)}
            />
          )}
        </div>
      </Grid.Row>
    </Grid.Column>
  );
};

export default MainAdmin;
