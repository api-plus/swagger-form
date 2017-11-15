import React from 'react';
import classnames from 'classnames';
import { observer } from 'mobx-react';
import { withStyles } from 'material-ui/styles';
import { object, array } from 'prop-types';
import Card, { CardContent } from 'material-ui/Card';
import { FormControl } from 'material-ui/Form';
import Input, { InputLabel } from 'material-ui/Input';
import MenuItem from 'material-ui/Menu/MenuItem';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Select from 'material-ui/Select';
import Typography from 'material-ui/Typography';
import { RemoveCircleOutline } from 'material-ui-icons';

import Parameter from './Parameter';
import Response from './Response';
import store from './models';

const styles = theme => ({
  sltMethod: {
    width: '20%',
    paddingRight: '10px'
  },
  sltConsumes: {
    width: '20%',
    paddingRight: '10px'
  },
  sltProduces: {
    width: '20%',
    paddingRight: '10px'
  },
  iptPathname: {
    width: '40%',
    paddingRight: '10px'
  },
  textField: {
    paddingRight: '10px'
  },
  subheading: {
    paddingTop: '25px'
  },
  noData: {
    color: '#999',
    fontSize: '80%'
  },
  parameterForm: {
    width: '95%',
    display: 'inline-block'
  },
  responseForm: {
    width: '95%',
    display: 'inline-block'
  },
  removeBtn: {
    color: '#666',
    cursor: 'pointer',
    width: '5%'
  },
  smallLinkBtn: {
    color: theme.palette.background.primary,
    fontSize: '80%'
  },
  fieldset: {
    borderColor: '#aaa',
    borderStyle: 'solid',
    borderWidth: '1px',
    margin: '10px 10px 0 0',
    color: '#666'
  }
});

@observer
class Operation extends React.Component {

  static propTypes = {
    definitions: array,
    value: object.isRequired,
    classes: object.isRequired,
  };

  static defaultProps = {
    definitions: []
  };

  static defaultPath = {
    path: '/api/new/path',
    method: 'get',
    description: 'This is a description',
    responses: [],
  };

  handlePathnameChange = (e) => {
    this.props.value.setPathname(e.target.value);
    store.swagger.onChange();
  }

  handleMethodChange = (e) => {
    this.props.value.setMethod(e.target.value);
    store.swagger.onChange();
  }

  handleConsumesChange = (e) => {
    let consumes = e.target.value;
    if (consumes.length === 0) return;

    this.props.value.setConsumes(consumes);
    store.swagger.onChange();
  }
  
  handleProducesChange = (e) => {
    let produces = e.target.value;
    if (produces.length === 0) return;

    this.props.value.setProduces(produces);
    store.swagger.onChange();
  }

  handleDescChange = (e) => {
    this.props.value.setDesc(e.target.value);
    store.swagger.onChange();
  }

  handleParamAddClick = () => {
    this.props.value.addParameter();
  }
  handleParamRemoveClick = (index) => {
    this.props.value.removeParameter(index);
  }
  handleResAddClick = () => {
    this.props.value.addResponse();
  }
  handleResRemoveClick = (response) => {
    this.props.value.removeResponse(response.statusCode);
  }

  render() {
    const { classes, className, definitions } = this.props;
    const operation = this.props.value;

    return (
      <div className={classnames('schema-form-operation', className)}>
        <TextField
          label="Pathname"
          value={operation.pathname}
          onChange={this.handlePathnameChange}
          className={classes.iptPathname}
        />

        <TextField
          select
          label="Method"
          margin="normal"
          value={operation.method}
          className={classes.sltMethod}
          onChange={this.handleMethodChange}
        >
          <MenuItem value="get">GET</MenuItem>
          <MenuItem value="post">POST</MenuItem>
          <MenuItem value="put">PUT</MenuItem>
          <MenuItem value="delete">DELETE</MenuItem>
        </TextField>

        <FormControl className={classes.sltConsumes}>
          <InputLabel>Consumes</InputLabel>
          <Select 
            multiple 
            value={Array.from(operation.consumes)}
            onChange={this.handleConsumesChange}
          >
            <MenuItem value="application/json">application/json</MenuItem>
            <MenuItem value="multipart/form-data">multipart/form-data</MenuItem>
            <MenuItem value="application/x-www-form-urlencoded">application/x-www-form-urlencoded</MenuItem>
          </Select>
        </FormControl>

        <FormControl className={classes.sltProduces}>
          <InputLabel>Produces</InputLabel>
          <Select 
            multiple 
            value={Array.from(operation.produces)}
            onChange={this.handleProducesChange}
          >
            <MenuItem value="application/json">application/json</MenuItem>
          </Select>
        </FormControl>

        <TextField
          fullWidth
          label="Description"
          value={operation.description}
          className={classes.textField}
          onChange={this.handleDescChange}
          />

        <Typography className={classes.subheading} type="subheading" component="h3">
          Parameters 
        </Typography>
        {
          operation.parameters
          ? operation.parameters.map((parameter, i) => (
              <div key={`${parameter.name}-${i}`}>
                <Parameter className={classes.parameterForm} value={parameter} />
                <RemoveCircleOutline 
                  className={classes.removeBtn} 
                  onClick={this.handleParamRemoveClick.bind(this, i)} 
                />
              </div>
            ))
          : <span className={classes.noData}>No Parameters &nbsp;</span>
        }
        <a 
          className={classes.smallLinkBtn} 
          href="javascript: void(0);" 
          onClick={this.handleParamAddClick}
        >
          + Add One
        </a>
        
        <Typography className={classes.subheading} type="subheading" component="h3">
          Responses
        </Typography>
        {
          operation.responseArr.map((response, i) => (
            <div key={`${response.statusCode}-${i}`}>
              <Response className={classes.responseForm} value={response} />
              {
                response.statusCode !== 'default' && (
                  <RemoveCircleOutline 
                    className={classes.removeBtn} 
                    onClick={this.handleResRemoveClick.bind(this, response)}
                  />
                )
              }
            </div>
          ))
        }
        <a className={classes.smallLinkBtn} href="javascript: void(0);" onClick={this.handleResAddClick}>+ Add One</a>

      </div>
    );
  }
}

export default withStyles(styles)(Operation);