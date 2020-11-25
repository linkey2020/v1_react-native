import {StyleSheet} from 'react-native';
import DynamicAppStyles from '../../DynamicAppStyles'
import {Appearance} from 'react-native-appearance';
import {heightPercentageToDP as h} from 'react-native-responsive-screen';
const COLOR_SCHEME = Appearance.getColorScheme();

const styles = StyleSheet.create({
  container: {
    backgroundColor:
      DynamicAppStyles.colorSet[COLOR_SCHEME].mainThemeBackgroundColor,
    flex: 1,
  },
  emptyState: {
    fontSize: DynamicAppStyles.fontSet.normal,
    textAlignVertical: 'center',
    alignSelf: 'center',
    marginTop: h(40),
    textAlign: 'center',
    width: 300,
    color: DynamicAppStyles.colorSet[COLOR_SCHEME].mainTextColor,
  },
  modalContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingTop: h(2),
  },
  emptyViewContainer: {
    marginTop: '25%',
    flex: 1
  },
  title: {
    fontSize: 16,
    color: DynamicAppStyles.colorSet[COLOR_SCHEME].mainTextColor,
    fontWeight: '500'
  },
  subtitleView: {
    paddingTop: 5,
  },
  description: {
    color: DynamicAppStyles.colorSet[COLOR_SCHEME].mainSubtextColor,
    paddingLeft: 10,
    fontSize: 12
  },
  price: {
    fontSize: 16,
    color: DynamicAppStyles.colorSet[COLOR_SCHEME].mainTextColor,
    marginTop: 10,
    paddingLeft: 10,
  },
  rightIcon: {
    width: 100,
    height: 100,
  },
});

export default styles;
