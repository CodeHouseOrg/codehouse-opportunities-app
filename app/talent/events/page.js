"use client";
import { EventModal } from "@/components/Events/modal";
import { useState, useEffect } from "react";
import EventItem from "@/components/EventItem";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import {
  Flex,
  Text,
  Input,
  Box,
  Center,
  IconButton,
  Icon,
} from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import CalendarSvg from "@/components/CalendarSvg";
import ListSvg from "@/components/ListSvg";
import Calendar from "react-calendar";
import { isSameDay } from "date-fns";
import "react-calendar/dist/Calendar.css";

export default function Events() {
  const [searchValue, setSearchValue] = useState("");
  const [hosts, setHosts] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedHost, setSelectedHost] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const calendarItemsPerPage = 2;

  //State to toggle color of List and Calendar
  const [calendarSelected, setCalendarSelected] = useState(true);
  const [listSelected, setListSelected] = useState(false);

  //State to controll date input
  const [inputDate, setInputDate] = useState("");

  // Function to update the state when a date is selected
  const handleDateChange = (date) => {
    setSelectedDate(date);
    console.log("Selected date:", date);
  };

  //Function to handle the changing of calendar and list
  const handleCalendarListSwap = (e) => {
    setCalendarSelected((pre) => !pre);
    setListSelected((pre) => !pre);
  };

  const AIRTABLE_API_KEY = process.env.NEXT_PUBLIC_AIRTABLE_API_KEY;
  const BASE_ID = process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID;

  const fetchEvents = async (url, options = {}) => {
    try {
      const headers = {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        "Content-Type": "application/json",
        ...options.headers,
      };

      const response = await fetch(url, { ...options, headers });
      if (!response.ok) {
        throw new Error(
          `Fetch failed. ${response.status} ${response.statusText}`
        );
      }

      let data = await response.json();
      return [data, null];
    } catch (error) {
      console.error(error.message);
      return [null, error];
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        console.log("Fetching events and hosts...");

        // Fetch Events Table
        const eventsResponse = await fetch(
          `https://api.airtable.com/v0/${BASE_ID}/Events`,
          {
            headers: {
              Authorization: `Bearer ${AIRTABLE_API_KEY}`,
            },
          }
        );

        if (!eventsResponse.ok) {
          throw new Error(`Error fetching events: ${eventsResponse.status}`);
        }

        const eventsData = await eventsResponse.json();
        setEvents(
          eventsData.records.map((record) => ({
            id: record.id,
            EventName: record.fields["Event Name"] || "Untitled Event",
            EventDate: record.fields["Event Start Date "],
            EventEndTime: record.fields["Event End Date "],
            EventDescription: record.fields["Event Description "],
            EventLocation: record.fields["Event Location "],
            EventHost:
              record.fields["Host (Link from Partners)"]?.[0] || "Unknown",
            EventURL: record.fields["Event URL "],
          }))
        );

        // Fetch Hosts
        const partnersResponse = await fetch(
          `https://api.airtable.com/v0/${BASE_ID}/Partners`,
          {
            headers: {
              Authorization: `Bearer ${AIRTABLE_API_KEY}`,
            },
          }
        );

        if (!partnersResponse.ok) {
          throw new Error(
            `Error fetching partners: ${partnersResponse.status}`
          );
        }

        const partnersData = await partnersResponse.json();

        const partnerMap = {};
        partnersData.records.forEach((record) => {
          partnerMap[record.id] = record.fields["Partner Name"];
        });

        setHosts(Object.values(partnerMap));

        // Map Event Hosts
        setEvents((prevEvents) =>
          prevEvents.map((event) => ({
            ...event,
            EventHost: partnerMap[event.EventHost] || "Unknown Host",
          }))
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
    fetchEvents(`https://api.airtable.com/v0/${BASE_ID}/Events`).then(
      ([data, error]) => {
        if (error) {
          console.error("Error fetching events:", error);
        }
      }
    );
  }, []);

  const getFilteredEvents = () => {
    let filteredEvents = [...events];
    if (selectedDate) {
      filteredEvents = filteredEvents.filter((event) => {
        const eventDateObj = new Date(event.EventDate + "T00:00:00Z");
        // Timezone adjustment to guarantee local time
        eventDateObj.setMinutes(
          eventDateObj.getMinutes() + eventDateObj.getTimezoneOffset()
        );

        const isSameDay = selectedDate.getDate() === eventDateObj.getDate();
        const isSameMonth = selectedDate.getMonth() === eventDateObj.getMonth();
        const isSameYear =
          selectedDate.getFullYear() === eventDateObj.getFullYear();

        if (isSameDay && isSameMonth && isSameYear) return true;
      });
    }

    if (inputDate.length) {
      filteredEvents = filteredEvents.filter((e) => {
        return isSameDay(new Date(e.EventDate), new Date(inputDate));
      });
    }

    if (selectedHost.length && selectedHost !== "All") {
      filteredEvents = filteredEvents.filter((event) => {
        return event.EventHost === selectedHost;
      });
    }

    if (searchValue.length) {
      filteredEvents = filteredEvents.filter((event) => {
        return event.EventName?.toLowerCase()?.includes(
          searchValue.toLowerCase()
        );
      });
    }

    return filteredEvents;
  };

  const filteredEvents = getFilteredEvents();

  // Pagination Logic
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const paginatedEvents = calendarSelected
    ? filteredEvents.slice(0, calendarItemsPerPage)
    : filteredEvents.slice(startIndex, endIndex);

  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);

  const onAttendClick = (event) => {
    setSelectedEvent(event);
    setOpen(true);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Flex
      bg="primaryWhite"
      minH="100vh"
      justify="flex-start"
      align="center"
      direction="column"
      py={24}
      gap={12}
      fontFamily="var(--font-mulish)"
    >
      <Box mb={8} textAlign="center" pt={8}>
        <Text as="h1" fontSize="34px" fontWeight="900" color="black">
          Events
        </Text>
        <Text
          fontSize="24px"
          color="black"
          textAlign="center"
          maxW="400px"
          mx="auto"
          lineHeight="1.2"
        >
          Search for jobs, funding, and more from CodeHouse sponsors.
        </Text>
      </Box>

      {/* Search and Filter Section */}
      <Box width="350px" maxW="600px">
        {/* Search Input */}
        <Box mb={6} position="relative" textAlign="center">
          <Input
            placeholder="Search by Event Name"
            size="md"
            borderRadius="full"
            bg="white"
            border="1px solid"
            borderColor="gray.300"
            px={4}
            pr={10}
            color="black"
            _placeholder={{ color: "black" }}
            _hover={{ borderColor: "gray.400" }}
            _focus={{
              borderColor: "blue.500",
              boxShadow: "0 0 0 1px blue.500",
            }}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          {searchValue && (
            <Box
              as="button"
              position="absolute"
              right="12px"
              top="50%"
              transform="translateY(-50%)"
              bg="transparent"
              fontSize="14px"
              color="black"
              _hover={{ color: "gray.700" }}
              aria-label="Clear search"
              onClick={() => setSearchValue("")}
            >
              X
            </Box>
          )}
        </Box>
        <Flex direction="row" align="center" justifyContent="center" gap="10px">
          {listSelected && (
            <>
              <Box width="200px" textAlign="left">
                <Text
                  fontSize="14px"
                  fontWeight="medium"
                  mb={2}
                  color="gray.700"
                >
                  Date
                </Text>
                <Input
                  type="date"
                  size="md"
                  borderRadius="md"
                  bg="white"
                  border="1px solid"
                  borderColor="gray.300"
                  p={2}
                  width="100%"
                  color="black"
                  _hover={{ borderColor: "gray.400" }}
                  _focus={{
                    borderColor: "blue.500",
                    boxShadow: "0 0 0 1px blue.500",
                  }}
                  value={inputDate}
                  onChange={(e) => setInputDate(e.target.value)}
                />
              </Box>
            </>
          )}
          {/* Host Filter */}
          <Box width="350px" textAlign="left">
            <Text fontSize="14px" fontWeight="medium" mb={2} color="gray.700">
              Host
            </Text>
            <Box
              as="select"
              size="md"
              borderRadius="md"
              bg="white"
              border="1px solid"
              borderColor="gray.300"
              p={2}
              width="100%"
              color="black"
              _hover={{ borderColor: "gray.400" }}
              _focus={{
                borderColor: "blue.500",
                boxShadow: "0 0 0 1px blue.500",
              }}
              onChange={(e) => setSelectedHost(e.currentTarget.value)}
            >
              {loading ? (
                <option>Loading hosts...</option>
              ) : hosts.length > 0 ? (
                <>
                  <option value="all">All</option>
                  {hosts.map((host, index) => (
                    <option key={index} value={host}>
                      {host}
                    </option>
                  ))}
                </>
              ) : (
                <option disabled>No hosts found</option>
              )}
            </Box>
          </Box>
        </Flex>
        {/*Events toggle */}
        <Flex flexDirection="row" gap={"none"}>
          <IconButton onClick={handleCalendarListSwap} size="md">
            <Icon fontSize="20px">
              <CalendarSvg red={calendarSelected} />
            </Icon>
          </IconButton>
          <IconButton onClick={handleCalendarListSwap}>
            <ListSvg red={listSelected} />
          </IconButton>
        </Flex>
        <Center>
          {calendarSelected && (
            <Calendar
              onChange={handleDateChange}
              value={selectedDate}
              tileClassName={({ date, view }) =>
                view === "month" &&
                !!selectedDate &&
                date.toDateString() === new Date(selectedDate).toDateString()
                  ? "selected-circle"
                  : null
              }
            />
          )}

          {/* Add inline styles to ensure circle */}
          <style jsx global>{`
            .react-calendar__tile.selected-circle {
              border-radius: 50% !important; /* Make it a true circle */
              height: 50px !important; /* Adjust size */
              display: flex;
              justify-content: center;
              align-items: center;
              margin: auto;
            }
          `}</style>
        </Center>
      </Box>
      <div className="flex flex-col justify-center items-center gap-2">
        {/* Render paginated events */}
        {calendarSelected
          ? filteredEvents
              .slice(
                (currentPage - 1) * calendarItemsPerPage,
                currentPage * calendarItemsPerPage
              )
              .map((event) => (
                <EventItem
                  key={event.id}
                  event={event}
                  onAttendClick={() => onAttendClick(event)}
                />
              ))
          : paginatedEvents.map((event) => (
              <EventItem
                key={event.id}
                event={event}
                onAttendClick={() => onAttendClick(event)}
              />
            ))}
      </div>

      {/* Unified Pagination for both views */}
      <Flex justify="center" mt={4}>
        <Button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <Text mx={4}>
          Page {currentPage} of{" "}
          {calendarSelected
            ? Math.ceil(events.length / calendarItemsPerPage)
            : totalPages}
        </Text>
        <Button
          onClick={() =>
            setCurrentPage((prev) =>
              Math.min(
                prev + 1,
                calendarSelected
                  ? Math.ceil(events.length / calendarItemsPerPage)
                  : totalPages
              )
            )
          }
          disabled={
            currentPage ===
            (calendarSelected
              ? Math.ceil(events.length / calendarItemsPerPage)
              : totalPages)
          }
        >
          Next
        </Button>
      </Flex>
      <EventModal open={open} onClose={onCloseModal} event={selectedEvent} />
    </Flex>
  );
}
