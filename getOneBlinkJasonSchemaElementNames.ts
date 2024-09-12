// Import the JSON schema
import schema from './RecordOfMovementSubmissionSchema.json';

type JSONSchema = {
  type: string;
  properties?: { [key: string]: any };
  items?: any;
};

function getKeyNames(schema: JSONSchema): string[] {
  const allKeys: Set<string> = new Set();
  const geoParentKeys: Set<string> = new Set();

  // Helper function to check if 'geo' is a direct child of this properties object
  function hasGeoAsChild(properties: { [key: string]: any }): boolean {
    return Object.keys(properties).includes("geo");
  }

  function iterateProperties(properties: { [key: string]: any }, prefix = "") {
    for (const key in properties) {
      if (properties.hasOwnProperty(key)) {
        // Skip keys starting with "__"
        if (key.startsWith("__")) continue;

        const fullKey = prefix ? `${prefix}.${key}` : key;
        const property = properties[key];

        // Add current key to all keys set
        allKeys.add(fullKey);

        // Check if 'geo' is a direct child of this properties object
        if (property.type === "object" && property.properties) {
          if (hasGeoAsChild(property.properties)) {
            geoParentKeys.add(fullKey); // Add the immediate parent key
          }
          // Continue checking deeper levels
          // iterateProperties(property.properties, fullKey);
        }

        // If this property is an array, check its items
        if (property.type === "array" && property.items && property.items.properties) {
          if (hasGeoAsChild(property.items.properties)) {
            geoParentKeys.add(`${fullKey}[]`); // Add the array parent key
          }
          // Continue checking deeper levels
          iterateProperties(property.items.properties, `${fullKey}[]`);
        }
      }
    }
  }

  if (schema.properties) {
    iterateProperties(schema.properties);
  }

  // Filter out deeply nested keys, keep only the immediate parent of 'geo'
  return Array.from(allKeys).filter(key => geoParentKeys.has(key) || !key.includes('.geo'));
}

// Use the function
const keyNames = getKeyNames(schema);
console.log(keyNames);
