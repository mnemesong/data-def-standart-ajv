module.exports = {};

const schemaVersion = {
    type: "object",
    properties: {
        schema: {
            type: "object",
            required: ["type"]
        },
        validValues: {
            type: "array"
        },
        invalidValues: {
            type: "array"
        }
    },
    required: ["schema", "validValues", "invalidValues"]
};
module.exports.schemaVersion = schemaVersion;

const valueVersion = {
    type: "object",
    properties: {
        schema: {
            type: "object",
            properties: { type: ["string", "array"] }
        },
        value: {
            type: [
                "number",
                "integer",
                "string",
                "boolean",
                "array",
                "object",
                "null"
            ]
        }
    },
    required: ["schema", "value"],
};
module.exports.valueVersion = valueVersion;