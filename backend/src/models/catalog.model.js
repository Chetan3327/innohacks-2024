import mongoose from 'mongoose'

const CatalogSchema = new mongoose.Schema({
    name: {type: String, required: true},
    pdflink: {type: String, required: true},
    coverImgUrl: {type: String, required: true},
    has_foul_language: {type: String, default: false},
    has_images: {type: String, default: false},
    has_price: {type: String, default: false},
    creator: {type: mongoose.Types.ObjectId, ref: "User"}
},
{
    timestamps: true
})

const CatalogModel = mongoose.model("Catalog", CatalogSchema)
export default CatalogModel