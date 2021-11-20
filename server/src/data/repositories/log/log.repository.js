import { Abstract } from '../abstract/abstract.repository';

class Log extends Abstract {
  constructor({ logModel }) {
    super(logModel);
  }
}

export { Log };