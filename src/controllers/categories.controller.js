const pool = require("../../db")
const CategoryService = require("../services/categories.service")

const boom = require("@hapi/boom")

const service = new CategoryService

const getCategory = async (req, res, next) => {
    try {
        const result = await service.getCategory(req.params.id)

        if (result.length <= 0) {
            throw boom.notFound('category not found')
        }

        res.json({ ...result[0] })

    } catch (error) {
        next(error)
    }
}

const getCategories = async (req, res, next) => {
    try {
        const result = await service.getCategories()
        res.json(result)
    } catch (error) {
        next(error)
    }
}

const createCategory = async (req, res, next) => {
    try {
        const { name, id_user, type_operation } = req.body
        const result = await service.createCategory({ name, id_user, type_operation })
        res.json({ id: result.insertId, name, id_user, type_operation })
    } catch (error) {

        next(error)
    }
}


const updateCategory = async (req, res, next) => {

    try {
        const { id } = req.params
        const { name, id_user, type_operation } = req.body
        const result = await service.updateCategory({ name, id_user, type_operation, id })

        if (result.affectedRows <= 0) {

            throw boom.notFound('category not found');

        }

        const categoryFound = await service.getCategory(id)
        res.json({ message: 'updated successfully', status: true, category: { ...categoryFound[0] } })

    } catch (error) {
        next(error)
    }

}

const deleteCategory = async (req, res, next) => {
    try {
        const rows = await service.deleteCategory(req.params.id)

        if (rows.affectedRows <= 0) {

            throw boom.notFound('category Not found')

        }

        res.json({ message: 'deleted successfully', status: true })
    } catch (error) {

        next(error)

    }
}


module.exports = { getCategory, getCategories, createCategory, updateCategory,deleteCategory  }