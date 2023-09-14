import { User } from "../types";

export async function ApiWrapper(
  response: Response,
  only_data: boolean,
): Promise<ApiResponse> {
  if (response.status === 401) {
    return new ApiResponse("error", "No user signed in!");
  }
  const result = await response.json();
  if (response.status !== 400) {
    if (result.result === "ok") {
      if (only_data) {
        return new ApiResponse("ok", result.data);
      } else {
        return new ApiResponse("ok", result);
      }
    } else {
      return new ApiResponse("error", result.data);
    }
  } else {
    //console.log("server aborted", response);
    return new ApiResponse("error", "Server aborted");
  }
}

export class ApiResponse {
  result: "ok" | "error";
  data: any;

  constructor(result: "ok" | "error", data: any) {
    this.result = result;
    this.data = data;
  }

  Unwrap(setUser: (u: User | null) => void) {
    console.log("---wrapper---");
    console.log(`result:${this.result}`);
    console.log(`result:${this.data}`);
    console.log("-------------");
    if (this.result === "error") {
      console.error(this.data);
      if (this.data === "No user signed in!") {
        setUser(null);
      }
      return null;
    } else {
      return this.data;
    }
  }
}
