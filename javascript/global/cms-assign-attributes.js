// CMS collection lists
// Apply attributes to individual CMS items
window.addEventListener("load", function () {
  // Wait until all scripts/resources are loaded
  function applyAttributesToItems(selector, attributeName) {
    var items = document.querySelectorAll(selector); // Select all items
    if (items.length === 0) {
      // console.warn('No items found for selector:', selector);
    }
    items.forEach(function (item) {
      var attributeField = item.getAttribute("cms-item"); // Use the cms-item attribute
      if (attributeField) {
        // Check if the cms-item attribute exists
        item.setAttribute(attributeName, attributeField); // Set the custom attribute
        // console.log(`Set ${attributeName} to ${attributeField} for item`, item);
      } else {
        // console.warn('cms-item attribute not found in item:', item); // Warn if cms-item is not found
      }
    });
  }

  // Apply attributes to project and process items
  applyAttributesToItems(".project--list-item", "project--attribute");
  applyAttributesToItems(".process--list-item", "process--attribute");
});
