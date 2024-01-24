document.addEventListener("DOMContentLoaded", function() {
  const deleteButtons = document.querySelectorAll(".delete-button");

  deleteButtons.forEach(button => {
    button.addEventListener("click", async function(event) {
      event.preventDefault(); // Prevent the default form submission

      const confirmation = confirm("Are you sure you want to delete this cafe?");

      if (confirmation) {
        try {
          const form = this.closest("form");
          const response = await fetch(form.getAttribute("action"), {
            method: "POST"
          });

          if (response.ok) {
            Toastify({
              text: "Cafe deleted successfully!",
              className: "deletetoast",
              position: "right",
              style: {
                background: "#ffffff",
                color: "#0391da",
                width: "200px",
                justify: "right",
                borderRadius: "10px",
                position: "absolute",
                top: "0",
                right: "200px",
                padding: "5px",
                textAlign: "center",
                fontSize: "16px",
                border: "2px dashed #b7835e",
                outline: "2px solid white",
                boxShadow: "0px 0px 3px 3px #c2c1c1",
              },
              background: "rgba(0, 0, 0, 0)", 
              duration: 3000,
            }).showToast();

            // Optionally, you can remove the deleted cafe row from the table
            const cafeRow = this.closest("tr");
            cafeRow.remove();
          } else {
            Toastify({
              text: "Error deleting cafe. Please try again.",
              style: {
                background: "#c1e7fe",
                color: "#032139",
                width: "200px",
                justify: "right",
                borderRadius: "8px",
              },
              duration: 3000,
            }).showToast();
          }
        } catch (error) {
          console.error("Error deleting cafe:", error);
          Toastify({
            text: "An unexpected error occurred. Please try again later.",
            style: {
              background: "#c1e7fe",
              color: "#032139",
              width: "200px",
              justify: "right",
              borderRadius: "8px",
            },
            duration: 3000,
          }).showToast();
        }
      }
    });
  });
});
