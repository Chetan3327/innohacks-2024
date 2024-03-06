import CatalogModel from '../models/catalog.model.js';

const createCatalog = async (req, res) => {
    try {
        const { name, pdflink, coverImgUrl, has_foul_language, has_images, has_price } = req.body;
        const newCatalog = new CatalogModel({
            name,
            pdflink,
            coverImgUrl,
            creator: req.user._id,
            has_foul_language,
            has_images,
            has_price
        });

        await newCatalog.save();

        res.status(201).json({
            message: 'Catalog created successfully',
            catalog: newCatalog,
        });
    } catch (error) {
        console.error('Error creating catalog:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getAllCatalogs = async (req, res) => {
    try {
        const catalogs = await CatalogModel.find().populate('creator', 'name email');
        res.status(200).json(catalogs);
    } catch (error) {
        console.error('Error fetching all catalogs:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getCatalogById = async (req, res) => {
    try {
        const catalogId = req.params.catalogId;
        const catalog = await CatalogModel.findById(catalogId).populate('creator', 'name email');
        
        if (!catalog) {
            return res.status(404).json({ message: 'Catalog not found' });
        }

        res.status(200).json(catalog);
    } catch (error) {
        console.error('Error fetching catalog by ID:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const editCatalog = async (req, res) => {
    try {
        const catalogId = req.params.catalogId;
        const { name, pdflink, coverImgUrl } = req.body;

        const catalog = await CatalogModel.findById(catalogId);
        
        if (!catalog) {
            return res.status(404).json({ message: 'Catalog not found' });
        }

        // Check if the user is the creator of the catalog
        if (catalog.creator.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Unauthorized: You are not the creator of this catalog' });
        }

        // Update the catalog fields
        catalog.name = name;
        catalog.pdflink = pdflink;
        catalog.coverImgUrl = coverImgUrl;

        await catalog.save();

        res.status(200).json({
            message: 'Catalog updated successfully',
            catalog,
        });
    } catch (error) {
        console.error('Error editing catalog:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const deleteCatalog = async (req, res) => {
    try {
        const catalogId = req.params.catalogId;

        const catalog = await CatalogModel.findById(catalogId);

        if (!catalog) {
            return res.status(404).json({ message: 'Catalog not found' });
        }

        // Check if the user is the creator of the catalog
        if (catalog.creator.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Unauthorized: You are not the creator of this catalog' });
        }

        await CatalogModel.findByIdAndDelete(catalogId);

        res.status(200).json({ message: 'Catalog deleted successfully' });
    } catch (error) {
        console.error('Error deleting catalog:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export { createCatalog, getAllCatalogs, getCatalogById, editCatalog, deleteCatalog };
