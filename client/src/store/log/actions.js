import { createAction } from '@reduxjs/toolkit';
import { log as logService } from 'src/services/services';

const ActionType = {
  SET_LOGS: 'extract/set-extract'
};

const setLogs = createAction(ActionType.SET_LOGS, logs => ({
  payload: {
    logs
  }
}));

const loadLogs = () => async dispatch => {
  const logs = await logService.getAllLogs();

  dispatch(setLogs(logs));
};

export { setLogs, loadLogs };
