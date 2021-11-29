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
  BlankCheckResult
} from 'src/components/common/common';
import { USER_AVA_URL } from 'src/common/constants/constants';
import styles from './styles.module.scss';

const MainUser = () => {
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
    <Grid.Column className={styles['main-user-wrapper']}>
      <Grid.Row className={styles['main-user-ava-wrapper']}>
        <Grid.Column>
          <Image
            className={styles['main-user-ava']}
            size="small"
            src={USER_AVA_URL}
          />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row className={styles['main-user-check-blank']}>
        <div className={styles['admin-panel']}>
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

export default MainUser;
