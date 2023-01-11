let { add } = require("../model/productCategoryModel");

//controller for assingcategory 
async function assingCategory(req, res) {

    let check = await add(req.body, req.userData).catch((err) => {
        return { error: err }
    })
    console.log(check)
    if (!check || check.error) {
        console.log(check.error)
        return res.status(check.status ? check.status : 500).send({ error: check.error ? check.error : "internal server error" })
    }

    return res.status(200).send({ data: check.data })
}

module.exports = { assingCategory }