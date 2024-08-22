import { useState } from "react";
import {
  Button,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ListRenderItem,
} from "react-native";
import {
  getImages,
  getPageNumberFromScrollEvent,
  simpleThrottle,
} from "./utlis";
import ImageItem from "./components/ImageItem";
import Paginator, { MAX_MARK_COUNT } from "./components/Paginator";
import { PageIndicator } from "./types";

const { width: screenWidth } = Dimensions.get("screen");

export default function ImagePickerExample() {
  const [page, setPage] = useState<PageIndicator>({
    pageNumber: 0,
    paginatorIndex: 0,
  });
  const [images, setImages] = useState<string[]>([]);

  // handle picking image and appending to images
  const pickImage = async () => {
    const imgs = await getImages();
    if (imgs) {
      setImages((prev) => [...prev, ...imgs]);
    }
  };

  // track item index for paginator markers
  const handleScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const pageNumber = getPageNumberFromScrollEvent({
      e,
      arrayLength: images.length,
      itemWidth: screenWidth,
    });

    setPage((prev) => {
      const moveXPaces = pageNumber - prev.pageNumber;
      const movedToIndex = prev.paginatorIndex + moveXPaces;
      // if pageNumber goes out of bounds of markers length return upper/lower bound
      const updatedPaginatorIndex =
        movedToIndex >= MAX_MARK_COUNT
          ? MAX_MARK_COUNT - 1
          : movedToIndex < 0
          ? 0
          : movedToIndex;

      return {
        pageNumber,
        paginatorIndex: updatedPaginatorIndex,
      };
    });
  };

  const renderImageItem: ListRenderItem<string> = ({ item }) => (
    <ImageItem uri={item} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <Button
        title="Pick an image from camera roll"
        onPress={simpleThrottle(pickImage, 1000)}
      />
      <FlatList
        style={styles.carousel}
        showsHorizontalScrollIndicator={false}
        snapToAlignment="center"
        horizontal
        pagingEnabled
        data={images}
        onMomentumScrollEnd={handleScrollEnd}
        renderItem={renderImageItem}
      />
      <Paginator pageIndex={page.paginatorIndex} listLength={images.length} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  carousel: {
    flex: 1,
  },
  container: {
    paddingVertical: 32,
    flex: 1,
    backgroundColor: "#222f3e",
  },
});
