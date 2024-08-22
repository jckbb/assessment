import * as ImagePicker from "expo-image-picker";
import { NativeScrollEvent, NativeSyntheticEvent } from "react-native";

export type ImageResults = ImagePicker.ImagePickerMultipleResult & {
  assets: ImagePicker.ImageInfo[];
};

export type GetPageNumberFromScrollEventType = {
  e: NativeSyntheticEvent<NativeScrollEvent>;
  arrayLength: number;
  itemWidth: number;
};

export type PageIndicator = {
  pageNumber: number;
  paginatorIndex: number;
};
