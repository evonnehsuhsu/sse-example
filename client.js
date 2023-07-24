const host = "http://127.0.0.1:8080";

const sseSource = new EventSource(`${host}/ticker`);

sseSource.onmessage = (event) => {
  const dataElement = document.getElementById("data"); // a DOM element in the UI.
  const { ticker } = JSON.parse(event.data);
  dataElement.textContent = ticker;
};

const closeStream = () => {
  sseSource.close();
};

const submitForm = async () => {
  console.log("submit");
  // try {
  //   const targetEle = document.getElementById("name");
  //   const text = targetEle.value;
  //   const url = `${host}/save?t=` + new Date().getTime().toString();
  //   const res = await fetch(url, {
  //     method: "POST",
  //     body: JSON.stringify(text),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  //   console.log(res);
  // } catch (error) {
  //   console.log(error);
  // }
};
