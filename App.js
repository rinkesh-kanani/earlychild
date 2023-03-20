import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { LogBox, StatusBar, View } from 'react-native';
import { Provider } from 'react-redux';
import Loading from './app/components/Loading';
import { appInit } from './app/helpers/appInitHelpers';
import AppNavigator from './app/navigation/navigators/AppNavigator';
import styles from './app/screens/styles';
import store from './app/store/store';
import { colors } from './app/styles';
import { setupToken } from './app/utils/authTokenHelpers';

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function init() {
      try {
        const token = await setupToken();
        console.log('token', token);
        if (token) {
          await store.dispatch(appInit());
        }
      } catch (e) {
        console.log('ERROR', e);
      } finally {
        setLoading(false);
      }
    }
    init();
    LogBox.ignoreAllLogs();
  }, []);

  if (loading) return <Loading />;

  return (
    <View style={styles.rootStyle}>
      <StatusBar barStyle={'dark-content'} backgroundColor={colors.white} />
      <Provider store={store}>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </Provider>
    </View>
  );
};

export default App;
