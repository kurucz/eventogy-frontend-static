import { API_URL, LOCALE } from "./constants";
import { EventsResponse, Event } from "./events.types";

/**
 * Fetches events from the Eventogy API.
 *
 * @returns {Promise<EventsResponse>} A promise that resolves to the events response.
 */
export async function fetchEvents(): Promise<EventsResponse> {
  const response = await fetch(API_URL, {
    next: { revalidate: 3600 },
  });
  return response.json();
}

/**
 * Formats a range of dates into a human-readable string.
 *
 * @param dates - An array of date strings in ISO format.
 * @returns A formatted date range string or null if the input array is empty.
 */
export function formatDateRange(dates: string[]): string | null {
  if (dates.length === 0) {
    return null;
  }

  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  // Parse the first and last dates in the array
  const fromDate = new Date(dates[0]);
  const toDate = new Date(dates[dates.length - 1]);

  // If there's only one date, format it directly
  if (dates.length === 1) {
    return fromDate.toLocaleDateString(LOCALE, options);
  }

  // Format "From 19 to 29 November 2024"
  const fromDay = fromDate.getDate();
  const toDay = toDate.getDate();

  // Check if the month and year are the same for both dates
  if (
    fromDate.getMonth() === toDate.getMonth() &&
    fromDate.getFullYear() === toDate.getFullYear()
  ) {
    return `From ${fromDay} to ${toDay} ${fromDate.toLocaleDateString(LOCALE, {
      month: "long",
      year: "numeric",
    })}`;
  }

  // If the month/year differ, include full date information
  return `From ${fromDate.toLocaleDateString(
    LOCALE,
    options
  )} to ${toDate.toLocaleDateString(LOCALE, options)}`;
}

function transformEvents(events: Event[]) {
  return events.map((event) => {
    return {
      // TODO: not sure if we need to keep the original event object for other pages / functionality, or we can just use the transformed object
      ...event,
      readAbleDateRange: event.data?.scheduled_dates
        ? formatDateRange(event.data.scheduled_dates)
        : null,
      status: event.data && event.is_published ? "live" : "draft",
      image: {
        url: `https://picsum.photos/200/300?random=${event.id}`,
        alt: "",
        width: 200,
        height: 300,
      },
    };
  });
}

/**
 * Fetches events data asynchronously.
 *
 * @returns A promise that resolves to the events data, or null if an error occurs.
 */
export async function getEvents() {
  try {
    // await delay(1000); // Simulate a delay
    const { data } = await fetchEvents();
    return {
      events: data.events ? transformEvents(data.events) : null,
      pagination: data.pagination,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}

// function delay(ms: number) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }
