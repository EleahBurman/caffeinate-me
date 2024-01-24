document.addEventListener("DOMContentLoaded", function() {
  const stateFilter = document.getElementById("state-filter");
  const cityFilter = document.getElementById("city-filter");
  const sortFilter = document.getElementById("sort-filter");
  const tableRows = document.querySelectorAll("#listnames tbody tr");

  // Populate the city filter options
  const cityOptions = new Set();
  tableRows.forEach((row) => {
    const cityCell = row.querySelector(".city-name");
    cityOptions.add(cityCell.textContent.trim());
  });
  cityOptions.forEach((city) => {
    const option = document.createElement("option");
    option.value = city;
    option.textContent = city;
    cityFilter.appendChild(option);
  });

  // Event listener for the state filter
  stateFilter.addEventListener("change", filterTable);

  // Event listener for the city filter
  cityFilter.addEventListener("change", filterTable);

  // Event listener for the sort filter
  sortFilter.addEventListener("change", sortTable);

  // Function to sort the table
  function sortTable() {
    const selectedSort = sortFilter.value;

    const sortedRows = Array.from(tableRows);

    if (selectedSort === "asc") {
      sortedRows.sort((a, b) => {
        const nameA = a.querySelector(".cafe-name").textContent.trim();
        const nameB = b.querySelector(".cafe-name").textContent.trim();
        return nameA.localeCompare(nameB);
      });
    } else if (selectedSort === "desc") {
      sortedRows.sort((a, b) => {
        const nameA = a.querySelector(".cafe-name").textContent.trim();
        const nameB = b.querySelector(".cafe-name").textContent.trim();
        return nameB.localeCompare(nameA);
      });
    }

    // Remove all rows from the table
    tableRows.forEach(row => row.remove());

    // Append the sorted rows back to the table
    sortedRows.forEach(row => {
      document.querySelector("#listnames tbody").appendChild(row);
    });
  }

  function filterTable() {
    const selectedState = stateFilter.value;
    const selectedCity = cityFilter.value;

    tableRows.forEach((row) => {
      const stateCell = row.querySelector(".location-name");
      const cityCell = row.querySelector(".city-name");

      const stateMatch = selectedState === "all" || stateCell.textContent.trim() === selectedState;
      const cityMatch = selectedCity === "all" || cityCell.textContent.trim() === selectedCity;

      if (stateMatch && cityMatch) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    });
  }
});