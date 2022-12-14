import * as PropTypes from 'prop-types';
import * as React from 'react';
import { uuid4 } from '../../utils/utils';
import {
  BUTTON_CLASSES,
  ICON_CLASS,
  LABEL_CLASSES,
  PICKER_GROUP_CLASSES,
  STAT_CLASSES,
} from '../../constants/classes';

/* eslint-disable */
/**
 * @uxpincomponent
 * @uxpinwrappers
 * SkipContainerWrapper
 */
export default class PickerGroup extends React.Component {
  render() {
    const uuid = uuid4();
    const pickersToRender = [];
    const required = <abbr className={`${LABEL_CLASSES.REQUIRED}`} title="Required field">*</abbr>;
    const optional = <abbr className={`${LABEL_CLASSES.OPTIONAL}`} title="Optional field">(optional)</abbr>;
    let message = '';

    if (this.props.required && this.props.required === 'required') {
      message = required;
    } else if (this.props.required && this.props.required === 'optional')  {
      message = optional;
    }

    const info = this.props.info ?
      <div className={`${STAT_CLASSES.TITLE_HELP}`}
      onClick={this.props.clickInfo}
      onMouseEnter={this.props.mouseOverInfo}
      onMouseLeave={this.props.mouseLeaveInfo}>
        <button className={`${BUTTON_CLASSES.BUTTON} -icon -xs -flat`} aria-label="Help">
          <i className={`${ICON_CLASS} icon-circle-info-outline -icon--primary`}></i>
        </button>
      </div> : '';
    
    const fieldLabel = this.props.fieldLabel ?
      <legend className={`${LABEL_CLASSES.LABEL}`}>
        {this.props.fieldLabel}
        {message}
        {info}
      </legend> : '';

    Array(11).fill()
        .forEach((_, i) => {
          if (this.props[`picker${i}`]) {
            pickersToRender.push(
              <input
                className="chi-picker__input"
                type="radio"
                name={`picker-${uuid}`}
                id={`picker-${uuid}-${i}`}
                checked={this.props.selected === i}
                disabled={this.props[`disabled${i}`]}
              />
            );
            pickersToRender.push(
            <label
              for={`picker-${uuid}-${i}`}
              onClick={(e) => {
                if (this.props[`select${i}`]) {
                  const clickedLabelId = e.target.getAttribute('for');
                  const currentlyActivePicker = e.target.parentNode.querySelector('input[checked]');
                  const inputToCheck = document.getElementById(clickedLabelId);

                  this.props[`select${i}`]();
                  if (currentlyActivePicker)
                    currentlyActivePicker.checked = false;
                  inputToCheck.checked = true;
                } 
              }}>{this.props[`picker${i}`]}</label>
            );
          }
        });

    return (
      <div ref={this.props.uxpinRef} style={{ minWidth: this.props.fluid ? 310 : 308 }}>
        <fieldset>
          {fieldLabel}
          <div className={`${PICKER_GROUP_CLASSES.PICKER} ${this.props.fluid ? PICKER_GROUP_CLASSES.FLUID : ''}`}>
            {pickersToRender}
          </div>
        </fieldset>
      </div>
    );
  }
}

PickerGroup.propTypes = {
  fieldLabel: PropTypes.string,
  required: PropTypes.oneOf(['none', 'required', 'optional']),
  selected: PropTypes.oneOf(['None', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
  info: PropTypes.bool,
  clickInfo: PropTypes.func,
  mouseOverInfo: PropTypes.func,
  mouseLeaveInfo: PropTypes.func,
  fluid: PropTypes.bool,
  picker1: PropTypes.string,
  disabled1: PropTypes.bool,
  picker2: PropTypes.string,
  disabled2: PropTypes.bool,
  picker3: PropTypes.string,
  disabled3: PropTypes.bool,
  picker4: PropTypes.string,
  disabled4: PropTypes.bool,
  picker5: PropTypes.string,
  disabled5: PropTypes.bool,
  picker6: PropTypes.string,
  disabled6: PropTypes.bool,
  picker7: PropTypes.string,
  disabled7: PropTypes.bool,
  picker8: PropTypes.string,
  disabled8: PropTypes.bool,
  picker9: PropTypes.string,
  disabled9: PropTypes.bool,
  picker10: PropTypes.string,
  disabled10: PropTypes.bool,
  select1: PropTypes.func,
  select2: PropTypes.func,
  select3: PropTypes.func,
  select4: PropTypes.func,
  select5: PropTypes.func,
  select6: PropTypes.func,
  select7: PropTypes.func,
  select8: PropTypes.func,
  select9: PropTypes.func,
  select10: PropTypes.func,
};
/* eslint-enable */

PickerGroup.defaultProps = {
  fieldLabel: 'Field Label',
  picker1: 'Picker 1',
  picker2: 'Picker 2',
  picker3: 'Picker 3',
  required: 'none',
  selected: 1,
  info: false,
};
