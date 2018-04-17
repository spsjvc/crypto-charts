import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'antd';

const steps = [
  {
    image: 'add-charts.gif',
    title: 'Easily add charts for the most popular coins!',
    description:
      'Just select a coin and the desired period from the menu on the left.'
  },
  {
    image: 'arrange-charts.gif',
    title: 'Customize your layout!',
    description: 'Arrange and resize your charts however you like.'
  },
  {
    image: 'save-layout.gif',
    title: 'Save your favorite layouts!',
    description: 'Save your most important charts and easily load them later.'
  },
  {
    image: 'save-layout.gif',
    title: 'You are all set for Crypto charts!',
    description:
      "If you ever need to replay this tutorial, just click the 'Help' button in the lower right corner."
  }
];

class Tutorial extends Component {
  static propTypes = {
    onCancel: PropTypes.func.isRequired,
    isVisible: PropTypes.bool.isRequired
  };

  state = {
    step: 0
  };

  handleOk = () => {
    const { onCancel } = this.props;
    const { step } = this.state;

    if (step === steps.length - 1) {
      onCancel();
      return;
    }

    this.setState({
      step: step + 1
    });
  };

  render() {
    const { onCancel, isVisible } = this.props;
    const { step } = this.state;

    return (
      <Modal
        width="700px"
        title="Crypto charts"
        closable={false}
        visible={isVisible}
        footer={
          <div>
            {step === steps.length - 1 ? null : (
              <Button onClick={onCancel}>Cancel</Button>
            )}
            <Button onClick={this.handleOk} type="primary">
              {step === steps.length - 1 ? "Let's go!" : 'Next'}
            </Button>
          </div>
        }
      >
        <div style={{ textAlign: 'center' }}>
          {step === steps.length - 1 ? null : (
            <div>
              <img
                alt={steps[step].image}
                style={{ width: '600px' }}
                src={steps[step].image}
              />
              <br />
              <br />
            </div>
          )}
          <h3>{steps[step].title}</h3>
          <h4>{steps[step].description}</h4>
        </div>
      </Modal>
    );
  }
}

export default Tutorial;
