import * as React from 'react';
import {
  Grid,
  CheckBlankModal,
  Modal,
  Button,
  BlankItem,
  Image
} from 'src/components/common/common';
import moment from 'moment';
import { USER_AVA_URL } from 'src/common/constants/constants';
import { useDispatch, useSelector } from 'react-redux';
import { blankActionCreator } from 'src/store/actions';
import styles from './styles.module.scss';

const MainUser = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const { blank } = useSelector(state => ({
    blank: state.blank.validBlank
  }));

  const setOpen = isOpen => {
    setIsModalOpen(isOpen);
  };

  const dispatch = useDispatch();

  const handleCheckBlank = data => {
    dispatch(blankActionCreator.checkBlank(data));
  };

  const checkBlank = async ({ series, number }) => {
    handleCheckBlank({ series, number });
  };

  return (
    <Grid.Column className={styles['main-user-wrapper']}>
      <Grid.Row className={styles['main-user-ava-wrapper']}>
        <Image
          className={styles['main-user-ava']}
          size="small"
          src={USER_AVA_URL}
        />
      </Grid.Row>
      <Grid.Row className={styles['main-user-check-blank']}>
        <Modal
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={isModalOpen}
          trigger={<Button>Перевірка бланка</Button>}
        >
          <CheckBlankModal setOpen={setOpen} checkBlank={checkBlank} />
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
                'DD / MM / YY, h:mm:ss'
              )}`}
            </div>
          )}
        </div>
      </Grid.Row>
    </Grid.Column>
  );
};

export default MainUser;
