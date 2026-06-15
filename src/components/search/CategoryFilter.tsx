"use client";

import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/lib/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CategoryFilter({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full sm:w-45">
        <SelectValue placeholder="All Categories" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Categories</SelectItem>
        {categories.map((cat) => (
          <SelectItem key={cat} value={cat} className="capitalize">
            {cat}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}