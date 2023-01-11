let { Permissions } = require("../schema/permissionsSchema");
let joi = require("joi")


//joi validetion for user perission
async function verifyadd(params) {
    let schema = joi.object({
        permission: joi.string().max(30).required(),
    }).options({ abortEarly: false })

    let verify = schema.validate(params)

    if (!verify || verify.error) {
        let msg = []
        for (let i of verify.error.details) {
            msg.push(i.message)
        }
        return { error: msg }
    }
    return { data: verify.value }
}

async function add(params, userData) {
    let verify = await verifyadd(params).catch((err) => {
        return { error: err }
    })

    if (!verify || verify.error) {
        return { status: 300, error: verify.data }
    }

    let check = await Permissions.findOne({
        where: {
            permission: params.permission
        }
    }).catch((err) => {
        return { error: err }
    })

    if (check) {
        return { status: 500, error: "the permissoin is already created" }
    }

    let add = await Permissions.create({
        permission: params.permission,
        created_by: userData.id,
        updated_by: userData.id
    }).catch((err) => {
        return { error: err }
    })

    if (!add || add.error) {
        return { status: 400, error: "cannot add permmission" }
    }

    return { data: "permission add successfully" }

}

///joi validetion for veiw permission
async function verifyveiw(params) {
    let schema = joi.object({
        permission: joi.string().max(30),
    }).options({ abortEarly: false })

    let verify = schema.validate(params)

    if (!verify || verify.error) {
        let msg = []
        for (let i of verify.error.details) {
            msg.push(i.message)
        }
        return { error: msg }
    }
    return { data: verify.value }

}

///
async function veiw(params) {
    let valide = await verifyveiw(params).catch((err) => { return { error: err } })

    if (!valide || valide.error) {
        return { error: valide.error }
    }
    let result = {}

    if (params.permission) {
        result = { where: { permission: params.permission } }
    }



    let find = await Permissions.findAll(result).catch((err) => {
        return { error: err }
    })

    if (!find || find.error) {
        return { error: "catogary not found" }
    }
    return { data: find }
}

module.exports = { add, veiw }