import mongoose from 'mongoose'

const CatalogSchema = new mongoose.Schema({
    name: {type: String, required: true},
    pdflink: {type: String, required: true},
    creator: {type: mongoose.Types.ObjectId, ref: "User"}
},
{
    timestamps: true
})

const CatalogModel = mongoose.model("Catalog", CatalogSchema)
export default CatalogModel