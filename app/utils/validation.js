export default class Validation {
    validate(field, value) {
        const emailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

        let error = {};
        switch(field) {
            case "name":
                error.name = value.length < 3 ? true: false
                break;
            case "email":
                error.email = !emailRegex.test(value)
            case "groups":
                error.groups = !value.length
        }

        return error;
    }

    isUIValid(error) {
        for( let key in error ) {
            if(error[key]) {
                return false;
            }
        }
        return true
    }
}