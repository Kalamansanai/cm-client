import { ApiWrapper } from "./api.util";

const backend = process.env.REACT_APP_BACKEND;

export async function ExportDetectorToCsv(detector_id: string) {
  await fetch(`${backend}/detector/${detector_id}/export`)
    .then((response) => response.blob())
    .then((blob) => {
      // 2. Create blob link to download
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `result.csv`);
      // 3. Append to html page
      document.body.appendChild(link);
      // 4. Force download
      link.click();
      // 5. Clean up and remove the link
      link.parentNode?.removeChild(link);
    });

  console.log("success");
}

export async function GetLinePlotData(detector_id: string) {
  const response = await fetch(`${backend}/get_logs_for_plot/${detector_id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      plot_type: "line",
    }),
    credentials: "include",
  });

  return await ApiWrapper(response, true);
}
