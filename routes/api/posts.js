const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const keys = require("../../config/Key");

const User = require("../../models/Users");
const Posts = require("../../models/Posts");

// Add post
router.post(
  "/",
  // passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const newPost = new Posts({
      user: req.body.user.id,
      image: req.body.image,
      name: req.body.user.name,
      avatar: req.body.user.avatar || "avatar",
      comments: [
        {
          user: req.body.user.id,
          name: req.body.user.name,
          avatar: req.body.user.avatar || "avatar",
          text: req.body.text
        }
      ]
    });
    newPost
      .save()
      .then(post => console.log("success") || res.json(post))
      .catch(err => console.log(err) || res.json(err));

    //validation
  }
);

//@router get /api/posts/
//@descriptin Returns all following posts based on relevance.
//@ppublic
router.get("/", (req, res) => {
  Posts.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json(err));
  //validation
});

router.get("/:id", (req, res) => {
  Posts.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err => res.status(404).json({ message: "This post doesn't exist" }));
});

router.put("/", (req, res) => {
  //update
});

router.delete("/:id", (req, res) => {
  //remove
});

router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Posts.findById(req.params.id)
      .then(post => {
        if (
          post.likes.filter(like => like.user.toString() === req.user._id)
            .length > 0
        ) {
          const Index = post.likes
            .map(like => like.user.toString())
            .indexOf(req.user.id);
          post.likes.splice(Index, 1);
          post
            .save()
            .then(post => res.json(post))
            .catch(err => console.log(err));
        } else if (
          post.likes.filter(like => like.user.toString() === req.user._id)
            .length === 0
        ) {
          post.likes.unshift({ user: req.user.id, name: req.user.username });
          post
            .save()
            .then(post => res.json(post))
            .catch(err => console.log(err));
        }
      })
      .catch(err => console.log(err));
  }
);

router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Posts.findById(req.params.id)
      .then(post => {
        post.comments.unshift({
          user: req.user.id,
          name: req.user.username,
          avatar: req.user.avatar,
          text: req.body.text
        });
        post
          .save()
          .then(post => res.json(post))
          .catch(err => console.log(err));
        res.json(post);
      })
      .catch(err => console.log(err));
  }
);

module.exports = router;
