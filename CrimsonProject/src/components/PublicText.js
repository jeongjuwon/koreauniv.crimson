import { StyleSheet, Text } from 'react-native';

const PublicText = ({children, style}) => {
  return <Text style={{...styles.defautlStyle, ...style}}>{children}</Text>;
};

const styles = StyleSheet.create({
  defaultStyle: {
    color: '#191919',
  },
});

export default PublicText;
