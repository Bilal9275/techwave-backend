const express = require("express");
const router = express.Router();
const Replicate = require("replicate");
const { checkAuthMiddleware } = require("../middleware");
const imageGeneration = require("../model/imageGenrationModel");

router.post("/image-generate", checkAuthMiddleware, async (req, res) => {
  try {
    // console.log("user", req.userId);
    const input = {
      prompt: req.body.input,
      scheduler: "K_EULER",
    };
    const replicate = new Replicate({
      auth: "r8_IH9T7JkIOCLbbGqsxmH0RQNknI5fTpy1RJsbs",
    });

    const output = await replicate.run(
      "bytedance/sdxl-lightning-4step:727e49a643e999d602a896c774a0658ffefea21465756a6ce24b7ea4165eba6a",
      { input }
    );
    let object = {
      title: req.body.input,
      image: output[0],
      user: req.userId,
    };
    await imageGeneration.create(object);
    res.status(200).json({ message: "image Genrate successfully." });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/get-image", checkAuthMiddleware, async (req, res) => {
  try {
    let response = await imageGeneration.find({ user: req.userId });
    res.status(200).json({ result: response, status: true });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
