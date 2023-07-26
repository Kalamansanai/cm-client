export async function ApiWrapper(response: Response, only_data: boolean) {
  if (response.status !== 400) {
    const result = await response.json();
    if (result.result === "ok") {
      console.log(`backend responded with ok, data:${result.data}`);
      if (only_data) {
        return result.data;
      } else {
        return result;
      }
    } else {
      console.log("server responded an error", result);
      // throw new Error(result.data);
    }
  } else {
    console.log("server aborted", response);
    return null;
  }
}
