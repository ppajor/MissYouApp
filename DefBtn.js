import React from "react";
import { View, Text } from "react-native";
import global from "./style";

function DefBtn(props) {
  const { value = "przykladowy button" } = props;
  return (
    <View
      style={{
        width: "90%",
        backgroundColor: "#202020",

        marginLeft: "auto",
        marginRight: "auto",
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 24,
      }}
    >
      <Text
        style={{
          color: global.secondaryColor,
          textAlign: "center",
          fontSize: 18,
        }}
      >
        {value}
      </Text>
    </View>
  );
}

export default DefBtn;
