import { Modal, StyleSheet, Text, View, Animated } from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';

const LoadingOwner = ({ visible }) => {
  const [showModal, setShowModal] = React.useState(visible);
  const scaleValue = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    toggleModal();
  }, [visible]);
  const toggleModal = () => {
    if (visible) {
      setShowModal(true);
      Animated.spring(scaleValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      setTimeout(() => setShowModal(false), 200);
      Animated.timing(scaleValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <Modal transparent visible={showModal}>
      <View style={styles.modalBackground}>
        <LottieView
          style={{
            width: 250,
            height: 250,
          }}
          source={require('../assets/json/loading-owner.json')}
          loop={false}
          autoPlay
        />
      </View>
    </Modal>
  );
};

export default LoadingOwner;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
