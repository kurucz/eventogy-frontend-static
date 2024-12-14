import { EventsResponse } from "./events.types";

/**
 * Fetches events from the Eventogy API.
 *
 * @returns {Promise<EventsResponse>} A promise that resolves to the events response.
 */
export async function fetchEvents(): Promise<EventsResponse> {
  const response = await fetch("https://www.eventogy.com/api/events.json", {
    next: { revalidate: 3600 },
  });
  return response.json();
}

/**
 * Fetches events data asynchronously.
 *
 * @returns A promise that resolves to the events data, or null if an error occurs.
 */
export async function getEvents() {
  try {
    const { data } = await fetchEvents();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
