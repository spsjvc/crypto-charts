import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Popover, Input, Button, Icon, Form } from 'antd';

class SaveLayoutMenu extends Component {
  static propTypes = {
    onSaveLayout: PropTypes.func.isRequired
  };

  state = {
    isPopoverVisible: false,
    inputValue: ' '
  };

  handleClick = () => {
    this.setState({
      isPopoverVisible: true
    });
  };

  onPressEnter = value => {
    const { onSaveLayout } = this.props;

    this.setState(
      {
        inputValue: value
      },
      () => {
        if (value !== '') {
          onSaveLayout(value);

          this.setState({
            inputValue: ' ',
            isPopoverVisible: false
          });
        }
      }
    );
  };

  render() {
    const { isPopoverVisible, inputValue } = this.state;

    return (
      <Popover
        placement="topRight"
        style={{ alignItems: 'right' }}
        visible={isPopoverVisible}
        onVisibleChange={visible => {
          this.setState({
            isPopoverVisible: visible
          });
        }}
        content={
          <Form.Item
            validateStatus={inputValue === '' ? 'error' : 'success'}
            help="Name is required."
          >
            <Input
              ref={ref => {
                this.input = ref;
              }}
              placeholder="Name this layout"
              onPressEnter={e => {
                this.onPressEnter(e.target.value);
              }}
            />
          </Form.Item>
        }
      >
        <Button
          style={{ position: 'fixed', bottom: '25px', left: '610px' }}
          onClick={this.handleClick}
        >
          Save this layout <Icon type="save" />
        </Button>
      </Popover>
    );
  }
}

export default SaveLayoutMenu;
