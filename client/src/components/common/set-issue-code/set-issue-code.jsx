/* eslint-disable */
import * as React from 'react';
import { Modal, Button, Form, Select } from 'src/components/common/common';
import { ButtonType } from 'src/common/enums/enums';
import { ISSUE_CODE } from 'src/common/constants/constants';
import styles from './styles.module.scss';

const UpdateBlankModal = ({ setOpen, updateBlank, blank }) => {
  const [option, setOption] = React.useState(
    blank.code
      ? {
          code: blank.code.code,
          name: blank.code.name
        }
      : null
  );

  const handleAddBlank = () => {
    if (option) {
      updateBlank({
        id: blank.id,
        issueDate: Date.now(),
        code: option.code,
        name: option.name
      });
    } else {
    }
    setOpen(null);
  };

  const getOptions = () => {
    return Object.entries(ISSUE_CODE).map(([key, value]) => ({
      value: { code: key, name: value },
      label: value.length > 30 ? `${value.slice(0, 30)}...` : value
    }));
  };

  return (
    <div className={styles['update-wrapper']}>
      <Modal.Header>
        <h3>Внести дані витрачання</h3>
      </Modal.Header>
      <Modal.Content image>
        <Modal.Description>
          <Form name="checkBlankForm" size="large">
            <div className={styles['input-wrapper']}>
              <div className={styles['input-item']}>
                <label>Код витрачання</label>
                <Select
                  options={getOptions()}
                  onChange={obj => setOption(obj.value)}
                />
              </div>
            </div>
          </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions className={styles['btn-wrapper']}>
        <Button color="black" onClick={() => setOpen(null)}>
          Закрити
        </Button>
        <Button
          type={ButtonType.SUBMIT}
          content="Yep, that's me"
          labelPosition="right"
          icon="checkmark"
          onClick={handleAddBlank}
          positive
          isDisabled={!(option)}
        >
          Оновити
        </Button>
      </Modal.Actions>
    </div>
  );
};

export default UpdateBlankModal;
