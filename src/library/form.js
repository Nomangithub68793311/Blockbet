export const processData = (data) => {
    let form_data = new FormData()
    for(let field of Object.keys(data)){
        if(!form_data.has(field)){
            form_data.append(field, data[field]['value'])
        } else {
            form_data.set(field, data[field]['value'])
        }
    }
    return form_data
}

export const get_value = (input, default_value, changed) => {
    if (changed) {
        return input
    } else {
        return default_value
    }
}