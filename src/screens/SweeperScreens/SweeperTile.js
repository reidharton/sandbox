import React, { memo } from "react";
import { connect } from "react-redux";
import { Text, View, Dimensions } from 'react-native';
import { uncover, rightClick } from "../../store/actions/sweeperActions";

import styles from '../../styles/SweeperStyles/boardStyles';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const FLAG = <span role="img">&#9873;</span>;
const BOMB = <span role="img">&#128163;</span>;
const colors = {
  0: 'lightgrey',
  1: 'blue',
  2: 'green',
  3: 'red',
  4: 'purple',
  5: 'maroon',
  6: 'turquoise',
  7: 'black',
  8: 'grey',
}

const SweeperTile = ({ board }) => {

  return (
    <View 
      style={[styles.tile, {width: WIDTH / board.length, height: WIDTH / board.length}]}
    >
      
    </View>
  )
}

const MapStateToProps = (state) => {
  const { board } = state.sweeperReducer;
  return { board }
}

const MapDispatchToProps = {
  uncover, 
  rightClick
}

export default connect(MapStateToProps, MapDispatchToProps)(memo(SweeperTile))
// const mapStateToProps = (state) => {
//   return {board: state.board}
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     uncover: (payload) => dispatch(uncover(payload)),
//     rightClick: (e, payload) => {
//       e.preventDefault();
//       dispatch(rightClick(payload))
//     }
//   }
// }

// const ConnectedTile = ({ uncover, rightClick, val, coord, board }) => {
//   let char = (val.val === 'B') ? BOMB : val.val;
//   char = (val.val !== 0) ? char : '';
//   let charColor = !val.flag ? colors[val.val] : 'rgb(77, 15, 15)';
//   let backgroundColor = val.covered ? 'grey' : 'lightgrey';
//   backgroundColor = val.hit ? 'red' : backgroundColor;
//   return (
//     <div className={styles.tile}
//          onClick={()=> uncover({coord, board})}
//          onContextMenu={(e) => rightClick(e, {coord, board})}>
//       <div className={styles.box}
//             style={{backgroundColor: backgroundColor, color: charColor}}>
//         {!val.covered && char}
//         {val.flag && FLAG}
//       </div>
//     </div>
//   )
// }

// const Tile = connect(mapStateToProps, mapDispatchToProps)(ConnectedTile);

// export default Tile;
