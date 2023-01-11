let { add, checkuserpermissions } = require("../model/userPermissionModel");

async function assingPermission(req, res) {

    let check = await add(req.body, req.userData).catch((err) => {
        return { error: err }
    })
    console.log("succes", check)
    if (!check || check.error) {

        return res.status(check.status ? check.status : 500).send({ error: check.error ? check.error : "internal server error" })
    }

    return res.status(200).send({ data: check.data })
}

async function veiwuserPermission(req, res) {

    let check = await checkuserpermissions(req.body, req.userData).catch((err) => {
        return { error: err }
    })

    if (!check || check.error) {
        console.log(check.error)
        return res.status(check.status ? check.status : 500).send({ error: check.error ? check.error : "internal server error" })
    }

    return res.status(200).send({ data: check.data })
}

module.exports = {
    assingPermission, veiwuserPermission
}