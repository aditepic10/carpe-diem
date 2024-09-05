import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { ScrollArea } from "@/components/ui/ScrollArea";
import { Input } from "@/components/ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { Loader2 } from "lucide-react";
import LocationCard from "./LocationCard";
import { Location } from "@/schemas/schemas";

interface SidebarProps {
  onSurpriseClick: () => void;
  locations: Location[];
  selectedLocation: Location | null;
  onLocationSelect: (location: Location) => void;
  isLoading: boolean;
  error: string | null;
}

export default function Sidebar({
  onSurpriseClick,
  locations,
  selectedLocation,
  onLocationSelect,
  isLoading,
  error,
}: SidebarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = Array.from(
    new Set(locations.flatMap((loc) => loc.categories.map((cat) => cat.name)))
  ).filter(Boolean);

  const filteredLocations = locations.filter(
    (location) =>
      location.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === "all" ||
        location.categories.some((cat) => cat.name === selectedCategory))
  );

  return (
    <div className="w-1/3 bg-background p-4 flex flex-col h-full">
      <h1 className="text-2xl font-bold mb-4">Carpe Diem</h1>
      <Button
        onClick={onSurpriseClick}
        className="mb-4"
        disabled={isLoading || locations.length === 0}
      >
        Surprise Me!
      </Button>
      <div className="space-y-2 mb-4">
        <Input
          type="text"
          placeholder="Search locations..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category || "Uncategorized"}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {isLoading ? (
        <div className="flex items-center justify-center flex-grow">
          <Loader2 className="h-6 w-6 animate-spin mr-2" />
          <p>Loading places...</p>
        </div>
      ) : error ? (
        <div className="text-destructive">{error}</div>
      ) : (
        <ScrollArea className="flex-grow">
          {filteredLocations.map((location) => (
            <LocationCard
              id={`sidebar-item-${location.fsq_id}`}
              key={location.fsq_id}
              location={location}
              isSelected={selectedLocation?.fsq_id === location.fsq_id}
              onSelect={() => onLocationSelect(location)}
            />
          ))}
        </ScrollArea>
      )}
    </div>
  );
}
