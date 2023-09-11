export async function ApiWrapper(response: Response, only_data: boolean) {
  const result = await response.json();
  //console.log(`Full response from server: ${JSON.stringify(result)}`);
  if (response.status !== 400) {
    if (result.result === "ok") {
      //console.log(`backend responded with ok, data:${result.data}`);
      if (only_data) {
        return result.data;
      } else {
        return result;
      }
    } else {
      //console.log("server responded an error", result);
      return { error: result };
    }
  } else {
    //console.log("server aborted", response);
    return { error: "Server aborted" };
  }
}
