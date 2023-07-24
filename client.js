const host = "http://127.0.0.1:3000";

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
  try {
    const targetEle = document.getElementById("name");
    const text = targetEle.value;
    const url = `${host}/save?data=${text}`;
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log(error);
  }
};
