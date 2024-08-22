import { StyleSheet, View } from "react-native";

export const MAX_MARK_COUNT = 5;

interface Props {
  listLength: number;
  pageIndex: number;
}

const Paginator = ({ listLength, pageIndex }: Props) => {
  return listLength > 1 ? (
    <View pointerEvents="none" style={styles.pageIndicator}>
      {Array(listLength < MAX_MARK_COUNT ? listLength : MAX_MARK_COUNT)
        .fill(0)
        .map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicatorCircle,
              pageIndex === index && {
                opacity: 1,
              },
            ]}
          />
        ))}
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  indicatorCircle: {
    backgroundColor: "white",
    height: 20,
    width: 20,
    borderRadius: 10,
    opacity: 0.4,
  },
  pageIndicator: {
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
    flex: 1,
    height: 10,
    position: "absolute",
    bottom: 40,
    left: 0,
    right: 0,
  },
});

export default Paginator;
