import Company from "../models/Company.js";


// CREATE COMPANY
export const createCompany = async (req, res) => {
    try {
        const {
            name,
            slug,
            logo,
            type,
            description,
            website,
            hiringProcess
        } = req.body;

        if (!name || !slug) {
            return res.status(400).json({
                message: "Name and slug are required"
            });
        }

        const existingCompany = await Company.findOne({
            $or: [
                { name: name },
                { slug: slug }
            ]
        });

        if (existingCompany) {
            return res.status(409).json({
                message: "Company already exists"
            });
        }

        const company = await Company.create({
            name,
            slug,
            logo,
            type,
            description,
            website,
            hiringProcess
        });

        res.status(201).json({
            message: "Company created successfully",
            company
        });

    } catch (error) {
        res.status(500).json({
            message: "Error creating company",
            error: error.message
        });
    }
};


// GET ALL COMPANIES
export const getCompanies = async (req, res) => {
    try {
        const companies = await Company.find()
            .sort({
                name: 1
            });

        res.status(200).json({
            count: companies.length,
            companies
        });

    } catch (error) {
        res.status(500).json({
            message: "Error fetching companies",
            error: error.message
        });
    }
};


// GET SINGLE COMPANY
export const getCompanyById = async (req, res) => {
    try {
        const company = await Company.findById(
            req.params.id
        );

        if (!company) {
            return res.status(404).json({
                message: "Company not found"
            });
        }

        res.status(200).json({
            company
        });

    } catch (error) {
        res.status(500).json({
            message: "Error fetching company",
            error: error.message
        });
    }
};


// UPDATE COMPANY
export const updateCompany = async (req, res) => {
    try {
        const {
            name,
            slug,
            logo,
            type,
            description,
            website,
            hiringProcess,
            isActive
        } = req.body;

        const company = await Company.findByIdAndUpdate(
            req.params.id,
            {
                name,
                slug,
                logo,
                type,
                description,
                website,
                hiringProcess,
                isActive
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!company) {
            return res.status(404).json({
                message: "Company not found"
            });
        }

        res.status(200).json({
            message: "Company updated successfully",
            company
        });

    } catch (error) {
        res.status(500).json({
            message: "Error updating company",
            error: error.message
        });
    }
};


// DELETE COMPANY
export const deleteCompany = async (req, res) => {
    try {
        const company = await Company.findByIdAndDelete(
            req.params.id
        );

        if (!company) {
            return res.status(404).json({
                message: "Company not found"
            });
        }

        res.status(200).json({
            message: "Company deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Error deleting company",
            error: error.message
        });
    }
};