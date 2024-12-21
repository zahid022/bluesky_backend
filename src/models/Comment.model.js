const { Schema, model, default: mongoose } = require("mongoose")

const commentSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        reqiured: true,
        ref: "User"
    },
    tweetId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Tweet"
    },
    parentId: {
        type: Schema.Types.ObjectId,
        default: null,
        ref: "Comment"
    },
    content: {
        type: String,
        trim: true,
        required: true
    },
    like: {
        type: Number,
        default: 0
    },
    likeUser : {
        type : [Schema.Types.ObjectId],
        ref : "User",
        default : []
    },
    commentCount : {
        type : Number,
        default : 0
    }
}, { timestamps: true })

commentSchema.pre("deleteOne", async function (next) {
    const comment = await this.model.findById(this._conditions._id)
    try {
        async function deleteChildren(parentId) {
            const children = await mongoose.models.Comment.find({ parentId });

            for (const child of children) {
                await deleteChildren(child._id);

                await mongoose.models.Comment.deleteOne({_id :child._id});
            }
        }

        await deleteChildren(comment._id);
        next();
    } catch (err) {
        next(err);
    }
});

const Comment = model("Comment", commentSchema)

module.exports = Comment