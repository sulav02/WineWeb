export function createRes(context) {
    return {
        status(code) {
            context.response.status = code;
            return this; // enable chaining
        },
        json(data) {
            context.response.type = "application/json";
            context.response.body = data;
            return this;
        },
        send(data) {
            context.response.body = data;
            return this;
        },
        set(header, value) {
            context.response.headers.set(header, value);
            return this;
        }
    };
}


export function success(message, data = {}) {
    return {
        success: true,
        message,
        data,
    };
}

export function failure(message, data = {}) {
    return {
        success: false,
        message,
        data,
    };
}
  