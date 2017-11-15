/* UI model for swagger form */

import { action, observable } from 'mobx';

export default class UI {
  @observable schemaDialog = {
    open: false
  };

  @action
  setDialogOpen(isOpen) {
    this.schemaDialog.open = isOpen;
  } 
}