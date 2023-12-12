  // Leaves only unique elements from a comma separated list of entries
  export const getOffsetCategories = (offsetCategories: string) => {
    return Array.from(new Set(offsetCategories.split(", "))).join(", ")
  }