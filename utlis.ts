import * as ImagePickerDep from "expo-image-picker";
import * as ImagePickerAndroid from "./ImagePicker.android";
import { Platform } from "react-native";
import { GetPageNumberFromScrollEventType, ImageResults } from "./types";

const ImagePicker =
  Platform.OS === "android" ? ImagePickerAndroid : ImagePickerDep;

// determine index of list item by distance traveled horizontally
export const getPageNumberFromScrollEvent = ({
  e,
  arrayLength,
  itemWidth,
}: GetPageNumberFromScrollEventType) => {
  return Math.min(
    Math.max(Math.floor(e.nativeEvent.contentOffset.x / itemWidth + 0.5), 0),
    arrayLength
  );
};

// prevent spam clicking/pressing
export const simpleThrottle = (func: () => void, timeFrame: number) => {
  var lastTime = 0;
  return () => {
    var timestamp = Date.now();
    if (timestamp - lastTime >= timeFrame) {
      func();
      lastTime = timestamp;
    }
  };
};

export const getImages = async () => {
  // No permissions request is necessary for launching the image library
  // getPendingResultAsync
  let imgs;
  try {
    let result = (await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      // allowsEditing: true,
      allowsMultipleSelection: true,
      aspect: [4, 3],
      quality: 1,
    })) as ImageResults;

    if (!result.cancelled) {
      imgs = result?.assets?.map(({ uri }) => uri);
    }
    return imgs;
  } catch (error) {
    // handle error with Alert
    throw error;
  }
};
