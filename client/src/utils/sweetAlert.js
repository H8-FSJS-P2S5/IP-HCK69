import Swal from "sweetalert2";

export const successAlert = Swal.fire({
  position: "top-end",
  icon: "success",
  title: "Your work has been saved",
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: true,
});

export const errorAlert = () => {
  Swal.fire({
    title: "The Internet?",
    text: "That thing is still around?",
    icon: "error",
  });
};
