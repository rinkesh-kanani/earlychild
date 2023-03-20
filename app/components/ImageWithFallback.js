import React, { useState } from 'react';
import { Image } from 'react-native';

const ImageWithFallback = ({ uri, falbackImages = [], ...props }) => {
  const [fallbackImage, setFallbackImage] = useState();

  //Load next fallback image from list
  const onLoadFallbackImage = () => {
    if (!falbackImages || falbackImages.length === 0) return;
    const existingImageUrl = fallbackImage || uri;
    const index = falbackImages.findIndex((x) => x === existingImageUrl) + 1;
    if (index < falbackImages.length) {
      const newImageUri = falbackImages[index];
      setFallbackImage(newImageUri);
    }
  };

  const imageUri = fallbackImage || uri;
  const imageSource = typeof imageUri === 'string' ? { uri: fallbackImage || uri, cache: 'force-cache' } : imageUri;
  return <Image {...props} source={imageSource} onError={onLoadFallbackImage} />;
};
export default ImageWithFallback;
