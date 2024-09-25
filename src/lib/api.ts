import { toast } from "sonner";
import { TermInfo } from "@/lib/types.ts";
import i18n from "@/i18n";

interface params {
  [key: string]: string;
}

async function request(location: string, params: params) {
  const baseUrl = "https://eo.api.cucampus.uuunnniii.com/v1";
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
    if (!response.ok) {
      throw response;
    }

    const data = await response.json();
    if (data.code != 200) {
      toast.error(i18n.t("errors.error"), {
        description: i18n.t(
          ["8", "9"].includes(data.code.toString()[0])
            ? `errors.${data.code}`
            : `errors.${url}.${data.code}`,
        ),
      });
      console.log("error", data);
    }
    return data;
  } catch (error) {
    return error;
  }
}

async function getCalendar(calendar_year: string, calendar_term: string) {
  try {
    const cache: string | null = sessionStorage.getItem(
      `calendarList_${calendar_year}_${calendar_term}`,
    );
    if (cache) {
      return JSON.parse(cache);
    }
    const res = await request("/calendar/get.php", {
      token: localStorage.getItem("token") || "",
      calendar_year: calendar_year,
      calendar_term: calendar_term,
    });
    if (res.code == 200) {
      sessionStorage.setItem(
        `calendarList_${calendar_year}_${calendar_term}`,
        JSON.stringify(res.calendar_list),
      );
      return res.calendar_list;
    }
    console.log("error", res);

    return [];
  } catch {
    toast.error(i18n.t("errors.error"), {
      description: i18n.t("errors.network-error"),
    });
    return [];
  }
}

function getClosestYear(availableYears: string[]): string {
  if (availableYears.length === 0) return "";
  const currentYear = new Date().getFullYear();
  const closestYear = availableYears
    .map((year) => parseInt(year.split("-")[0], 10)) // Extract the starting year
    .reduce((prev, curr) =>
      Math.abs(curr - currentYear) < Math.abs(prev - currentYear) ? curr : prev,
    );
  return (
    availableYears.find((year) => year.startsWith(closestYear.toString())) ||
    availableYears[0]
  );
}

function getCurrentTerm(terms: TermInfo): string {
  if (terms === undefined) return "";
  const currentDate = new Date();
  for (const term of Object.keys(terms)) {
    const termStartDate = new Date(terms[term].start_date);
    const termEndDate = new Date(terms[term].end_date);

    if (currentDate >= termStartDate && currentDate <= termEndDate) {
      return term;
    }
  }

  if (currentDate < new Date(terms[Object.keys(terms)[0]].start_date)) {
    return Object.keys(terms)[0];
  }

  return Object.keys(terms)[Object.keys(terms).length - 1];
}

async function getAvailable() {
  try {
    const cache: string | null = sessionStorage.getItem("availableCalendars");
    if (cache) {
      return JSON.parse(cache);
    }
    const res = await request("/calendar/available.php", {
      token: localStorage.getItem("token") || "",
    });
    if (res.code == 200) {
      const availableYearsTemp: string[] = [];
      Object.keys(res.calendar_available).forEach((key) => {
        availableYearsTemp.push(key);
      });
      const currentYear = getClosestYear(availableYearsTemp);
      const currentTerm = getCurrentTerm(res.calendar_available[currentYear]);

      const response = {
        currentYear: currentYear,
        currentTerm: currentTerm,
        calendarAvailable: res.calendar_available,
      };

      sessionStorage.setItem("availableCalendars", JSON.stringify(response));
      return response;
    }
    toast.error(i18n.t("errors.error"), {
      description: res.msg,
    });
    return {};
  } catch (error) {
    console.log(error);
    toast.error(i18n.t("errors.error"), {
      description: i18n.t("errors.network-error"),
    });
    return {};
  }
}

export { request, getCalendar, getAvailable };
