import { Abstract } from '../abstract/abstract.repository';

class OldValue extends Abstract {
  constructor({ oldValueModel }) {
    super(oldValueModel);
  }
}

export { OldValue };