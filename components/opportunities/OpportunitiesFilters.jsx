"use client";
import { Fieldset, Input } from "@chakra-ui/react"
import { Field } from "@/components/ui/field"
import {
  SelectContent,
  SelectItem,

  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/components/ui/select"
import { useState } from "react";

const OpportunitiesFilter = () => {
  const [searchValue, setSearchValue] = useState(""); 
  const items = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ]; 

  return (
    <Fieldset.Root style={{ maxWidth: "500px", margin: "0 auto"}}>
      <Fieldset.Content style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <Field style={{ display: "block", position: "relative" }}>
          <div style={{ position: "relative", width: "100%" }}>
            <Input
              name="name"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search by Opportunity Name"
              style={{
                width: "100%",
                padding: "8px 36px 8px 12px", 
                border: "1px solid #ccc",
                borderRadius: "20px",
                fontSize: "14px",
              }}
            />
            {searchValue && (
              <button
                onClick={() => setSearchValue("")}
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "25px",
                  color: "black",
                }}
              >
                ×
              </button>
            )}
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
            <SelectRoot>
              <SelectTrigger
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "1px 12px", 
                  border: "1px solid #ccc",
                  borderRadius: "10px",
                  fontSize: "14px",
                  width: "100%",
                }}
              >
                <SelectValueText placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                {items.map((item) => (
                  <SelectItem item={item} key={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </SelectRoot>
          </Field>

          <Field label="Opportunity Type" style={{ flex: 1 }}>
            <SelectRoot>
              <SelectTrigger
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "1px 12px", 
                  border: "1px solid #ccc",
                  borderRadius: "10px",
                  fontSize: "14px", 
                  width: "100%",
                }}
              >
                <SelectValueText placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                {items.map((item) => (
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


