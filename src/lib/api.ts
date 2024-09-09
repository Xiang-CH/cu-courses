import { toast } from "sonner";
import { AvailableCalendar } from "@/lib/types.ts";
import i18n from "@/i18n";

interface params {
  [key: string]: string;
}

async function request(location: string, params: params) {
  const baseUrl = "https://api.cucourses.uuunnniii.com/v1";
  const url = `${baseUrl}${location}`;

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  const urlencoded = new URLSearchParams();
  for (const key in params) {
    urlencoded.append(key, params[key]);
  }

  const requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    // redirect: "follow",
  };

  try {
    const response = await fetch(url, requestOptions);
    return await response.json();
  } catch (error) {
    return error;
  }
}

async function getCalendar(calendar_year: string, calendar_term: string) {
  try {
    const res = await request("/calendar/get.php", {
      token: localStorage.getItem("token") || "",
      calendar_year: calendar_year,
      calendar_term: calendar_term,
    });
    if (res.code == 200) {
      return res.calendar_list;
    }
    toast(i18n.t("errors.error"), {
      description: res.msg,
    });
    return [];
  } catch {
    toast(i18n.t("errors.error"), {
      description: i18n.t("errors.network-error"),
    });
    return [];
  }
}

async function getAvailable(): Promise<AvailableCalendar> {
  try {
    const res = await request("/calendar/available.php", {
      token: localStorage.getItem("token") || "",
    });
    if (res.code == 200) {
      return res.calendar_available;
    }
    toast(i18n.t("errors.error"), {
      description: res.msg,
    });
    return {};
  } catch (error) {
    console.log(error);
    toast(i18n.t("errors.error"), {
      description: i18n.t("errors.network-error"),
    });
    return {};
  }
}

export { request, getCalendar, getAvailable };
