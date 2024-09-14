export const getUserQuery = (userId) => {
  return `*[_type == 'user' && _id == '${userId}']`;
};

export const getPins = `*[_type == 'pin'] | order(_createdAt desc) {
  _id,
  destination,
  image{
    asset->{url}
  },
  save[]{
    userId,
    postedBy->{
      _id,
      userName,
      picture
    }
  },
  postedBy->{
    _id,
    userName,
    image
  },
}`;
