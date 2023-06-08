let joi = require("joi")
let { Products } = require("../schema/productSchema");
let { Categories, Op } = require("../schema/categoreisSchema")
let { Product_category } = require("../schema/productCategorySchema");



//joi validation of add product...

async function valideadd(params) {

    let schema = joi.object({
        name: joi.string().min(10).max(100).required(),
        description: joi.string().min(40).max(1000).required(),
        details: joi.object().keys({
            material: joi.string().max(20).required(),
            size: joi.string().max(30).required(),
            color: joi.string().max(30).required()
        }).required(),
        stock: joi.number().required(),
        stock_alert: joi.number().required(),
        price: joi.number().required(),
        amount_after_discount: joi.number(),
    }).options({ abortEarly: false })

    let verify = schema.validate(params)

    if (verify.error) {
        let msg = [];

        for (let i of verify.error.details) {
            msg.push(i.message)
        }
        return { error: msg }
    }
    return { data: verify.value }
}

//funtion for adding product...

async function add(params, userData) {
    let valide = await valideadd(params).catch((err) => {
        return { error: err }
    })

    if (valide.error) {
        return { status: 300, error: valide.error }
    }

    params.details = JSON.stringify(params.details);

    let add = await Products.create({
        name: params.name,
        description: params.description,
        details: params.details,
        stock: params.stock,
        stock_alert: params.stock_alert,
        price: params.price,
        created_by: userData.id,
        updated_by: userData.id
    }).catch((err) => { return { error: err } })

    if (!add || add.error) {
        console.log("user", add)
        return { status: 400, error: "cannot add error" }
    }

    return { data: "product add succefull" }

}


//joi validation for search product
async function validesecrh(params) {
    let schema = joi.object({
        name: joi.string(),
        category_id: joi.array().items(joi.number()),
    }).options({ abortEarly: false })

    let verify = schema.validate(params)
    if (verify.error) {
        let msg = [];
        for (let i of verify.error.details) {
            msg.push(i.message)
        }
        return { error: verify.error }
    }
    return { data: verify.value }

}

//function for search product
async function search(params) {
    let valid = await validesecrh(params).catch((err) => {
        return { error: err }
    })

    if (!valid || valid.error) {
        return { status: 300, error: valid.error }
    }

    if (params.category_id) {
        let check = await Product_category.findAll({ where: { category_id: { [Op.in]: params.category_id } }, raw: true }).catch((err) => {
            return { error: err }

        })

        if (!check || (check && check.error)) {

            return { status: 400, error: "internal sever error" }
        }
        let data = [];
        for (let a of check) {
            data.push(a.product_id)
        }

        let find = await Products.findAll({ where: { id: { [Op.in]: data } } }).catch((err) => {
            return { error: err }
        })
        console.log(find)
        if (!find || (find && find.error)) {
            return { status: 300, error: "product not found" }
        }
        return { status: 200, data: find }

    }


    let result = {};
    if (params.name) {
        result = { where: { name: params.name } }
    }

    let find = await Products.findAll(result).catch((err) => {
        return { error: err }
    })

    if (!find || find.error) {
        console.log(find, "error")
        return { status: 300, error: "not product found" }
    }

    return { data: find }



}

//joi valiadion for produc updated
async function checkupdate(params) {
    let schema = joi.object({
        id: joi.number().required(),
        name: joi.string().min(10).max(100),
        description: joi.string().min(40).max(1000),
        details: joi.object().keys({
            material: joi.string().max(20),
            size: joi.string().max(30),
            color: joi.string().max(30),
        }),
        stock: joi.number(),
        stock_alert: joi.number(),
        price: joi.number(),
    }).options({ abortEarly: false })

    let verify = schema.validate(params)

    if (verify.error) {
        let msg = [];

        for (let i of verify.error.details) {
            msg.push(i.message)
        }
        return { error: msg }
    }
    return { data: verify.value }
}

//function for updated product....
async function update(params, userData) {
    let verify = await checkupdate(params).catch((err) => {
        return { error: err }
    })

    if (!verify || verify.error) {
        return { status: 200, error: verify.error }
    }

    let chechk = await Products.findOne({
        where:
            { id: params.id }
    }).catch((err) => {
        return { error: err }
    })


    if (!chechk || chechk.error) {
        return { status: 300, error: "cannot find product" }
    }

    chechk.updated_by = userData.id

    let insert = await Products.update(params, {
        where: {
            id: params.id
        }
    }).catch((err) => {
        return { error: err }
    })

    if (!insert || insert.error) {
        return { status: 400, error: "cannot updated product" }
    }

    let result = await chechk.save().catch((err) => {
        return { error: err }
    })

    if (!result || result.error) {
        return { status: 400, error: "cannot updated the user_id" }
    }

    return { data: "update product successfully" }
}


module.exports = {
    add, search, update
}
