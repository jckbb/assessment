import { memo, useState } from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";

const { height: screenHeight, width: screenWidth } = Dimensions.get("screen");

interface Props {
  uri: string;
}

const ImageItem = ({ uri }: Props) => {
  const [loading, setLoading] = useState(true);

  return (
    <View style={styles.item}>
      <Image
        source={{ uri }}
        style={styles.image}
        resizeMode="contain"
        onLoadEnd={() => {
          setLoading(false);
        }}
      />
      {loading && <Text style={{ color: "white" }}>{"loading.."}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: "95%",
  },
  item: {
    width: screenWidth,
    height: screenHeight,
    alignItems: "center",
  },
});

export default memo(ImageItem);
