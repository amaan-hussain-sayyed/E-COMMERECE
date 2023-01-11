let { Product_category, Op } = require("../schema/productCategorySchema");
let { Products } = require("../schema/productSchema");
let { Categories } = require("../schema/categoreisSchema")
let joi = require("joi")

//joivalidation for product_catogory create ...
async function valideproductCategory(params) {
    let schema = joi.object({
        product_id: joi.number().required(),
        category_id: joi.array().items(joi.number()).required()
    }).options({ abortEarly: false })

    let valid = schema.validate(params)

    if (valid.error) {
        let msg = []
        for (let i of valid.error.details) {
            msg.push(i.message)
        }
        return { error: msg }
    }

    return { data: valid.value }
}

async function add(params, userData) {
    let valide = await valideproductCategory(params).catch((err) => {
        return { error: err }
    })

    if (!valide || valide.error) {
        return { status: 300, error: valide.error }
    }

    let product = await Products.findOne({ where: { id: params.product_id } }).catch((err) => {
        return { error: err }
    })

    if (!product || product.error) {
        return { status: 300, error: "product not found" }
    }

    let checkcategory = await Categories.findAll({ where: { id: { [Op.in]: params.category_id } } }).catch((err) => {
        return { error: err }

    })

    if (!checkcategory || checkcategory.error) {
        return { status: 400, error: "internal sever error" }
    }

    if (checkcategory.length != params.category_id.length) {
        return { status: 300, error: "category not found" }
    }

    let addarry = [];
    for (let p of params.category_id) {
        addarry.push({ category_id: p, product_id: product.id, created_by: userData.id, updated_by: userData.id })
    }

    let productCategory = await Product_category.bulkCreate(addarry).catch((err) => { return { error: err } })

    if (!productCategory || productCategory.error) {
        console.log(productCategory)
        return { status: 400, error: "cannot add category" }

    }
    return { status: 200, data: "product catygory add successfully" }

}



module.exports = {
    add
}