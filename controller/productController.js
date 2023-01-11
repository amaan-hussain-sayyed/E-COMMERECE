let { add, search, update } = require("../model/productModel")

//controller for add product function
async function productadd(req, res) {

    let check = await add(req.body, req.userData).catch((err) => {
        return { error: err }
    })

    if (!check || check.error) {
        console.log(check.error)
        return res.status(check.status ? check.status : 500).send({ error: check.error ? check.error : "internal server error" })
    }

    return res.status(200).send({ data: check.data })
}

//controller for serch product...
async function productsearch(req, res) {

    let check = await search(req.body).catch((err) => {
        return { error: err }
    })

    if (!check || check.error) {
        console.log(check.error)
        return res.status(check.status ? check.status : 500).send({ error: check.error ? check.error : "internal server error" })
    }

    return res.status(200).send({ data: check.data })
}

//controller for updated product..
async function productupdated(req, res) {

    let check = await update(req.body, req.userData).catch((err) => {
        return { error: err }
    })

    if (!check || check.error) {
        console.log(check.error)
        return res.status(check.status ? check.status : 500).send({ error: check.error ? check.error : "internal server error" })
    }

    return res.status(200).send({ data: check.data })
}


module.exports = { productadd, productsearch, productupdated }