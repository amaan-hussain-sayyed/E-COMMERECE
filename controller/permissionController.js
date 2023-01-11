let { add, veiw } = require("../model/permissionModel");

//controller for add permission
async function addpermission(req, res) {

    let check = await add(req.body, req.userData).catch((err) => {
        return { error: err }
    })

    if (!check || check.error) {
        console.log(check.error)
        return res.status(check.status ? check.status : 500).send({ error: check.error ? check.error : "internal server error" })
    }

    return res.status(200).send({ data: check.data })
}

//cpontroller for veiw permission
async function veiwpermission(req, res) {

    let check = await veiw(req.body, req.userData).catch((err) => {
        return { error: err }
    })

    if (!check || check.error) {
        console.log(check.error)
        return res.status(check.status ? check.status : 500).send({ error: check.error ? check.error : "internal server error" })
    }

    return res.status(200).send({ data: check.data })
}

module.exports = { addpermission, veiwpermission }