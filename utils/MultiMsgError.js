class MultiMsgError extends Error {
    constructor(errorMsgArray) {
        super('Custom Multi Message Error');

        this.errorMsgArray = errorMsgArray;

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = MultiMsgError;