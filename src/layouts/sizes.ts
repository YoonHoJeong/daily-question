const sizes = {
  bottomNavigation: {
    width: "100%",
    height: "60px",
  },
  header: {
    width: "100%",
    height: "48px",
  },
};

Object.freeze(sizes);
Object.keys(sizes).forEach((key) => Object.freeze(sizes[key]));

export default sizes;
