const mongoose = require("mongoose")

const TokenSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		token: {
			type: String,
			required: true,
		},
	},
	{
		//this section automatically creates timestamps when the an instance of this model is createdAt/updatedAt too!
		timestamps: true,
	}
)

module.exports = mongoose.model("Token", TokenSchema)
