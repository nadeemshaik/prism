import AssetReader from '../readers/asset';
import {ROTATION_BY_ORIENTATION} from '../constants/asset';

export const getImageStylesByOrientation = (dimensions, orientation) => {
  switch (orientation) {
    case 3:
      return {transform: ROTATION_BY_ORIENTATION[orientation], ...dimensions};
    case 6:
    case 8: {
      const newDimensions = {height: dimensions.width, width: dimensions.height};
      const top = (newDimensions.width - newDimensions.height) / 2;
      return {...newDimensions, top, left: -top, position: 'absolute', transform: ROTATION_BY_ORIENTATION[orientation]};
    }
    default:
      return dimensions;
  }
};

export const getImageDimensionsByOrientation = (asset) => {
  const height = AssetReader.height(asset),
    width = AssetReader.width(asset),
    orientation = AssetReader.orientation(asset),
    tiltedOrientation = orientation === 6 || orientation === 8;

  return {
    width: tiltedOrientation ? height : width,
    height: tiltedOrientation ? width : height,
  };
};

export const getAdjustedImageDimensions = (imageDimensions, bodyDimensions, orientation) => {
  let adjustedDimensions = {},
    dominantDimension,
    secondaryDimension;

  if (imageDimensions.width > imageDimensions.height) {
    dominantDimension = 'width'; secondaryDimension = 'height';
  } else {
    dominantDimension = 'height'; secondaryDimension = 'width';
  }

  //adjust the image size based on the dominant dimensions (as that will mostly be the deciding dimension)
  adjustedDimensions[dominantDimension] = bodyDimensions[dominantDimension];
  adjustedDimensions[secondaryDimension] = imageDimensions[secondaryDimension] * adjustedDimensions[dominantDimension] / imageDimensions[dominantDimension];

  // if that leads to secondary dimension overflowing the container boundaries, we screwed up
  // do the same calculations taking secondary dimension as deciding dimension
  if (adjustedDimensions[secondaryDimension] > bodyDimensions[secondaryDimension]) {
    adjustedDimensions[secondaryDimension] = bodyDimensions[secondaryDimension];
    adjustedDimensions[dominantDimension] = imageDimensions[dominantDimension] * adjustedDimensions[secondaryDimension] / imageDimensions[secondaryDimension];
  }

  if (orientation === 6 || orientation === 8) { // flip the sizes
    adjustedDimensions[dominantDimension] += adjustedDimensions[secondaryDimension];
    adjustedDimensions[secondaryDimension] = adjustedDimensions[dominantDimension] - adjustedDimensions[secondaryDimension];
    adjustedDimensions[dominantDimension] = adjustedDimensions[dominantDimension] - adjustedDimensions[secondaryDimension];
  }

  return adjustedDimensions;
};
