// Assign FS Load More to list
// Not needed if it's the only list on the page

window.addEventListener("load", function () {
  // Wait until all scripts/resources are loaded
  // Array of configurations for each project list
  const projectConfigs = [
    {
      listId: "#project-list-1",
      loadMoreId: "#project-load-1",
      paginationId: "#project-pagination-1",
    },
    {
      listId: "#project-list-2",
      loadMoreId: "#project-load-2",
      paginationId: "#project-pagination-2",
    },
  ];

  // Initialize FsLibrary for each project list
  projectConfigs.forEach((config) => {
    const loadMoreProjects = new FsLibrary({
      collections: [
        {
          list: config.listId, // Target the project list by ID
          loadMore: config.loadMoreId, // Target the load more button by ID
          pagination: config.paginationId, // Target the pagination by ID
          template: ".project-list-item", // Assuming the template remains the same for all
        },
      ],
    });

    loadMoreProjects.init(); // Initialize FsLibrary for the current project list
  });
});
