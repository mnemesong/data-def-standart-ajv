const assert = require("assert");
const index = require("../src/index");
const Ajv = require("ajv");
const ajv = new Ajv();

describe("test schema schema", () => {
    describe("test valid schemas with valid values", () => {
        const schemaVers = [
            {
                schema: {
                    type: "null"
                },
                validValues: [null],
                invalidValues: [12, "ajasd", { type: null }],
            },
            {
                schema: {
                    type: ["string", "array"],
                    contains: {
                        type: "string"
                    }
                },
                validValues: ["sdasfa  asda", ["asd", "dsad"]],
                invalidValues: [null, 12, { k: "v" }, [12, 13]],
            },
            {
                schema: {
                    type: "object",
                    properties: {
                        k1: {
                            type: "string",
                            nullable: true
                        },
                        k2: {
                            type: "integer"
                        }
                    },
                    required: ["k1"]
                },
                validValues: [{ k1: "dasd" }, { k1: null, k2: 12 }],
                invalidValues: [null, 12, { k: "v" }, [12, 13], { k1: 12, k2: 12 }],
            },
        ];
        schemaVers.forEach(sch => {
            it("test schema " + JSON.stringify(sch.schema), () => {
                const valid = ajv.compile(index.schemaVersion);
                const result = valid(sch);
                if (!result) console.log("invalid reason: ", valid.errors);
                assert.ok(result);
            });
        });
    });

    describe("test invalid schemas with valid values", () => {
        const schemaVers = [
            {
                schema: {
                    type: "null"
                },
                validValues: [null],
            },
            {
                schema: {
                    type: ["string", "array"],
                    contains: {
                        type: "string"
                    }
                },
                invalidValues: [null, 12, { k: "v" }, [12, 13]],
            },
            {
                schema1: {
                    type: "object",
                    properties: {
                        k1: {
                            type: "string",
                            nullable: true
                        },
                        k2: {
                            type: "integer"
                        }
                    },
                    required: ["k1"]
                },
                validValues: [{ k1: "dasd" }, { k1: null, k2: 12 }],
                invalidValues: [null, 12, { k: "v" }, [12, 13], { k1: 12, k2: 12 }],
            },
        ];
        schemaVers.forEach(sch => {
            it("test schema " + JSON.stringify(sch.schema), () => {
                const valid = ajv.compile(index.schemaVersion);
                const result = valid(sch);
                assert.ok(!result);
            });
        });
    });
});

describe("test value schema", () => {
    describe("test valid schemas with valid value", () => {
        const schemaVers = [
            {
                schema: {
                    type: "null"
                },
                value: null,
            },
            {
                schema: {
                    type: ["string", "array"],
                    contains: {
                        type: "string"
                    }
                },
                value: ["asd", "dsad"],
            },
            {
                schema: {
                    type: ["string", "array"],
                    contains: {
                        type: "string"
                    }
                },
                value: "sdasfa  asda",
            },
            {
                schema: {
                    type: "object",
                    properties: {
                        k1: {
                            type: "string",
                            nullable: true
                        },
                        k2: {
                            type: "integer"
                        }
                    },
                    required: ["k1"]
                },
                value: { k1: "dasd" },
            },
            {
                schema: {
                    type: "object",
                    properties: {
                        k1: {
                            type: "string",
                            nullable: true
                        },
                        k2: {
                            type: "integer"
                        }
                    },
                    required: ["k1"]
                },
                value: { k1: null, k2: 12 },
            },
        ];
        schemaVers.forEach(sch => {
            it("test schema " + JSON.stringify(sch.schema), () => {
                const valid = ajv.compile(index.valueVersion);
                const result = valid(sch);
                if (!result) console.log("invalid reason: ", valid.errors);
                assert.ok(result);
            });
            it(
                "test value" + JSON.stringify(sch.value) + " for schema "
                + JSON.stringify(sch.schema),
                () => {
                    const valid = ajv.compile(sch.schema);
                    const result = valid(sch.value);
                    if (!result) console.log("invalid reason: ", valid.errors);
                    assert.ok(result);
                }
            );
        });
    });

    describe("test invalid schemas with valid values", () => {
        const schemaVers = [
            {
                schema: {
                    type: "null"
                },
            },
            {
                schema: {
                    type: ["string", "array"],
                    contains: {
                        type: "string"
                    }
                },
                invalidValues: [null, 12, { k: "v" }, [12, 13]],
            },
            {
                schema1: {
                    type: "object",
                    properties: {
                        k1: {
                            type: "string",
                            nullable: true
                        },
                        k2: {
                            type: "integer"
                        }
                    },
                    required: ["k1"]
                },
                value: { k1: "v" },
            },
        ];
        schemaVers.forEach(sch => {
            it("test schema " + JSON.stringify(sch.schema), () => {
                const valid = ajv.compile(index.valueVersion);
                const result = valid(sch);
                assert.ok(!result);
            });
        });
    });
});