const DataTypes = {
  STRING: "STRING",
  INT16: "INT16",
  INT32: "INT32",
  UINT16: "UINT16",
  UINT32: "UINT32",
  FLOAT: "FLOAT",
  DOUBLE: "DOUBLE",
  BOOLEAN: "BOOLEAN",
};

let is_decimal = (dataType) =>{
    return dataType === DataTypes.FLOAT || dataType === DataTypes.DOUBLE;
}

let is_numeric = (dataType) => {
    return dataType === DataTypes.INT16 || dataType === DataTypes.INT32 || dataType === DataTypes.UINT16 || dataType === DataTypes.UINT32 || is_decimal(dataType);
}

let format_and_validate = (data, dataType) => {
    switch (dataType) {
        case DataTypes.INT32:
            if (
                typeof data !== "number" ||
                !Number.isInteger(data) ||
                data < -2147483648 ||
                data > 2147483647
            )
                throw new Error("Data must be a 32-bit integer");
            break;
        case DataTypes.UINT32:
            if (
                typeof data !== "number" ||
                !Number.isInteger(data) ||
                data < 0 ||
                data > 4294967295
            )
                throw new Error("Data must be a 32-bit unsigned integer");
            break;
        case DataTypes.INT16:
            if (
                typeof data !== "number" ||
                !Number.isInteger(data) ||
                data < -32768 ||
                data > 32767
            )
                throw new Error("Data must be a 16-bit integer");
            break;
        case DataTypes.UINT16:
            if (
                typeof data !== "number" ||
                !Number.isInteger(data) ||
                data < 0 ||
                data > 65535
            )
                throw new Error("Data must be a 16-bit unsigned integer");
            break;
        case DataTypes.FLOAT:
            if (typeof data !== "number")
                throw new Error("Data must be a 32-bit floating point number");
            return Math.fround(data); // In case the data is a double, convert it to a float - we don't need to throw anything because the difference is minimal.
        case DataTypes.DOUBLE:
            if (typeof data !== "number")
                throw new Error("Data must be a 64-bit floating point number");
            break;
        case DataTypes.BOOLEAN:
            if (typeof data !== "boolean")
                throw new Error("Data must be a boolean");
            break;
        default:
            throw new Error("Invalid data type");
    }
    return data;
};

let validate_type = (dataType) => {
    if (Object.values(DataTypes).includes(dataType)) return;
    else throw new Error("Invalid data type");
};


export default DataTypes;
export { format_and_validate, validate_type, is_decimal, is_numeric };
