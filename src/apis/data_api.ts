import { ApiWrapper } from "./api.util";

const backend = process.env.REACT_APP_BACKEND;

export async function ExportDetectorToCsv(detector_id: string) {
  await fetch(`${backend}/detector/${detector_id}/export`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  })
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
}

export async function GetLinePlotData(detector_id: string) {
  const response = await fetch(
    `${backend}/get_logs_for_plot_by_detector/${detector_id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    },
  );

  return await ApiWrapper(response, true);
}

export async function GetPieCostChartData(location_id: string) {
  const response = await fetch(`${backend}/get_location_pie/${location_id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  return await ApiWrapper(response, true);
}

export async function GetLinePlotDataByLocation(location_id: string) {
  const response = await fetch(
    `${backend}/get_logs_for_plot_by_location/${location_id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    },
  );

  return await ApiWrapper(response, true);
}

export async function GetLocationMonthlyStatByType(
  location_id: string,
  type: string,
) {
  const response = await fetch(
    `${backend}/get_location_monthly_sum_by_type/${location_id}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        type: type,
      }),
    },
  );

  return await ApiWrapper(response, true);
}

export async function GetLocationMonthlyStat(location_id: string) {
  const response = await fetch(
    `${backend}/get_location_monthly_sums/${location_id}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    },
  );

  return await ApiWrapper(response, true);
}
