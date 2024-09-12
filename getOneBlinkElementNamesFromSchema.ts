// Import the JSON schema
import schema from './RecordOfMovementSubmissionSchema.json';

type JSONSchema = {
  type: string;
  properties?: { [key: string]: any };
  items?: any;
};

function getKeyTitles(schema: JSONSchema): { [key: string]: string } {
  const allKeys: { [key: string]: string } = {};
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

        // Add current key and its title to allKeys if it has a title
        if (property.title) {
          allKeys[fullKey] = property.title;
        }

        // Check if 'geo' is a direct child of this properties object
        if (property.type === "object" && property.properties) {
          if (hasGeoAsChild(property.properties)) {
            geoParentKeys.add(fullKey); // Add the immediate parent key
          }
          // Commenting out the line to stop checking deeper levels
          // iterateProperties(property.properties, fullKey);
        }

        // If this property is an array, check its items
        if (property.type === "array" && property.items && property.items.properties) {
          if (hasGeoAsChild(property.items.properties)) {
            geoParentKeys.add(`${fullKey}[]`); // Add the array parent key
          }
          // Commenting out the line to stop checking deeper levels
          // iterateProperties(property.items.properties, `${fullKey}[]`);
        }
      }
    }
  }

  if (schema.properties) {
    iterateProperties(schema.properties);
  }

  // Filter out deeply nested keys, keep only the immediate parent of 'geo'
  return Object.fromEntries(
    Object.entries(allKeys).filter(
      ([key]) => geoParentKeys.has(key) || !key.includes('.geo')
    )
  );
}

// Use the function
const keyTitles = getKeyTitles(schema);
console.log(keyTitles);
