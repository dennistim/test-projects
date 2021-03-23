export const findRecursive = (subMenuItems, value, propertyName, nestedFieldName) => {
    if (subMenuItems) {
        for (let i = 0; i < subMenuItems.length; i++) {
            if (subMenuItems[i][propertyName] === value) {
                return subMenuItems[i];
            }
            const found = findRecursive(subMenuItems[i][nestedFieldName], value, propertyName, nestedFieldName);
            if (found) return found;
        }
    }
};