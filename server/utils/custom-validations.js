const usernameRegex = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i
const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,128}$/


module.exports.checkEmptyString = (value, helpers) => {
    if (value.trim() === '') {
        return helpers.error("any.invalid");
    }

    return value;
}


module.exports.validateUsername = (value, helpers) => {
    if (!usernameRegex.test(value)){
        return helpers.error("string.pattern.base");
    }

    return value;
}

module.exports.validatePassword = (value, helpers) => {
    if (!passwordRegex.test(value)){
        return helpers.error("string.pattern.base");
    }

    return value;
}