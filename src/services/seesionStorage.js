function getToken() {
  const patient = JSON.parse(localStorage.getItem("patient"));

  return patient.token;
}

export { getToken };
