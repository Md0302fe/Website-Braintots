import mongoose, { mongo } from "mongoose";

const commentShema = new mongoose.Schema(
  {
    userId: { type: String, ref: "User", require: true },
    productId: { type: String, ref: "Product", require: true },
    commentDescription: { type: String, require: true },
    createAt: { type: Data, Defaut: date.now },
  },
  // dữ liệu timestamps : cho phép truy xuất dữ liệu mới nhất cho tới cũ nhất
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", commentShema);
module.exports = Comment;
