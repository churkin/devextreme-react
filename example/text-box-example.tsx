/* eslint-disable react/no-unused-state */
import * as React from 'react';
import dxTextBox from 'devextreme/ui/text_box';
import Example from './example-block';

import { Button } from '../src/button';
import { TextBox } from '../src/text-box';
import { RequiredRule, Validator } from '../src/validator';

export default class extends React.Component<any, { text: string; uncontrolledText: string; }> {
  private textBox: dxTextBox;

  constructor(props: unknown) {
    super(props);
    this.state = {
      text: 'text',
      uncontrolledText: 'initial text',
    };

    this.handleChange = this.handleChange.bind(this);
    this.updateUncontrolledValue = this.updateUncontrolledValue.bind(this);
    this.setFocusToTextBox = this.setFocusToTextBox.bind(this);
  }

  private setFocusToTextBox() {
    this.textBox.focus();
  }

  private updateUncontrolledValue() {
    this.setState({
      uncontrolledText: `#${this.textBox.option('value')}`,
    });
  }

  private handleChange(e: any) {
    this.setState({
      text: `#${(e.value as string).toUpperCase().replace('A', '_')}`,
    });
  }

  public render(): React.ReactNode {
    const { text } = this.state;
    return (
      <Example title="DxTextBox" state={this.state}>
        uncontrolled mode
        <TextBox
          defaultValue="initial text"
          ref={(ref) => {
            if (ref) {
              this.textBox = ref.instance;
            }
          }}
        />
        <br />
        <Button onClick={this.setFocusToTextBox} text="Set focus" />
        <Button onClick={this.updateUncontrolledValue} text="Update text" />
        <br />
        <br />
        controlled state value
        <TextBox value={text} valueChangeEvent="input" />
        <br />
        controlled state value with change handling
        <TextBox value={text} onValueChanged={this.handleChange} valueChangeEvent="input" />
        <br />
        validation (required)
        <TextBox valueChangeEvent="input" defaultValue="required text">
          <Validator>
            <RequiredRule message="this is required" />
          </Validator>
        </TextBox>
      </Example>
    );
  }
}
