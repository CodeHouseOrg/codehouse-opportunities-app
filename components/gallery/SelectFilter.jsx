import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/components/ui/select";

export default function SelectFilter({ title, options, placeholder, multiple, onValueChange }) {
  return (
    <SelectRoot
      size="sm"
      width="230px"
      collection={options}
      multiple={multiple}
      closeOnSelect={!multiple}
      disabled={!options.items.length}
      onValueChange={onValueChange}
    >
      <SelectLabel>{title}</SelectLabel>
      <SelectTrigger clearable={true} className="border-1 rounded-lg">
        <SelectValueText placeholder={placeholder} className="px-2" />
      </SelectTrigger>
      <SelectContent>
        {options.items.map((name) => (
          <SelectItem item={name} key={name}>
            {name}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  );
}
