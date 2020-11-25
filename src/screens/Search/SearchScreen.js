import React, { Component } from 'react';
import { FlatList, Text, View } from 'react-native';
import { ListItem, SearchBar } from 'react-native-elements';
import PropTypes from 'prop-types';
import { FoodListItemStyle } from '../../AppStyles';
import Hamburger from '../../components/Hamburger/Hamburger';
import {firebase} from '../../Core/firebase/config';
import Modal from 'react-native-modal';
import SingleItemDetail from '../SingleItemDetail/SingleItemDetailScreen'
import styles from './styles';
import { VENDOR_PRODUCTS } from '../../Configuration';
import FastImage from 'react-native-fast-image';
import DynamicAppStyles from '../../DynamicAppStyles';
import { connect } from 'react-redux';

class SearchScreen extends Component {
  static navigationOptions = ({ navigation, screenProps }) => {
    const { params = {} } = navigation.state;
    return {
      headerLeft: (
        <Hamburger
          onPress={() => {
            navigation.openDrawer();
          }}
        />
      ),
      headerTitle: (
        <SearchBar
          containerStyle={{
            backgroundColor: 'transparent',
            borderBottomColor: 'transparent',
            borderTopColor: 'transparent',
            flex: 1,
          }}
          inputStyle={{
            backgroundColor: 'rgba(0.9, 0.9, 0.9, 0.1)',
            borderRadius: 10,
            color: 'black'
          }}
          showLoading
          clearIcon
          searchIcon
          onChangeText={text => params.handleSearch(text)}
          // onClear={alert('onClear')}
          placeholder="Search"
        />
      ),
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      // keyword: 'nadfaef',
      // loading: false,
      data: [],
      selectedItem: {},
      isVisible: false,
      // error: null,
      // refreshing: false,
    };

    this.ref =
      firebase
        .firestore()
        .collection(VENDOR_PRODUCTS);
    this.unsubscribe = null;
  }

  /* navToMap(vendors) {
    if (vendors.length > 0 || vendors !== undefined) {
      this.props.navigation.navigate('Map', {vendors});
    }
  } */

  componentDidMount() {
    const {vendors} = this.props;
    //this.props.navigation.setParams({navToMap: () => this.navToMap(vendors)});
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
    this.props.navigation.setParams({
      handleSearch: this.onSearch,
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onCollectionUpdate = querySnapshot => {
    const data = [];
    querySnapshot.forEach(doc => {
      const { name, description, photo, price } = doc.data();
      const text =
        this.searchedText != null ? this.searchedText.toLowerCase() : '';
      const index = name.toLowerCase().search(text);
      if (index !== -1) {
        data.push({
          id: doc.id,
          name,
          description,
          photo,
          doc,
          price,
        });
      }
    });

    this.setState({
      data,
      // loading: false,
    });
  };

  onSearch = text => {
    this.ref =
      firebase
        .firestore()
        .collection(VENDOR_PRODUCTS);
    this.searchedText = text;

    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '86%',
          backgroundColor: '#CED0CE',
          marginLeft: '14%'
        }}
      />
    );
  };

  onPress = item => {
    this.setState({selectedItem: item});
    this.setState({isVisible: true});
  };

  renderItem = ({ item }) => (
    <ListItem
      title={item.name}
      titleStyle={FoodListItemStyle.title}
      subtitle={
        <View style={FoodListItemStyle.subtitleView}>
          <Text style={FoodListItemStyle.description}>{item.description}</Text>
          <Text style={FoodListItemStyle.price}>${item.price}</Text>
        </View>
      }
      onPress={() => this.onPress(item)}
      rightIcon={
        <FastImage
          style={FoodListItemStyle.rightIcon}
          source={{ uri: item.photo }}
        />
      }
      containerStyle={{ borderBottomWidth: 0 }}
    />
  );

  render() {
    const {isVisible, selectedItem} = this.state;
    return (
      <View style={styles.container}>
        <Modal
          style={styles.modalContainer}
          swipeDirection="down"
          onSwipeComplete={() => this.setState({isVisible: false})}
          isVisible={isVisible}>
          <SingleItemDetail
            close={() => this.setState({isVisible: false})}
            foodItem={selectedItem}
          />
        </Modal>
        <FlatList
          data={this.state.data}
          renderItem={this.renderItem}
          keyExtractor={item => `${item.id}`}
        />
      </View>
    );
  }
}

SearchScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  })
};

const mapStateToProps = state => ({
  vendors: state.vendor.vendorList,
});

export default connect(mapStateToProps)(SearchScreen);
