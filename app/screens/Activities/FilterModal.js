import { View, Text, KeyboardAvoidingView, ScrollView } from 'react-native';
import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import s from './style';
import TextView from '../../components/TextView';
import CheckBox from '../../components/CheckBox';
import { Button } from '../../components/Button';
import AppStyles from '../../styles/AppStyles';
import { getSubjectList } from '../../services/subjectService';
import { updateSubject } from '../../actions/subjectActions';
import { updateAge, updateTypeOfActivity } from '../../actions/ageActions';

import { getAgeList, getTypeOfActivityList } from '../../services/ageService';

const FilterModal = ({ filterData, onRequestClose, onChangeFilterData }) => {
  const subjectSelector = useSelector((state) => state.subject);
  const ageSelector = useSelector((state) => state.age);
  const { subjectList } = subjectSelector;
  const { ageList, typeOfActivityList } = ageSelector;

  const dispatch = useDispatch();

  const loadData = useCallback(async () => {
    if (!filterData?.subject) dispatch(getSubjectList(true));
    if (!filterData?.age) dispatch(getAgeList());
    if (!filterData?.activityType) dispatch(getTypeOfActivityList());
  }, [dispatch, filterData?.activityType, filterData?.age, filterData?.subject]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const onChangeTypeOfActivitySelection = useCallback(
    (item) => {
      const newAgeItem = { ...item, isChecked: !item?.isChecked };
      dispatch(updateTypeOfActivity({ activityType: item?.activityType, item: newAgeItem }));
    },
    [dispatch],
  );

  const typeOfActivityListView = useMemo(() => {
    return typeOfActivityList?.map((item, index) => {
      return (
        <CheckBox
          rightText={`${item?.activityType}`}
          style={s.checkBox}
          key={`typeofactivitylistview_index_${index}`}
          isChecked={item?.isChecked}
          onClick={() => onChangeTypeOfActivitySelection(item)}
        />
      );
    });
  }, [onChangeTypeOfActivitySelection, typeOfActivityList]);

  const onChangeSubjectSelection = useCallback(
    (item) => {
      const newSubjectItem = { ...item, isChecked: !item?.isChecked };
      dispatch(updateSubject({ slug: item?.slug, item: newSubjectItem }));
    },
    [dispatch],
  );

  const subjectListView = useMemo(() => {
    return subjectList?.map((item, index) => {
      return (
        <CheckBox
          rightText={item?.title}
          isChecked={item?.isChecked}
          style={s.checkBox}
          onClick={() => onChangeSubjectSelection(item)}
          key={`subjectlistview_index_${index}`}
        />
      );
    });
  }, [onChangeSubjectSelection, subjectList]);

  const onChangeAgeSelection = useCallback(
    (item) => {
      const newAgeItem = { ...item, isChecked: !item?.isChecked };
      dispatch(updateAge({ year: item?.year, item: newAgeItem }));
    },
    [dispatch],
  );

  const ageListView = useMemo(() => {
    return ageList?.map((item, index) => {
      return (
        <CheckBox
          rightText={`${item?.year}+`}
          style={s.checkBox}
          key={`agelistview_index_${index}`}
          isChecked={item?.isChecked}
          onClick={() => onChangeAgeSelection(item)}
        />
      );
    });
  }, [ageList, onChangeAgeSelection]);

  const selectedTypeOfActivities = useMemo(() => {
    let selectedType = [];
    typeOfActivityList?.forEach((item) => {
      if (item?.isChecked) return selectedType?.push(item?.activityType);
    });
    return selectedType;
  }, [typeOfActivityList]);

  const selectedSubjects = useMemo(() => {
    let selectedSubjects = [];
    subjectList?.forEach((item) => {
      if (item?.isChecked) return selectedSubjects?.push(item?.slug);
    });
    return selectedSubjects;
  }, [subjectList]);

  const selectedAges = useMemo(() => {
    let selectedAge = [];
    ageList?.forEach((item) => {
      if (item?.isChecked) return selectedAge?.push(item?.year);
    });
    return selectedAge;
  }, [ageList]);

  const onApply = useCallback(() => {
    const activityType = selectedTypeOfActivities;
    const subject = selectedSubjects;
    const age = selectedAges;
    onChangeFilterData({ activityType, subject, age });
    onRequestClose();
  }, [onChangeFilterData, onRequestClose, selectedAges, selectedSubjects, selectedTypeOfActivities]);

  return (
    <KeyboardAvoidingView style={s.keyBord}>
      <View style={s.modalWrapper}>
        <Text style={s.closeModal} onPress={onRequestClose}></Text>
        <View style={s.rectView}></View>
        <View style={s.modalBox}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={s.paddingModal}>
              <View style={s.TypeActivity}>
                <TextView text={'Type of Activity'} type={'body-head'} style={s.modalType} />
                <View>{typeOfActivityListView}</View>
              </View>
              <View style={s.TypeActivity}>
                <TextView text={'Subject'} type={'body-head'} style={s.modalType} />
                <View>{subjectListView}</View>
              </View>

              <View style={s.TypeActivityTwo}>
                <TextView text={'Ages'} type={'body-head'} style={s.modalType} />
                <View>{ageListView}</View>
              </View>
            </View>
          </ScrollView>
          <View style={s.btnModal}>
            <Button ButtonText='Apply' textStyle={AppStyles.buttonRegular} onPress={onApply} />
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default FilterModal;
