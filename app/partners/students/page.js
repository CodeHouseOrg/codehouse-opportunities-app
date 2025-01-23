"use client";

import { Flex, Grid, createListCollection, GridItem, Heading, Input } from "@chakra-ui/react";
import { AIRTABLE, AIRTABLE_API_KEY, useEffectAsync } from "@/app/utils";
import { useState } from "react";
import GalleryItem from "@/components/gallery/GalleryItem";
import SelectFilter from "@/components/gallery/SelectFilter";

const codehouseInvolvement = "Codehouse Involvement";

const createGraduationYearList = async () => {
  const res = async (direction, def) => {
    const FIELD = "Graduation Year";
    const result = await AIRTABLE.table("Students")
      .select({
        fields: [FIELD],
        sort: [{ direction, field: FIELD }],
        maxRecords: 1,
      })
      .firstPage();
    return result[0]?.fields?.[FIELD] ?? def;
  };

  // TODO: there may be a way to get the min/max with a Table::select()
  const min = +(await res("asc", 2025));
  const max = +(await res("desc", 2028));
  const items = [];
  for (let i = min; i <= max; i++) {
    items.push(i.toString());
  }
  return createListCollection({ items });
};

const createFilterFormula = (filters, query) => {
  const join = (fn, arr) => {
    if (arr.length === 1) {
      return arr[0];
    } else if (arr.length > 1) {
      return `${fn}(${arr.join(", ")})`;
    } else {
      return "";
    }
  };

  const conds = [];
  for (const field in filters) {
    if (field === codehouseInvolvement) {
      if (filters[field]) {
        conds.push(filters[field] == "Yes" ? `{${field}} = "Scholar"` : `{${field}} != "Scholar"`);
      }
    } else if (typeof filters[field] === "string") {
      conds.push(`{${field}} = "${filters[field]}"`);
    } else if (filters[field]?.length) {
      // XXX: FIND can return partial matches (ie FIND("Hi", "Hill") will return true), but there
      // doesn't seem to be another way to check if a multiselect field includes a record using a
      // formula
      conds.push(
        join(
          "OR",
          filters[field].map((v) => `FIND("${v}", {${field}})`)
        )
      );
    }
  }

  if (query) {
    conds.push(`FIND("${query}", {First Name} & {Last Name })`);
  }
  return join("AND", conds);
};

function Filters({ setFilterData }) {
  const [filterOptions, setFilterOptions] = useState({});
  const filters = [
    { fieldName: "School ", name: "School" },
    { fieldName: "Graduation Year", name: "Graduation Year", manual: true },
    { fieldName: "Major", name: "Majors" },
    { fieldName: "Career Interest", name: "Career Paths" },
    { fieldName: "Technical Skills", name: "Skills" },
    { fieldName: codehouseInvolvement, name: "Codehouse Scholar", manual: true },
  ];
  const emptyList = createListCollection({ items: [] });

  useEffectAsync(async () => {
    try {
      // We can't use AIRTABLE.makeRequest() here, as it will always send a request to
      // /v0/{id}/{path}, despite this api route which does not start with the ID
      const resp = await fetch(
        `https://api.airtable.com/v0/meta/bases/${AIRTABLE.getId()}/tables`,
        {
          headers: {
            Authorization: `Bearer ${AIRTABLE_API_KEY}`,
          },
        }
      ).then((r) => r.json());
      const students = resp.tables.find((table) => table?.id === "tblZuTMwzYU52he5m");
      const result = {};
      for (const { fieldName, name, manual } of filters) {
        if (manual) {
          continue;
        }

        const fieldData = students.fields.find((field) => field?.name === fieldName);
        if (
          !fieldData ||
          (fieldData.type !== "multipleSelects" && fieldData.type !== "singleSelect")
        ) {
          /* bad */
          throw new Error(`Missing field '${name}'`);
        }

        result[name] = {
          multi: fieldData.type === "multipleSelects",
          items: createListCollection({
            items: fieldData.options.choices.map((choice) => choice.name),
          }),
        };
      }

      result["Graduation Year"] = { items: await createGraduationYearList(), multi: false };
      result["Codehouse Scholar"] = {
        items: createListCollection({ items: ["Yes", "No"] }),
        multi: false,
      };
      setFilterOptions(result);
    } catch (err) {
      /* TODO: display error */
      console.error(err);
    }
  }, []);

  return (
    <>
      {filters.map(({ name, fieldName }) => (
        <SelectFilter
          key={name}
          title={name}
          options={filterOptions[name]?.items ?? emptyList}
          multiple={filterOptions[name]?.multi}
          placeholder={filterOptions[name] ? "All" : "Loading..."}
          onValueChange={(e) =>
            setFilterData((v) => ({
              ...v,
              [fieldName]: filterOptions[name]?.multi ? e.value : e.value?.[0],
            }))
          }
        />
      ))}
    </>
  );
}

function Student({ fields, onClick }) {
  return (
    <GalleryItem
      icon={
        <div className="w-10 h-10 rounded-full flex justify-center items-center text-white bg-[#2C2C2C]">
          <p className="text-lg">{fields["First Name"][0]}</p>
        </div>
      }
      line1={`${fields["First Name"]} ${fields["Last Name "]}`}
      line2={fields["School "]}
      line3={fields["Graduation Year"]}
      buttonText="View Profile"
      onClick={onClick}
    />
  );
}

function Students({ filterData, query }) {
  const [students, setStudents] = useState([]);

  useEffectAsync(async () => {
    try {
      const res = await AIRTABLE.table("Students")
        .select({
          maxRecords: 6, // TODO: pagination
          filterByFormula: createFilterFormula(filterData, query),
        })
        .all();

      setStudents(res);
    } catch (err) {
      console.error(err);
    }
  }, [filterData, query]);

  return (
    <>
      {students.map((student) => (
        <Student key={student.id} fields={student.fields} />
      ))}
    </>
  );
}

export default function () {
  const [filterData, setFilterData] = useState({});
  const [query, setQuery] = useState("");
  return (
    <Flex
      justify="flex-start"
      align="center"
      direction="column"
      pt="24"
      pb="16"
      fontFamily="var(--font-mulish)"
    >
      <Heading size="5xl" fontWeight="bold" pt="6">
        Our Students
      </Heading>
      <Heading size="4xl" fontWeight="light" textAlign="center" className="w-[40%]" pb="4">
        View profiles of top talent from the CodeHouse network.
      </Heading>

      <Grid templateRows="0.8fr 1fr 1fr" templateColumns="repeat(3, 1fr)" gapX="6" gapY="2" pb="8">
        <GridItem colSpan="3">
          {/* TODO: might be a good idea to debounce this */}
          <Input
            type="text"
            placeholder="Search"
            className="rounded-3xl h-full"
            onChange={(e) => setQuery(e.target.value)}
          />
        </GridItem>
        <Filters setFilterData={setFilterData} />
      </Grid>
      <Grid templateRows="repeat(2, 1fr)" templateColumns="repeat(3, 1fr)" gapX="20" gapY="10">
        <Students filterData={filterData} query={query} />
      </Grid>
      {/* Page selector here */}
    </Flex>
  );
}
