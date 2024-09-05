import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Star, DollarSign, Clock } from "lucide-react";
import { Location } from "@/schemas/schemas";

interface LocationCardProps {
  id: string;
  location: Location;
  isSelected: boolean;
  onSelect: () => void;
}

export default function LocationCard({
  id,
  location,
  isSelected,
  onSelect,
}: LocationCardProps) {
  const categoryIcons = location.categories.map(
    (category) => `${category.icon.prefix}32${category.icon.suffix}`
  );

  return (
    <Card
      id={id}
      className={`mb-4 cursor-pointer transition-colors ${
        isSelected ? "bg-primary/10 border-primary" : ""
      }`}
      onClick={onSelect}
    >
      {location.photos?.[0] && (
        <div className="relative w-full h-48 mb-4 rounded-t-lg overflow-hidden">
          <Image
            src={`${location.photos[0].prefix}original${location.photos[0].suffix}`}
            alt={location.name}
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg"
          />
        </div>
      )}
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">{location.name}</CardTitle>
          <div className="flex space-x-1">
            {location.rating && (
              <Badge variant="secondary" className="flex items-center">
                <Star className="w-3 h-3 mr-1" />
                {location.rating.toFixed(1)}
              </Badge>
            )}
            {location.price && (
              <Badge variant="outline" className="flex items-center">
                <DollarSign className="w-3 h-3 mr-1" />
                {Array(location.price).fill("$").join("")}
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-2">
          {location.location.address || "No address provided"}
        </p>
        <div className="flex items-center space-x-2 mb-2">
          {categoryIcons.map((icon, index) => (
            <img
              key={index}
              src={icon}
              alt={location.categories[index].name}
              className="w-6 h-6"
              style={{ backgroundColor: "#FF6F61", borderRadius: "50%" }} // Adding background color for better visibility
            />
          ))}
          <span className="text-xs text-muted-foreground">
            {location.categories.map((c) => c.name).join(", ")}
          </span>
        </div>
        {location.hours && (
          <div className="flex items-center text-xs text-muted-foreground mb-2">
            <Clock className="w-3 h-3 mr-1" />
            <span>
              {location.hours.open_now ? "Open" : "Closed"} •{" "}
              {location.hours.display}
            </span>
          </div>
        )}
        {location.description && (
          <p className="text-xs text-muted-foreground mb-2">
            {location.description}
          </p>
        )}
        <p className="text-xs text-muted-foreground">
          {location.distance
            ? `${(location.distance / 1000).toFixed(2)} km away`
            : "Distance unknown"}
        </p>
      </CardContent>
    </Card>
  );
}
