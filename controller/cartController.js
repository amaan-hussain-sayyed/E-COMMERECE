let { add, veiw, update, remove } = require("../model/cartModel");


//controller for add to cart
async function addtocart(req, res) {

    let check = await add(req.body, req.userData).catch((err) => {
        return { error: err }
    })

    if (!check || check.error) {
        console.log(check.error)
        return res.status(check.status ? check.status : 500).send({ error: check.error ? check.error : "internal server error" })
    }

    return res.status(200).send({ data: check.data })
}

//controller for updated cart
async function updatecart(req, res) {

    let check = await update(req.body, req.userData).catch((err) => {
        return { error: err }
    })

    if (!check || check.error) {
        console.log(check.error)
        return res.status(check.status ? check.status : 500).send({ error: check.error ? check.error : "internal server error" })
    }

    return res.status(200).send({ data: check.data })
}

//controller for veiw cart
async function veiwcart(req, res) {

    let check = await veiw(req.body, req.userData).catch((err) => {
        return { error: err }
    })

    if (!check || check.error) {
        console.log(check.error)
        return res.status(check.status ? check.status : 500).send({ error: check.error ? check.error : "internal server error" })
    }

    return res.status(200).send({ data: check.data })
}

//controller for remove cart
async function removecart(req, res) {

    let check = await remove(req.body, req.userData).catch((err) => {
        return { error: err }
    })

    if (!check || check.error) {
        console.log(check.error)
        return res.status(check.status ? check.status : 500).send({ error: check.error ? check.error : "internal server error" })
    }

    return res.status(200).send({ data: check.data })
}

module.exports = { addtocart, updatecart, veiwcart, removecart }