import React from 'react';
import { observer } from 'mobx-react';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

import store from './models';

@observer
export default class SchemaDialog extends React.Component {

  handleRequestClose = () => {
    store.uiStore.setDialogOpen(false);
  }

  render() {
    return (
      <Dialog open={store.uiStore.schemaDialog.open} onRequestClose={this.handleRequestClose}>
        <DialogTitle>Schema Editor</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Let Google help apps determine location. This means sending anonymous location data to
            Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleRequestClose}>
            Cancel
          </Button>
          <Button onClick={this.handleRequestClose} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}