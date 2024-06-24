import { ethers } from "ethers";

// Define types for ABI and transactions
interface AbiItem {
  type: string;
  name?: string;
  inputs?: { type: string }[];
}

interface Transaction {
  method: `function ${string}`;
  params: string[];
}

interface JsonData {
  transactions: Transaction[];
}

export const verifyTransactions = (abi: AbiItem[], transactions: Transaction[]): boolean => {
  const abiMethods: { [key: string]: string[] } = {};

  // Parse the ABI to get methods and their parameter types
  abi.forEach(item => {
    if (item.type === 'function' && item.name && item.inputs) {
      abiMethods[item.name] = item.inputs.map(input => input.type);
    }
  });

  // Verify each transaction
  for (const tx of transactions) {
    const methodRegex = /function\s+(\w+)\(([^)]*)\)/;
    const match = tx.method.match(methodRegex);
    if (!match) {
      console.error("Invalid method signature format");
      return false;
    }

    const methodName = match[1];
    const paramTypes = match[2].split(',').map(type => type.trim());

    // Check if the method exists in the ABI
    if (!abiMethods[methodName]) {
      console.error(`Method ${methodName} does not exist in the ABI.`);
      return false;
    }

    // Check if the parameter types match
    const expectedParamTypes = abiMethods[methodName];
    if (paramTypes.length !== expectedParamTypes.length) {
      console.error(`Parameter length mismatch for method ${methodName}.`);
      return false;
    }

    for (let i = 0; i < paramTypes.length; i++) {
      if (paramTypes[i] !== expectedParamTypes[i]) {
        console.error(`Parameter type mismatch for method ${methodName}: expected ${expectedParamTypes[i]}, got ${paramTypes[i]}.`);
        return false;
      }
    }

    // Check if the parameter values match the expected types
    const params = tx.params;
    for (let i = 0; i < params.length; i++) {
      const paramType = expectedParamTypes[i];
      const paramValue = params[i];
      if (!isValidParam(paramType, paramValue)) {
        console.error(`Invalid parameter value for method ${methodName}: expected ${paramType}, got ${paramValue}.`);
        return false;
      }
    }
  }

  return true;
};

// Helper function to validate parameter values based on their types
const isValidParam = (type: string, value: string): boolean => {
  switch (type) {
    case 'address':
      return ethers.utils.isAddress(value);
    case 'uint256':
    case 'uint8':
    case 'uint':
    case 'int256':
    case 'int8':
    case 'int':
      return !isNaN(Number(value)) && ethers.BigNumber.isBigNumber(ethers.BigNumber.from(value));
    default:
      return false;
  }
};
