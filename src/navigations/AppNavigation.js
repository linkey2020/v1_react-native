import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createReduxContainer} from 'react-navigation-redux-helpers';
import {createSwitchNavigator} from 'react-navigation';
import {connect} from 'react-redux';
// import ShoppingCartButton from "../components/ShoppingCartButton/ShoppingCartButton";
// import CartScreen from "../Core/cart/ui/Cart/IMCartScreen";
// import CategoryListScreen from "../screens/CategoryList/CategoryListScreen";
import DrawerContainer from '../screens/DrawerContainer/DrawerContainer';
// import SingleItemDetail from "../screens/SingleItemDetail/SingleItemDetailScreen";
// import SingleVendorScreen from "../screens/SingleVendor/SingleVendorScreen";
import HomeScreen from '../screens/Home/HomeScreen';
// import OrderListScreen from "../screens/OrderList/OrderListScreen";
// import SearchScreen from "../screens/Search/SearchScreen";
import LoginScreen from '../Core/onboarding/LoginScreen/LoginScreen';
import SignupScreen from '../Core/onboarding/SignupScreen/SignupScreen';
import WelcomeScreen from '../Core/onboarding/WelcomeScreen/WelcomeScreen';
import WalkthroughScreen from '../Core/onboarding/WalkthroughScreen/WalkthroughScreen';
import LoadScreen from '../Core/onboarding/LoadScreen/LoadScreen';
import SmsAuthenticationScreen from '../Core/onboarding/SmsAuthenticationScreen/SmsAuthenticationScreen';
import DynamicAppStyles from '../DynamicAppStyles';
import AppConfig from '../VendorAppConfig';
import IMVendorsMap from '../Core/vendor/ui/IMVendorsMap/IMVendorsMap';
// import AdminOrderListScreen from "../Core/vendor/admin/ui/AdminOrderList/AdminOrderListScreen";
// import AdminVendorListScreen from "../Core/vendor/admin/ui/AdminVendorList/AdminVendorListScreen";
import {View, StyleSheet, TouchableOpacity} from 'react-native';
// import CheckoutScreen from "../Core/cart/ui/IMCheckoutScreen";
// import CardScreen from "../Core/payment/ui/Card/IMCardScreen";
// import MyProfileScreen from "../components/MyProfileScreen";
// import {
//   IMEditProfileScreen,
//   IMUserSettingsScreen,
//   IMContactUsScreen,
// } from "../Core/profile";
// import IMVendorReview from "../Core/review/ui/IMVendorReviewScreen/IMVendorReviewScreen";
// import stripe from "tipsi-stripe";
import FastImage from 'react-native-fast-image';
// import IMVendorsScreen from "../Core/vendor/ui/IMVendors/IMVendorsScreen";
// import IMDeliveryView from "../Core/delivery/IMDelivery/IMDeliveryView";
// import IMOrderTrackingScreen from "../Core/delivery/IMOrderTrackingScreen/IMOrderTrackingScreen";
// import IMAddAddressModal from "../Core/payment/component/IMAddAddressModal/IMAddAddressModal";
// import { IMChatScreen } from "../Core/chat";

// import ReservationScreen from "../screens/Reservation/ReservationScreen";
// import ReservationHistoryScreen from "../screens/ReservationHistory/ReservationHistoryScreen";

// import VendorDrawerContainer from "../vendorapp/screens/Drawer/DrawerContainer";
// import VendorHomeScreen from "../vendorapp/screens/Home/HomeScreen";

// import DriverDrawerContainer from "../driverapp/screens/Drawer/DrawerContainer";
// import DriverHomeScreen from "../driverapp/screens/Home/HomeScreen";
// import DriverOrdersScreen from "../driverapp/screens/Orders/OrdersScreen";

// stripe.setOptions({
//   publishableKey: AppConfig.STRIPE_CONFIG.PUBLISHABLE_KEY,
//   merchantId: AppConfig.STRIPE_CONFIG.MERCHANT_ID,
//   androidPayMode: AppConfig.STRIPE_CONFIG.ANDROID_PAYMENT_MODE,
// });

const MainNavigation = createStackNavigator(
  {
    Home: HomeScreen,
    // Cart: CartScreen,
    // OrderList: OrderListScreen,
    // Search: SearchScreen,
    // SingleVendor: SingleVendorScreen,
    // SingleItemDetail: SingleItemDetail,
    // CategoryList: CategoryListScreen,
    Map: IMVendorsMap,
    // Restaurants: AdminVendorListScreen,
    // AdminOrder: AdminOrderListScreen,
    // Checkout: CheckoutScreen,
    // Cards: CardScreen,
    // Reviews: IMVendorReview,
    // MyProfile: {screen: MyProfileScreen},
    // Contact: {screen: IMContactUsScreen},
    // Settings: {screen: IMUserSettingsScreen},
    // AccountDetail: {screen: IMEditProfileScreen},
    // Vendor: IMVendorsScreen,
    // OrderTrackingScreen: IMOrderTrackingScreen,
    // DeliveryDetail: IMDeliveryView,
    // AddAddress: IMAddAddressModal,
    // PersonalChat: IMChatScreen,
    // ReservationScreen: ReservationScreen,
    // ReservationHistoryScreen: ReservationHistoryScreen,
  },
  {
    initialRouteName: 'Home',
    headerMode: 'float',
    initialRouteParams: {
      appStyles: DynamicAppStyles,
      appConfig: AppConfig,
    },
    defaultNavigationOptions: ({navigation, screenProps}) => ({
      headerTitleStyle: {
        fontWeight: 'bold',
        textAlign: 'center',
        alignSelf: 'center',
        flex: 1,
        fontFamily: 'FallingSkyCond',
      },
      headerStyle: {
        backgroundColor:
          DynamicAppStyles.navThemeConstants[screenProps.theme].backgroundColor,
      },
      headerTintColor:
        DynamicAppStyles.colorSet[screenProps.theme].mainTextColor,
      headerRight: (
        <View style={styles.headerRight}>
          {AppConfig.isMultiVendorEnabled && (
            <TouchableOpacity onPress={() => navigation.navigate('Map')}>
              <FastImage
                source={require('../../assets/icons/map.png')}
                style={styles.mapImage}
                tintColor={
                  DynamicAppStyles.navThemeConstants[screenProps.theme]
                    .activeTintColor
                }
              />
            </TouchableOpacity>
          )}
          {/* <ShoppingCartButton
            onPress={() => {
              navigation.navigate('Cart', {
                appStyles: DynamicAppStyles,
                appConfig: AppConfig,
              });
            }}
          /> */}
        </View>
      ),
    }),
  },
);

// const DrawerStack = createDrawerNavigator(
//   {
//     Main: MainNavigation,
//   },
//   {
//     drawerPosition: 'left',
//     initialRouteName: 'Main',
//     drawerWidth: 250,
//     contentComponent: DrawerContainer,
//   },
// );

const LoginStack = createStackNavigator(
  {
    Login: {screen: LoginScreen},
    Signup: {screen: SignupScreen},
    Welcome: {screen: WelcomeScreen},
    Sms: {screen: SmsAuthenticationScreen},
  },
  {
    initialRouteName: 'Welcome',
    initialRouteParams: {
      appStyles: DynamicAppStyles,
      appConfig: AppConfig,
    },
    headerMode: 'none',
  },
);

// const VendorMainNavigation = createStackNavigator(
//   {
//     Home: VendorHomeScreen,
//   },
//   {
//     initialRouteName: 'Home',
//     headerMode: 'float',
//     initialRouteParams: {
//       appStyles: DynamicAppStyles,
//       appConfig: AppConfig,
//     },
//     defaultNavigationOptions: ({navigation, screenProps}) => ({
//       headerStyle: {
//         backgroundColor:
//           DynamicAppStyles.navThemeConstants[screenProps.theme].backgroundColor,
//       },
//       headerTintColor:
//         DynamicAppStyles.colorSet[screenProps.theme].mainTextColor,
//     }),
//   },
// );

// const VendorDrawerStack = createDrawerNavigator(
//   {
//     Main: VendorMainNavigation,
//   },
//   {
//     drawerPosition: 'left',
//     initialRouteName: 'Main',
//     drawerWidth: 250,
//     contentComponent: VendorDrawerContainer,
//   },
// );

// const DriverMainNavigation = createStackNavigator(
//   {
//     Home: DriverHomeScreen,
//     MyProfile: {screen: MyProfileScreen},
//     OrderList: DriverOrdersScreen,
//     Contact: {screen: IMContactUsScreen},
//     Settings: {screen: IMUserSettingsScreen},
//     AccountDetail: {screen: IMEditProfileScreen},
//     PersonalChat: IMChatScreen,
//   },
//   {
//     initialRouteName: 'Home',
//     headerMode: 'float',
//     initialRouteParams: {
//       appStyles: DynamicAppStyles,
//       appConfig: AppConfig,
//     },
//     defaultNavigationOptions: ({navigation, screenProps}) => ({
//       headerStyle: {
//         backgroundColor:
//           DynamicAppStyles.navThemeConstants[screenProps.theme].backgroundColor,
//       },
//       headerTintColor:
//         DynamicAppStyles.colorSet[screenProps.theme].mainTextColor,
//     }),
//   },
// );

// const DriverDrawerStack = createDrawerNavigator(
//   {
//     Main: DriverMainNavigation,
//   },
//   {
//     drawerPosition: 'left',
//     initialRouteName: 'Main',
//     drawerWidth: 250,
//     contentComponent: DriverDrawerContainer,
//   },
// );

// Manifest of possible screens
const RootNavigator = createSwitchNavigator(
  {
    LoadScreen: {screen: LoadScreen},
    Walkthrough: {screen: WalkthroughScreen},
    LoginStack: {screen: LoginStack},
    // MainStack: { screen: DrawerStack },
  },
  {
    // Default config for all screens
    headerMode: 'none',
    initialRouteName: 'LoadScreen',
    initialRouteParams: {
      appStyles: DynamicAppStyles,
      appConfig: AppConfig,
    },
  },
);

const AppContainer = createReduxContainer(RootNavigator);

const mapStateToProps = (state) => ({
  state: state.nav,
});

const AppNavigator = connect(mapStateToProps)(AppContainer);

export {RootNavigator, AppNavigator};

const styles = StyleSheet.create({
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mapImage: {width: 25, height: 25},
});
