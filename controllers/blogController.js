let posts = [
  {
    usernamae: "DC",
    title: "Post_1",
  },
  {
    usernamae: "DC",
    title: "Post_2",
  },
];

const getAllPosts = (req, res) => {
  return res.status(200).json(posts);
};

const createPost = (req, res) => {
  try {
    posts.push({ username: req.body.username, title: req.body.title });
    res.status(201).json(posts);
  } catch (e) {
    res.status(500).json(e);
  }
};

module.exports = {
  getAllPosts,
  createPost,
};
