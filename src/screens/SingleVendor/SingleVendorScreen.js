import React, {Component} from 'react';
import {FlatList, Image, Text, View} from 'react-native';
import {ListItem} from 'react-native-elements';
import PropTypes from 'prop-types';
import DynamicAppStyles from '../../DynamicAppStyles';
import {firebase} from '../../Core/firebase/config';
import {IMLocalized} from '../../Core/localization/IMLocalization';
import { TNEmptyStateView } from '../../Core/truly-native';
import Modal from 'react-native-modal';
import SingleItemDetail from '../SingleItemDetail/SingleItemDetailScreen';
import styles from './styles';
import {storeCartToDisk} from '../../Core/cart/redux/reducers';
import {connect} from 'react-redux';
import VendorAppConfig from './../../VendorAppConfig';

class SingleVendorScreen extends Component {
  static navigationOptions = ({navigation}) => {
    const item = navigation.state.params.item;
    const category = navigation.state.params.category;
    return {
      title: item?.title || category?.title,
      headerRight: <View />,
    };
  };

  constructor(props) {
    super(props);

    const {navigation} = props;
    const item = navigation.getParam('item');
    const category = navigation.getParam('category'); // used only for single vendor config

    if (VendorAppConfig.isMultiVendorEnabled) {
      this.ref = firebase
        .firestore()
        .collection('vendor_products')
        .where('vendorID', '==', item.id);
    } else {
      this.ref = firebase
        .firestore()
        .collection('vendor_products')
        .where('categoryID', '==', category?.id);
    }
    this.unsubscribe = null;
    this.state = {
      data: [],
      refreshing: false,
      selectedItem: {},
      isVisible: false,
      loading: true,
      vendor: item,
      category: navigation.getParam('category')
    };
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onCollectionUpdate = querySnapshot => {
    const data = [];
    querySnapshot.forEach(doc => {
      const {name, description, photo, price} = doc.data();
      data.push({
        id: doc.id,
        name,
        description,
        photo,
        doc,
        price,
      });
    });

    this.setState({
      data,
      loading: false,
    });
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '86%',
          backgroundColor: '#CED0CE',
          marginLeft: '14%',
        }}
      />
    );
  };

  onPress = item => {
    this.setState({selectedItem: item});
    this.setState({isVisible: true});
  };

  renderItem = ({item}) => (
    <ListItem
      title={item.name}
      titleStyle={styles.title}
      subtitle={
        <View style={styles.subtitleView}>
          <Text style={styles.description}>{item.description}</Text>
          <Text style={styles.price}>${item.price}</Text>
        </View>
      }
      onPress={() => this.onPress(item)}
      rightIcon={
        <Image style={styles.rightIcon} source={{uri: item.photo}} />
      }
      containerStyle={{borderBottomWidth: 0}}
    />
  );

  render() {
    const {isVisible, selectedItem, data, loading} = this.state;
    const emptyStateConfig = {
      title: IMLocalized('No Items'),
      description: IMLocalized(
        'There are currently no items under this vendor. Please wait until the vendor completes their profile.',
      ),
    };

    return (
      <View style={styles.container}>
        {data.length === 0 && !loading && (
          <View style={styles.emptyViewContainer}>
            <TNEmptyStateView
              emptyStateConfig={emptyStateConfig}
              appStyles={DynamicAppStyles}
            />
          </View>
        )}
        <Modal
          style={styles.modalContainer}
          swipeDirection="down"
          onModalHide={async () =>
            storeCartToDisk(this.props.cartItems, this.props.cartVendor)
          }
          onSwipeComplete={() => this.setState({isVisible: false})}
          isVisible={isVisible}>
          <SingleItemDetail
            close={() => this.setState({isVisible: false})}
            vendor={this.state.vendor}
            foodItem={selectedItem}
          />
        </Modal>
        <FlatList
          data={this.state.data}
          renderItem={this.renderItem}
          keyExtractor={item => `${item.id}`}
          initialNumToRender={5}
          refreshing={this.state.refreshing}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }
}

SingleVendorScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }),
};

const mapStateToProps = state => ({
  cartItems: state.cart.cartItems,
  cartVendor: state.cart.vendor,
});

export default connect(mapStateToProps)(SingleVendorScreen);
