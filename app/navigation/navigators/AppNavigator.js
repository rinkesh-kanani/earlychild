import * as React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import SignupScreen from '../../screens/Membership/Signup/Signup';
import screens from '../../constants/screens';
import SplashScreen from '../../screens/SplashScreen';
import NavigationTabs from '../navigationTabs';
import AddChildScreen from '../../screens/Membership/AddChild/AddChild';
import SingleMilestonesScreen from '../../screens/Milestones/SingleMilestones';
import ParentsProfileScreen from '../../screens/Membership/AddProfile/ParentsProfile';
import KidsProfileScreen from '../../screens/Membership/AddProfile/KidsProfile';
import AddChildsScreen from '../../screens/Membership/AddProfile/AddChilds';
import CompelteProfileScreen from '../../screens/Membership/AddProfile/CompelteProfile';
import NotificationsScreen from '../../screens/Membership/Notifications/Notifications';
import ArticlesScreen from '../../screens/Articles/Articles';
import ArticlesDetailScreen from '../../screens/Articles/ArticlesDetail';
import HomeScreen from '../../screens/Home/Home';
import ActivitiesScreen from '../../screens/Activities/Activities';
import ExploreActivitiesScreen from '../../screens/Activities/ExploreActivities';
import ActivitiesThemeScreen from '../../screens/Activities/ActivitiesTheme';
import SingleActivityScreen from '../../screens/Activities/SingleActivity';
import SingleActivitySimpleScreen from '../../screens/Activities/SingleActivitySimple';
import ActivityCompletedScreen from '../../screens/Activities/MindfulActivity/ActivityCompleted';
import CreatePasswordScreen from '../../screens/Membership/CreatePassword/CreatePassword';
import ShareScreen from '../../screens/More/Share/Share';
import AccountAndSubscriptionScreen from '../../screens/More/Account&Subscription/AccountAndSubscription';
import HelpGuideScreen from '../../screens/More/HelpGuide/HelpGuide';
import TermsConditionScreen from '../../screens/More/Terms&Condition/TermsCondition';
import KidsEditScreen from '../../screens/Profile/Kids/KidsEdit';
import LoginScreen from '../../screens/Membership/Login/Login';
import ForgotPasswordScreen from '../../screens/Membership/ForgotPassword/ForgotPassword';
import ChangePasswordScreen from '../../screens/More/Account&Subscription/ChangePassword/ChangePassword';
import EditProfileScreen from '../../screens/More/Account&Subscription/EditProfile/EditProfile';
import PrivacyPolicyScreen from '../../screens/More/PrivacyPolicy/PrivacyPolicy';
import PdfViewScreen from '../../screens/Activities/PdfView/PdfView';
import MoreThemesScreen from '../../screens/Activities/MoreThemes/MoreThemes';

const Stack = createStackNavigator();

export const navigationRef = React.createRef();
export const navigate = (name, params) => {
  navigationRef?.current?.navigate(name, params);
};
export const navigationReset = (name, params) => {
  navigationRef?.current?.reset({
    index: 0,
    routes: [
      {
        name: name,
        params,
      },
    ],
  });
};
export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName={screens.Splash}
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
      }}>
      <Stack.Screen name={screens.Splash} component={SplashScreen} options={{ headerShown: false }} />
      <Stack.Screen name={screens.Login} component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name={screens.ForgotPassword} component={ForgotPasswordScreen} options={{ headerShown: true }} />
      <Stack.Screen name={screens.Signup} component={SignupScreen} options={{ headerShown: true }} />
      <Stack.Screen name={screens.CreatePassword} component={CreatePasswordScreen} options={{ headerShown: true }} />
      <Stack.Screen name={screens.NavigationRoot} component={NavigationTabs} options={{ headerShown: false }} />
      <Stack.Screen name={screens.AddChild} component={AddChildScreen} options={{ headerShown: true }} />
      <Stack.Screen
        name={screens.SingleMilestones}
        component={SingleMilestonesScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen name={screens.ParentsProfile} component={ParentsProfileScreen} options={{ headerShown: false }} />
      <Stack.Screen name={screens.KidsProfile} component={KidsProfileScreen} options={{ headerShown: true }} />
      <Stack.Screen name={screens.AddChilds} component={AddChildsScreen} options={{ headerShown: true }} />
      <Stack.Screen name={screens.CompleteProfile} component={CompelteProfileScreen} options={{ headerShown: true }} />
      <Stack.Screen name={screens.Notifications} component={NotificationsScreen} options={{ headerShown: false }} />
      <Stack.Screen name={screens.Articles} component={ArticlesScreen} options={{ headerShown: false }} />
      <Stack.Screen name={screens.ArticlesDetail} component={ArticlesDetailScreen} options={{ headerShown: true }} />
      <Stack.Screen name={screens.Home} component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name={screens.Activities} component={ActivitiesScreen} options={{ headerShown: true }} />
      <Stack.Screen name={screens.ActivitiesTheme} component={ActivitiesThemeScreen} options={{ headerShown: true }} />
      <Stack.Screen
        name={screens.ExploreActivities}
        component={ExploreActivitiesScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen name={screens.SingleActivity} component={SingleActivityScreen} options={{ headerShown: true }} />
      <Stack.Screen
        name={screens.SingleActivitySimple}
        component={SingleActivitySimpleScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name={screens.ActivityComplete}
        component={ActivityCompletedScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen name={screens.Share} component={ShareScreen} options={{ headerShown: true }} />
      <Stack.Screen
        name={screens.AccountAndSubscription}
        component={AccountAndSubscriptionScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen name={screens.HelpGuide} component={HelpGuideScreen} options={{ headerShown: true }} />
      <Stack.Screen
        name={screens.TermsAndConditions}
        component={TermsConditionScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen name={screens.KidsEdit} component={KidsEditScreen} options={{ headerShown: true }} />
      <Stack.Screen name={screens.ChangePassword} component={ChangePasswordScreen} options={{ headerShown: true }} />
      <Stack.Screen name={screens.EditProfile} component={EditProfileScreen} options={{ headerShown: true }} />
      <Stack.Screen name={screens.PrivacyPolicy} component={PrivacyPolicyScreen} options={{ headerShown: true }} />
      <Stack.Screen name={screens.PdfView} component={PdfViewScreen} options={{ headerShown: true }} />
      <Stack.Screen name={screens.MoreThemes} component={MoreThemesScreen} options={{ headerShown: true }} />
    </Stack.Navigator>
  );
}
