import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#36413E'
  },
  subContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20
  },
  button: {
    width: 100,
    height: 50,
    borderWidth: 1,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  counter: {
    height: 50,
    borderRadius: 16,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'black',
  },
  high: {
    height: 50,
    borderRadius: 16,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'black',
    marginLeft: 15
  },
  label: {
    width: '65%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  count: {
    width: '35%',
    height: '100%',
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: 'white'
  }
})

export default styles;