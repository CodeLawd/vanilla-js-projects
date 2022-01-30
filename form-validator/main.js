const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

// Show Errors

const showErrors = (input, message) => {
  const parent = input.parentElement;
  parent.className = "form-control error";
  parent.querySelector("small").innerText = message;
};

const showSuccess = (input) => {
  const parent = input.parentElement;
  parent.className = "form-control success";
};

const checkRequiredField = (inputArray) => {
  inputArray.forEach((input) => {
    if (input.value === "") {
      showErrors(input, `${getFieldName(input)} is required`);
    } else showSuccess(input);
  });
};

const getFieldName = (input) => {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1).toLowerCase();
};

const checkFieldLength = (input, min, max) => {
  if (input.value.length < min) {
    showErrors(
      input,
      `${getFieldName(input)} cannot be less than ${min} characters`
    );
  } else if (input.value.length > max) {
    showErrors(
      input,
      `${getFieldName(input)} cannot be more than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
};

// Check email is valid
const checkEmail = (input) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  re.test(input.value.trim())
    ? showSuccess(input)
    : showErrors(input, "Email is not valid");
};

const confirmPassword = (input1, input2) => {
  input2.value != input1.value && showErrors(input2, "Password do not match");
};
// Event Listeners

form.addEventListener("submit", (e) => {
  e.preventDefault();
  checkRequiredField([username, email, password, password2]);
  checkFieldLength(username, 3, 15);
  checkFieldLength(password, 6, 25);
  checkEmail(email);
  confirmPassword(password, password2);
});
