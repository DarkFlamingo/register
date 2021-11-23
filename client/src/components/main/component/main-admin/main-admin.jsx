/* eslint-disable */
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
  ManageRegistrarsModal
} from 'src/components/common/common';
import moment from 'moment';
import { ADMIN_AVA_URL } from 'src/common/constants/constants';
import styles from './styles.module.scss';

const MainAdmin = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isManageRegistrars, setIsManageRegistrars] = useState(false);

  const { blank } = useSelector(state => ({
    blank: state.blank.validBlank
  }));

  const setOpen = isOpen => {
    setIsModalOpen(isOpen);
  };

  const { checkBlank } = useAction();

  const handleCheckBlank = async ({ series, number }) => {
    checkBlank({ series, number });
  };

  return (
    <Grid.Column className={styles['main-user-wrapper']}>
      <Grid.Row className={styles['main-user-ava-wrapper']}>
        <Grid.Column className={styles['main-button-wrapper']}>
          <Button>
            Керування Реєстраторами
          </Button>
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
        <Modal
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={isModalOpen}
          trigger={<Button>Перевірка бланка</Button>}
        >
          <CheckBlankModal setOpen={setOpen} checkBlank={handleCheckBlank} />
        </Modal>
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

export default MainAdmin;
