import React from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import styles from './styles';
import MenuButton from '../../components/MenuButton/MenuButton';
import authManager from '../../Core/onboarding/utils/authManager';
import DynamicAppStyles from '../../DynamicAppStyles';
import AppConfig from '../../VendorAppConfig';
import {logout} from '../../Core/onboarding/redux/auth';
import {IMLocalized} from '../../Core/localization/IMLocalization';

class DrawerContainer extends React.Component {
  render() {
    const {navigation, user} = this.props;

    if (user.isAdmin) {
      return (
        <View style={styles.content}>
          <View style={styles.container}>
            <MenuButton
              title={IMLocalized('HOME')}
              source={require('../../../assets/icons/shop.png')}
              onPress={() => {
                navigation.navigate('Restaurants');
              }}
            />
            <MenuButton
              title={IMLocalized('ORDERS')}
              source={require('../../../assets/icons/delivery.png')}
              onPress={() => {
                navigation.navigate('AdminOrder');
              }}
            />
            <MenuButton
              title={IMLocalized('DELIVERY')}
              source={require('../../../assets/icons/delivery.png')}
              onPress={() => {
                navigation.navigate('Map');
              }}
            />
            <MenuButton
              title={IMLocalized('LOG OUT')}
              source={require('../../../assets/icons/shutdown.png')}
              onPress={() => {
                authManager.logout(this.props.user);
                this.props.logout();
                this.props.navigation.navigate('LoadScreen', {
                  appStyles: DynamicAppStyles,
                  appConfig: AppConfig,
                });
              }}
            />
          </View>
        </View>
      );
    }

    return (
      <View style={styles.content}>
        <View style={styles.container}>
          <MenuButton
            title={IMLocalized('HOME')}
            source={require('../../../assets/icons/shop.png')}
            onPress={() => {
              navigation.navigate('Home');
            }}
          />
          <MenuButton
            title={IMLocalized('CUISINES')}
            source={require('../../../assets/icons/menu.png')}
            onPress={() => {
              navigation.navigate('CategoryList');
            }}
          />
          <MenuButton
            title={IMLocalized('SEARCH')}
            source={require('../../../assets/icons/search.png')}
            onPress={() => {
              navigation.navigate('Search');
            }}
          />
          <MenuButton
            title={IMLocalized('CART')}
            source={require('../../../assets/icons/cart.png')}
            onPress={() => {
              navigation.navigate('Cart', {
                appStyles: DynamicAppStyles,
                appConfig: AppConfig,
              });
            }}
          />
          {!AppConfig.isMultiVendorEnabled && (
            <MenuButton
              title={IMLocalized('RESERVATIONS')}
              source={require('../../../assets/icons/reserve.png')}
              onPress={() => {
                navigation.navigate('ReservationScreen', {
                  appStyles: DynamicAppStyles,
                  appConfig: AppConfig,
                });
              }}
            />
          )}
          <MenuButton
            title={IMLocalized('PROFILE')}
            source={require('../../../assets/icons/profile.png')}
            onPress={() => {
              navigation.navigate('MyProfile');
            }}
          />
          <MenuButton
            title={IMLocalized('ORDERS')}
            source={require('../../../assets/icons/delivery.png')}
            onPress={() => {
              navigation.navigate('OrderList');
            }}
          />
          <MenuButton
            title={IMLocalized('LOG OUT')}
            source={require('../../../assets/icons/shutdown.png')}
            onPress={() => {
              authManager.logout(this.props.user);
              this.props.logout();
              this.props.navigation.navigate('LoadScreen', {
                appStyles: DynamicAppStyles,
                appConfig: AppConfig,
              });
            }}
          />
        </View>
      </View>
    );
  }
}

DrawerContainer.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }),
};

const mapStateToProps = ({auth}) => {
  return {
    user: auth.user,
  };
};

export default connect(mapStateToProps, {logout})(DrawerContainer);
