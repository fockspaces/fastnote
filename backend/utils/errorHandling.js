export const catchAsync = (fn) => {
  return (req, res) => {
    fn(req, res).catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    });
  };
};
