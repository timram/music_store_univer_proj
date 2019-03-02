const ProxyController = require('../helpers/proxy-controller');
const ContentService = require('../services/content');

const Controller = {
  getAllPosts: async (req, res) => {
    const posts = await ContentService.getAllPosts({
      offset: req.swagger.params.offset.value,
      limit: req.swagger.params.limit.value,
      type: req.swagger.params.post_type.value,
      enabled: req.swagger.params.enabled.value
    });
    return res.json(posts);
  },

  createPost: async (req, res) => {
    const post = req.swagger.params.Post.value;

    const newInstr = await ContentService.createPost(post);
    return res.json(newInstr);
  },

  getPost: async (req, res) => {
    const postID = req.swagger.params.postID.value;

    const post = await ContentService.getPost(postID);
    return res.json(post);
  },

  updatePost: async (req, res) => {
    const postID = req.swagger.params.postID.value;
    const post = req.swagger.params.Post.value;

    const updPost = await ContentService.updatePost(postID, post);
    return res.json(updPost);
  },

  deletePost: async (req, res) => {
    const postID = req.swagger.params.postID.value;

    const updPost = await ContentService.deletePost(postID);
    return res.status(204).send();
  },

  getPostTypes: async (req, res) => {
    const types = await ContentService.getPostTypes();
    return res.json(types);
  }
};

module.exports = ProxyController(Controller);