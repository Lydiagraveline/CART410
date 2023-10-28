window.onload = function () {
console.log("we are loaded");

// tutorial --> https://ultimatecourses.com/blog/fetch-api-post-json 

const form =  document.forms.fetch;

console.log(form.value);



const handleSubmit = (e) => {
  e.preventDefault();
  const body = JSON.stringify(Object.fromEntries(new FormData(e.target)));

  // { message: 'Hey there!' }
  console.log(body);
};
form.addEventListener('submit', handleSubmit);







    // send data to the server usin POST (after form is filled out)
  document
  .querySelector("#sendData")
  .addEventListener("click", async function (event) {
    event.preventDefault();
    console.log("clicked");
    // create a new object to send to the server and will be saved to the mongodb
    let submission = {
      feature_type: document.querySelector("#feature_type").value,
    };

    console.log(submission);

    // Default options are marked with *
    const response = await fetch("/postForm", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(submission), // body data type must match "Content-Type" header
    });

    console.log(await response.text());
  });




}