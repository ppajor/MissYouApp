import React from "react";
import DefText from "./DefText";
import { View } from "react-native";
import PropTypes from "prop-types";

function ScreenHeader(props) {
  return (
    <View
      style={{
        width: "100%",
        paddingBottom: "5%",
        borderBottomColor: "#1C1C1C",
        borderBottomWidth: 2,
        display: "flex",
      }}
    >
      <DefText family="GreatVibes-Regular" size={32}>
        {props.name}
      </DefText>
    </View>
  );
}

export default ScreenHeader;
ScreenHeader.propTypes = {
  name: PropTypes.string,
};
