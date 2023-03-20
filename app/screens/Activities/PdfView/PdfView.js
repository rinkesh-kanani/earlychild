import React, { useCallback, useEffect } from 'react';
import { ActivityIndicator, Linking, Platform, View } from 'react-native';
import Pdf from 'react-native-pdf';
import Share from 'react-native-share';
import RNFetchBlob from 'react-native-blob-util';
import HeaderButton from '../../../components/HeaderButton';
import { toastNotification } from '../../../helpers/helpers';
import { colors } from '../../../styles';
import AppStyles from '../../../styles/AppStyles';
import s from './styles';

const PdfViewScreen = ({ route, navigation }) => {
  const { item } = route.params;
  const onDownloadPdf = useCallback((url) => {
    try {
      if (Platform.OS === 'ios') {
        let imagePath = null;
        let base64Type;
        const { config, fs } = RNFetchBlob;
        let filetype = url?.substring(url?.lastIndexOf('.') + 1);

        base64Type = `application/${filetype}`;
        config({
          fileCache: true,
        })
          .fetch('GET', url)
          // the image is now dowloaded to device's storage
          .then((resp) => {
            imagePath = resp.path();
            return resp.readFile('base64');
          })
          .then((base64Data) => {
            // here's base64 encoded image
            var imageUrl = 'data:' + base64Type + ';base64,' + base64Data;
            let shareImage = {
              url: imageUrl,
            };
            Share.open(shareImage)
              .then((res) => {
                console.log(res);
              })
              .catch((err) => {
                err && console.log('err', err);
              });
            // remove the file from storage
            return fs.unlink(imagePath);
          });
      } else {
        toastNotification('download started please wait...');
        // Image URL which we want to download
        let fileURL = url;
        // Getting the extention of the file
        let fileName = url?.substring(url?.lastIndexOf('/') + 1);
        // Get config and fs from RNFetchBlob
        // config: To pass the downloading related options
        // fs: Directory path where we want our image to download
        const { config, fs } = RNFetchBlob;
        let DownloadDir = fs.dirs.DownloadDir;
        let options = {
          fileCache: true,
          addAndroidDownloads: {
            // Related to the Android only
            useDownloadManager: true,
            notification: true,
            path: `${DownloadDir}/${fileName}`,
          },
        };
        config(options)
          .fetch('GET', fileURL)
          .then((res) => {
            // Showing alert after successful downloading
            console.log('res -> ', JSON.stringify(res));
            toastNotification('File Downloaded Successfully.');
          });
      }
    } catch (error) {
      console.log('error', error);
    }
  }, []);

  useEffect(() => {
    navigation.setOptions({
      title: item?.title,
      navigation: navigation,
      headerLeft: () => (
        <View style={s.headerRow}>
          <HeaderButton
            type={1}
            iconName={'chevron-left'}
            color={colors.textColor}
            style={s.addIcon}
            isFeather={Platform.OS === 'ios' ? false : true}
            onPress={() => {
              navigation.goBack();
            }}
          />
        </View>
      ),
      headerRight: () => (
        <View>
          <HeaderButton
            type={1}
            iconName={'download'}
            color={colors.textColor}
            style={s.rightIcon}
            isFeather={Platform.OS === 'ios' ? false : true}
            onPress={() => {
              onDownloadPdf(item?.url);
            }}
          />
        </View>
      ),
      headerStyle: s.headerStyle,
      headerTitleStyle: AppStyles.settingHeader,
    });
  }, [item?.title, navigation]);

  return (
    <View style={s.root}>
      <View style={s.pdfview}>
        <Pdf
          source={{
            uri: item?.url,
          }}
          onError={(error) => {
            console.log(error);
          }}
          onPressLink={(uri) => {
            Linking.openURL(uri);
          }}
          style={s.pdf}
          trustAllCerts={false}
          renderActivityIndicator={() => {
            return <ActivityIndicator size='large' color={colors.primary} />;
          }}
        />
      </View>
    </View>
  );
};

export default PdfViewScreen;
