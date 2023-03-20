import { TouchableOpacity, View } from 'react-native';
import React, { useCallback, useMemo } from 'react';
import s from './styles';
import TextView from '../../components/TextView';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentChildData } from '../../services/childService';
import { isEmpty } from '../../helpers/helpers';
import AppAvtar from '../../components/Avtar/AppAvtar';

const MoreProfileModal = ({ onRequestClose }) => {
  const childSelector = useSelector((state) => state.child);

  const { childList } = childSelector;
  const dispatch = useDispatch();

  const onClickChild = useCallback(
    (child) => {
      dispatch(setCurrentChildData(child));
      onRequestClose();
    },
    [dispatch, onRequestClose],
  );

  const childProfileView = useMemo(() => {
    if (!isEmpty(childList))
      return childList?.map((child, index) => {
        return (
          <TouchableOpacity
            activeOpacity={0.7}
            style={s.firstRow}
            onPress={() => onClickChild(child)}
            key={`childprofileview_index_${index}`}>
            <AppAvtar
              Imgsrc={child?.profileLink ? child?.profileLink : undefined}
              Name={child?.firstName}
              Size={26}
              TextType={'title'}
            />
            {/* <Image source={require('../../assets/image/ellie.png')} style={s.imgPopup} /> */}
            <TextView text={`${child?.firstName} ${child?.lastName}`} type={'caps'} style={s.nameChild} />
          </TouchableOpacity>
        );
      });
    return null;
  }, [childList, onClickChild]);
  return <View style={s.ModalConntainer}>{childProfileView}</View>;
};

export default MoreProfileModal;
