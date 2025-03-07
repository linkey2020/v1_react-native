import React from 'react';
import {View, Image, Text} from 'react-native';
import PropTypes from 'prop-types';
import AppIntroSlider from 'react-native-app-intro-slider';
import deviceStorage from '../utils/AuthDeviceStorage';

import dynamicStyles from './styles';
import {useColorScheme} from 'react-native-appearance';
import {IMLocalized} from '../../localization/IMLocalization';

const WalkthroughScreen = (props) => {
  const {navigation} = props;
  const appConfig =
    navigation.state.params.appConfig || navigation.getParam('appConfig');
  const appStyles =
    navigation.state.params.appStyles || navigation.getParam('appStyles');
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(appStyles, colorScheme);

  const slides = appConfig.onboardingConfig.walkthroughScreens.map(
    (screenSpec, index) => {
      return {
        key: index,
        text: screenSpec.description,
        title: screenSpec.title,
        image: screenSpec.icon,
      };
    },
  );

  const _onDone = () => {
    deviceStorage.setShouldShowOnboardingFlow('false');
    navigation.navigate('Welcome');
  };

  _renderItem = ({item, dimensions}) => (
    <View style={[styles.container, dimensions]}>
      <Image
        style={styles.image}
        source={item.image}
        size={100}
        color="white"
      />
      <View>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.text}>{item.text}</Text>
      </View>
    </View>
  );

  _renderNextButton = () => {
    return <Text style={styles.button}>{IMLocalized('Next')}</Text>;
  };

  _renderSkipButton = () => {
    return <Text style={styles.button}>{IMLocalized('Skip')}</Text>;
  };

  _renderDoneButton = () => {
    return <Text style={styles.button}>{IMLocalized('Done')}</Text>;
  };

  return (
    <View style={styles.container}>
      <AppIntroSlider
        slides={slides}
        onDone={_onDone}
        renderItem={this._renderItem}
        //Handler for the done On last slide
        showSkipButton={true}
        onSkip={_onDone}
        renderNextButton={_renderNextButton}
        renderSkipButton={_renderSkipButton}
        renderDoneButton={_renderDoneButton}
      />
    </View>
  );
};

WalkthroughScreen.propTypes = {
  navigation: PropTypes.object,
};

WalkthroughScreen.navigationOptions = {
  header: null,
};

export default WalkthroughScreen;
