"use client";
import { createListCollection, Fieldset, Input } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/components/ui/select";

const OpportunitiesFilter = ({
  partners,
  oppTypes,
  onSearchChange,
  onPartnerSelect,
  onOppTypeSelect,
}) => {
  const partnerItems = createListCollection({
    items: [
      { label: "All", value: "" },
      ...partners.map((p) => ({ label: p.name, value: p.id }))
    ],
  });
  const oppItems = createListCollection({
    items: [
      { label: "All", value: "" },
      ...oppTypes.map((o) => ({ label: o, value: o }))
    ],
  });

  return (
    <Fieldset.Root style={{ maxWidth: "500px", margin: "0 auto" }}>
      <Fieldset.Content
        style={{ display: "flex", flexDirection: "column", gap: "16px" }}
      >
        <Field style={{ display: "block", position: "relative" }}>
          <div style={{ position: "relative", width: "100%" }}>
            <Input
              name="name"
              onChange={onSearchChange}
              placeholder="Search by Opportunity Name"
              style={{
                width: "100%",
                padding: "8px 36px 8px 12px",
                border: "1px solid #ccc",
                borderRadius: "20px",
                fontSize: "14px",
              }}
            />
          </div>
        </Field>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "50px",
          }}
        >
          <Field label="Partner" style={{ flex: 1 }}>
            <SelectRoot
              collection={partnerItems}
              onValueChange={onPartnerSelect}
            >
              <SelectTrigger
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "1px 12px",
                  fontSize: "14px",
                  width: "100%",
                }}
              >
                <SelectValueText placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                {partnerItems.items.map((item, i) => (
                  <SelectItem item={item} key={i}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </SelectRoot>
          </Field>

          <Field label="Opportunity Type" style={{ flex: 1 }}>
            <SelectRoot collection={oppItems} onValueChange={onOppTypeSelect}>
              <SelectTrigger
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "1px 12px",
                  fontSize: "14px",
                  width: "100%",
                }}
              >
                <SelectValueText placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                {oppItems.items.map((item) => (
                  <SelectItem item={item} key={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </SelectRoot>
          </Field>
        </div>
      </Fieldset.Content>
    </Fieldset.Root>
  );
};
export default OpportunitiesFilter;
