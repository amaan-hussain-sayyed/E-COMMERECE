let joi = require("joi");
let { Cart } = require("../schema/cartSchema")
let { Products, Op } = require("../schema/productSchema")

//joi validetion for add to cart
async function checKadd(params) {
    let schema = joi.object({
        product_id: joi.number().required(),
        quantity: joi.number(),
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

//fucntio for addtocart ...
async function add(params, userData) {

    let verify = await checKadd(params).catch((err) => {
        return { error: err }
    })

    if (!verify || verify.error) {
        return { status: 300, error: verify.error }
    }

    let find = await Products.findOne({
        where:
            { id: params.product_id }
    }).catch((err) => {
        return { error: err }
    })

    if (!find || find.error) {
        return { status: 500, error: "product is not found" }
    }

    let check = await Cart.findOne({
        where: {
            [Op.and]: [
                { user_id: userData.id },
                { product_id: params.product_id }
            ]
        }
    }).catch((err) => {
        return { error: err }
    })

    if (check) {
        return { status: 300, error: "this product is alredy added to cart" }
    }

    if (!params.quantity) {
        params.quantity = 1
    }

    if (find.stock < params.quantity) {
        return { status: 400, error: "we have only" + find.stock + "in stock" }
    }

    let add = await Cart.create({
        user_id: userData.id,
        product_id: params.product_id,
        quantity: params.quantity
    }).catch((err) => {
        return { error: err }
    })

    if (!add || add.error) {
        console.log(add)
        return { status: 300, error: "the product is not added to the cart" }
    }

    return { data: "the product is adde to the cart" }
}

//joi validetion for veiw cart ...
async function checkveiw(params) {
    let schema = joi.object({
        product_id: joi.number(),
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

//function for veiw to cart 
async function veiw(params, userData) {
    let verify = await checkveiw(params).catch((err) => {
        return { error: err }
    })

    if (!verify || verify.error) {
        return { status: 300, error: verify.error }
    }

    if (!params.product_id) {

        let check = await Cart.findAll({
            where:
                { user_id: userData.id }
        }).catch((err) => {
            return { error: err }
        })

        if (!check || check.error) {
            return { status: 500, error: "this user is not add any product" }
        }

        return { data: check }

    }

    let check = await Cart.findOne({
        where:
        {
            [Op.and]: [
                { user_id: userData.id },
                { product_id: params.product_id }

            ]
        }
    }).catch((err) => {
        return { error: err }
    })

    if (!check || check.error) {
        return { status: 300, error: "the product  your loking for is not adde in the user cart" }
    }


    return { data: check }


}

//joi validetion for update cart 
async function checkupdate(params) {
    let schema = joi.object({
        product_id: joi.number().required(),
        quantity: joi.number().required(),
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

//function for updated cart
async function update(params, userData) {
    let verify = await checkupdate(params).catch((err) => {
        return { error: err }
    })

    if (!verify || verify.error) {
        return { status: 300, error: verify.error }
    }

    let find = await Cart.findOne({
        weher: {
            [Op.and]: [
                { product_id: params.product_id },
                { user_id: userData.id }
            ]
        }
    }).catch((err) => {
        return { error: err }
    })

    if (!find || find.error) {
        return { status: 500, error: "cannot find product in cart" }
    }

    let insert = await Cart.update({
        quantity: params.quantity
    }, {
        where:
        {
            product_id: params.product_id,
            user_id: userData.id
        }
    }).catch((err) => {
        return { error: err }
    })

    if (!insert || insert.error) {
        console.log(insert)
        console.log(find)
        return { status: 300, error: "cannot updated product" }
    }

    return { data: "updated succefull" }

}

//joi for remove cart...
async function verifyremove(params) {
    let schema = joi.object({
        product_id: joi.number().required()
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

//function for remove cart 
async function remove(params, userData) {
    let verify = await verifyremove(params).catch((err) => {
        return { error: err }
    })

    if (!verify || verify.error) {
        return { status: 400, error: verify.error }
    }

    if (!params.product_id) {

        let del = await Cart.destroy({
            where:
                { user_id: userData.id }
        }).catch((err) => {
            return { error: err }
        })

        if (!del || del.error) {
            return { status: 400, error: "the product is not remove from the cart" }
        }

        return { data: "remove all product from cart" }
    }

    let delet = await Cart.destroy({
        where: {
            [Op.and]: [
                { product_id: params.product_id },
                { user_id: userData.id }
            ]
        }
    }).catch((err) => {
        return { error: err }
    })

    if (!delet || delet.error) {
        return { status: 400, error: "the product is not cart from the cart" }
    }

    return { data: "the produc is remove from the cart" }

}

module.exports = { add, veiw, update, remove }