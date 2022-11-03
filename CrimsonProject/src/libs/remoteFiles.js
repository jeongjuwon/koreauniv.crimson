export const getProfileImageUrl = image => {
  console.log('getProfileImageUrl', image);
  if (image) {
    return `http://localhost:3000/data/${image}`;
  }

  return null;
};
