import React, { useCallback, useMemo, useState } from 'react';
import { View, TouchableOpacity, FlatList, KeyboardAvoidingView, Image } from 'react-native';
import Modal from 'react-native-modalbox';
import s from './Styles';
import { colors } from '../../styles';
import TextView from '../TextView';
import Touchable from '../molecules/Touchable';
import { TextInput } from 'react-native-paper';
import { isEmpty } from '../../helpers/helpers';
import { isIOS } from '../../constants/constant';

const CountryModal = ({ options, onValueChange, value }) => {
  const [searchText, setSearchText] = useState('');
  const [isOpenSearchModal, setSearchModal] = useState(false);

  const openModal = useCallback(() => {
    setSearchModal(true);
  }, []);

  const closeModal = useCallback(() => {
    setSearchModal(false);
    setSearchText('');
  }, []);

  const list = useMemo(() => {
    let result = options;
    if (!isEmpty(searchText)) {
      const search_text = searchText?.trim().toLowerCase();
      result = options?.filter(
        (x) =>
          (x?.country_name && x?.country_name?.trim().toLowerCase().includes(search_text)) ||
          (x?.country_code && x?.country_code?.trim().toLowerCase().includes(search_text)) ||
          (x?.country_phone_code && x?.country_phone_code?.trim().toLowerCase().includes(search_text)),
      );
    }
    return result;
  }, [options, searchText]);

  return (
    <>
      <TouchableOpacity onPress={openModal} style={s.inputWrapper}>
        <View style={s.selectedImageWrap}>
          <Image style={s.selectedimage} source={{ uri: value?.flag }} />
        </View>
        <TextView text={`+${value?.country_phone_code}`} type={'body'} />
      </TouchableOpacity>
      <Modal
        swipeToClose={true}
        position={'bottom'}
        style={s.unitmodal}
        isOpen={isOpenSearchModal}
        backdrop={true}
        backButtonClose={true}
        coverScreen={true}
        onClosed={closeModal}>
        <KeyboardAvoidingView style={s.keybordWrapper} behavior={isIOS && 'padding'}>
          <View style={s.inputprofile}>
            <TextInput
              dense={true}
              theme={{ roundness: 6 }}
              style={s.inputstyle}
              mode='outlined'
              label='Search'
              placeholder='Search'
              selectionColor={colors.primary}
              outlineColor={colors.borderColor}
              activeOutlineColor={colors.primary}
              value={searchText}
              onChangeText={(text) => {
                setSearchText(text);
              }}
            />
          </View>
          <FlatList
            data={list || []}
            isSeparator={true}
            isBottomMargin={false}
            renderItem={({ item }) => {
              return (
                <Touchable
                  onPress={() => {
                    onValueChange(item);
                    closeModal();
                  }}>
                  <View style={s.dropDownItem}>
                    <View style={s.imageWrap}>
                      <Image style={s.image} source={{ uri: item?.flag }} />
                    </View>
                    <TextView
                      text={`${item?.country_name}  (+${item?.country_phone_code})`}
                      type={'body'}
                      style={s.name}
                      numberOfLines={2}
                    />
                  </View>
                </Touchable>
              );
            }}
            keyExtractor={(item, index) => index}
          />
        </KeyboardAvoidingView>
      </Modal>
    </>
  );
};

export default CountryModal;
