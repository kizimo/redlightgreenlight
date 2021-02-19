export default async function fetchLight() {
  const res = await fetch("https://traffic-light-api.herokuapp.com");
  if (res.status === 200) {
    console.log("res", res);
    const data = await res.json();
    return data.color;
  } else {
    throw new Error("fetch no workie");
  }
}
