import React from 'react';
import ReactCheckbox from 'react-native-check-box';
import { ViewPropTypes } from 'react-native';
import SvgIcon from 'react-native-svg-icon/lib/components/SvgIcon';
import svgs from '../assets/svg';
import T from 'prop-types';
import { colors } from '../styles';
import Typography from '../styles/Typography';

const CheckBox = ({ onClick, isChecked, leftView, leftText, style, rightText, ...props }) => (
  <ReactCheckbox
    onClick={onClick}
    isChecked={isChecked}
    leftTextView={leftView ? leftView : undefined}
    leftText={leftText}
    rightText={rightText}
    style={style}
    checkedImage={<SvgIcon svgs={svgs} name={'checkbox-fill-icon'} width={17} height={17}  />}
    unCheckedImage={<SvgIcon svgs={svgs} name={'checkbox-icon'} width={17} height={17}  />}
    rightTextStyle={{ color: colors.textColor, fontFamily: 'Navigo-Regular', ...Typography.bodyTwo,marginTop:-2 }}
    {...props}
  />
);

CheckBox.propTypes = {
  onClick: T.func.isRequired,
  isChecked: T.bool.isRequired,
  leftView: T.element,
  leftText: T.string,
  style: ViewPropTypes.style,
  rightText: T.string,
};
export default CheckBox;
