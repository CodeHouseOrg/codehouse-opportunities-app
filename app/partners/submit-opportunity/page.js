"use client";
import { useState, useEffect } from "react";
import {
  Fieldset,
  Stack,
  Center,
  Textarea,
  Input,
  Heading,
  Text,
  Box,
} from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  NativeSelectField,
  NativeSelectRoot,
} from "@/components/ui/native-select";
import Airtable from "airtable";
import apiKey from "@/Airtable.configure";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const airtable = new Airtable({ apiKey });
const base = airtable.base("app1V5WXWoHT2QGTu");

const opportunitySchema = z.object({
  Partner: z.string().nonempty("Required."),
  OpportunityType: z.string().nonempty("Required."),
  EventDateTime: z.string().nonempty("Required."),
  Title: z.string().nonempty("Required."),
  URL: z.string().url("Invalid URL.").nonempty("Required."),
  Description: z
    .string()
    .nonempty("Required.")
    .min(10, "Description must be at least 10 characters."),
  StartDate: z.string().optional(),
  EndDate: z.string().nonempty("Required."),
  Verify: z.literal(true, {
    errorMap: () => ({ message: "Required." }),
  }),
});

export default function SubmitOpportunity() {
  const [partnerItems, setPartnerItems] = useState([]);
  const [oppType, setOppType] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(opportunitySchema),
    mode: "onSubmit",
  });

  useEffect(() => {
    const fetchPartners = () => {
      base("Opportunities")
        .select()
        .eachPage((records, fetchNextPage) => {
          setPartnerItems((prev) => [
            ...prev,
            ...records
              .filter((record) => record.fields["Opportunity Name"])
              .map((record) => record.fields["Opportunity Name"]),
          ]);
          setOppType((prev) => {
            const newItems = records
              .filter((record) => record.fields["Opportunity Type"])
              .map((record) => record.fields["Opportunity Type"][0]);

            return Array.from(new Set([...prev, ...newItems]));
          });
          fetchNextPage();
        });
    };
    fetchPartners();
  }, []);

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <Fieldset.Root pt="120px" pb="274px">
      <Stack textAlign="center" align="center">
        <Heading size="5xl">Submit Opportunities</Heading>
        <Box w="1/3" textAlign="center">
          <Heading>
            Highlight opportunities you want to share with our student network.
          </Heading>
        </Box>
      </Stack>

      <Center>
        <Fieldset.Content w="1/2" align="center" px="4rem">
          <Field label="Partner*">
            <NativeSelectRoot>
              <NativeSelectField
                {...register("Partner")}
                items={partnerItems}
              />
            </NativeSelectRoot>
            {errors.Partner && (
              <Text color="red.500">{errors.Partner.message}</Text>
            )}
          </Field>

          <Field label="Opportunity Type*">
            <NativeSelectRoot>
              <NativeSelectField
                {...register("OpportunityType")}
                items={oppType}
              />
            </NativeSelectRoot>
            {errors.OpportunityType && (
              <Text color="red.500">{errors.OpportunityType.message}</Text>
            )}
          </Field>

          <Field label="Time and Date of Event*">
            <Input {...register("EventDateTime")} placeholder="12/1/24" />
            {errors.EventDateTime && (
              <Text color="red.500">{errors.EventDateTime.message}</Text>
            )}
          </Field>

          <Field label="Title of Opportunity*">
            <Input {...register("Title")} placeholder="abc.co/jobs" />
            {errors.Title && (
              <Text color="red.500">{errors.Title.message}</Text>
            )}
          </Field>

          <Field label="Opportunity URL*">
            <Input {...register("URL")} placeholder="abc.co" />
            {errors.URL && <Text color="red.500">{errors.URL.message}</Text>}
          </Field>

          <Field label="Opportunity Description*">
            <Textarea
              {...register("Description")}
              placeholder="We're Hiring!"
            />
            {errors.Description && (
              <Text color="red.500">{errors.Description.message}</Text>
            )}
          </Field>

          <Stack direction="row">
            <Field label="Start Date">
              <Input type="date" {...register("StartDate")} />
            </Field>
            <Field label="End Date">
              <Input type="date" {...register("EndDate")} />
              {errors.EndDate && (
                <Text color="red.500">{errors.EndDate.message}</Text>
              )}
            </Field>
          </Stack>

          <label className="self-start text-left">
            <input className="mr-2" type="checkbox" {...register("Verify")} />
            I verify the responses above are correct.*
            <br />
            <span className="text-gray-500 text-sm">
              By checking this box you certify the accuracy of your submission.
            </span>
          </label>
          {errors.Verify && (
            <Text color="red.500">{errors.Verify.message}</Text>
          )}

          <Button
            type="submit"
            bg="primaryBlack"
            color="primaryWhite"
            onClick={handleSubmit(onSubmit)}
          >
            Submit
          </Button>
        </Fieldset.Content>
      </Center>
    </Fieldset.Root>
  );
}
