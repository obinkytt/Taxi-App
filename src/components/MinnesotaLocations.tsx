import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { MapPin, Star, Clock, Navigation, Snowflake, Thermometer } from "lucide-react";
import { Location } from "@/types";

interface MinnesotaLocationsProps {
  onLocationSelect: (location: string) => void;
  onClose: () => void;
}

export default function MinnesotaLocations({ onLocationSelect, onClose }: MinnesotaLocationsProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const locations = [
    {
      id: 1,
      name: "Minneapolis-Saint Paul International Airport (MSP)",
      address: "4300 Glumack Dr, St Paul, MN 55111",
      category: "airport",
      rating: 4.2,
      estimatedTime: "25-35 min",
      fare: "$35-45",
      popular: true,
      winterNote: "Allow extra time during snow"
    },
    {
      id: 2,
      name: "Mall of America",
      address: "60 E Broadway, Bloomington, MN 55425",
      category: "shopping",
      rating: 4.5,
      estimatedTime: "15-25 min",
      fare: "$18-28",
      popular: true,
      winterNote: "Indoor pickup available"
    },
    {
      id: 3,
      name: "Target Center",
      address: "600 1st Ave N, Minneapolis, MN 55403",
      category: "entertainment",
      rating: 4.3,
      estimatedTime: "10-20 min",
      fare: "$12-22",
      popular: true,
      winterNote: "Event traffic may cause delays"
    },
    {
      id: 4,
      name: "University of Minnesota - Twin Cities",
      address: "100 Church St SE, Minneapolis, MN 55455",
      category: "education",
      rating: 4.4,
      estimatedTime: "12-18 min",
      fare: "$15-25",
      popular: true,
      winterNote: "Campus shuttles available"
    },
    {
      id: 5,
      name: "Mayo Clinic (Rochester)",
      address: "200 1st St SW, Rochester, MN 55905",
      category: "medical",
      rating: 4.8,
      estimatedTime: "90-120 min",
      fare: "$85-110",
      popular: false,
      winterNote: "Long distance - check weather"
    },
    {
      id: 6,
      name: "Duluth Harbor",
      address: "323 Harbor Dr, Duluth, MN 55802",
      category: "tourism",
      rating: 4.6,
      estimatedTime: "150-180 min",
      fare: "$120-150",
      popular: false,
      winterNote: "Scenic route - weather dependent"
    },
    {
      id: 7,
      name: "Minnesota State Fair Grounds",
      address: "1265 Snelling Ave N, St Paul, MN 55108",
      category: "entertainment",
      rating: 4.7,
      estimatedTime: "20-30 min",
      fare: "$22-32",
      popular: false,
      winterNote: "Seasonal destination"
    },
    {
      id: 8,
      name: "Mystic Lake Casino",
      address: "2400 Mystic Lake Blvd, Prior Lake, MN 55372",
      category: "entertainment",
      rating: 4.1,
      estimatedTime: "35-45 min",
      fare: "$40-55",
      popular: false,
      winterNote: "24/7 availability"
    },
    {
      id: 9,
      name: "Xcel Energy Center",
      address: "199 W Kellogg Blvd, St Paul, MN 55102",
      category: "entertainment",
      rating: 4.4,
      estimatedTime: "15-25 min",
      fare: "$18-28",
      popular: true,
      winterNote: "Event parking available"
    },
    {
      id: 10,
      name: "Minnehaha Falls",
      address: "4801 S Minnehaha Dr, Minneapolis, MN 55417",
      category: "tourism",
      rating: 4.5,
      estimatedTime: "18-28 min",
      fare: "$20-30",
      popular: false,
      winterNote: "Beautiful winter views"
    }
  ];

  const categories = [
    { id: "all", name: "All Locations", count: locations.length },
    { id: "airport", name: "Airport", count: locations.filter(l => l.category === "airport").length },
    { id: "shopping", name: "Shopping", count: locations.filter(l => l.category === "shopping").length },
    { id: "entertainment", name: "Entertainment", count: locations.filter(l => l.category === "entertainment").length },
    { id: "education", name: "Education", count: locations.filter(l => l.category === "education").length },
    { id: "medical", name: "Medical", count: locations.filter(l => l.category === "medical").length },
    { id: "tourism", name: "Tourism", count: locations.filter(l => l.category === "tourism").length }
  ];

  const filteredLocations = locations.filter(location => {
    const matchesSearch = location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         location.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || location.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleLocationSelect = (location: Location) => {
    onLocationSelect(location.name);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-blue-600" />
            <span>Popular Minnesota Destinations</span>
          </CardTitle>
          <Button variant="ghost" onClick={onClose}>×</Button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="p-6 border-b">
            <Input
              placeholder="Search destinations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mb-4"
            />
            
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name} ({category.count})
                </Button>
              ))}
            </div>
          </div>

          <div className="max-h-[60vh] overflow-y-auto p-6">
            <div className="space-y-4">
              {filteredLocations.map((location) => (
                <div
                  key={location.id}
                  className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => handleLocationSelect(location)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold">{location.name}</h3>
                        {location.popular && (
                          <Badge variant="secondary" className="text-xs">Popular</Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{location.address}</p>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 text-yellow-500 fill-current" />
                          <span>{location.rating}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{location.estimatedTime}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Navigation className="w-3 h-3" />
                          <span>{location.fare}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {location.winterNote && (
                    <div className="bg-blue-50 border border-blue-200 rounded p-2 mt-3">
                      <div className="flex items-center space-x-2 text-sm text-blue-700">
                        <Snowflake className="w-3 h-3" />
                        <span className="font-medium">Winter Note:</span>
                        <span>{location.winterNote}</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 border-t bg-gray-50">
            <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
              <Thermometer className="w-4 h-4" />
              <span className="font-medium">Current Weather Advisory:</span>
            </div>
            <p className="text-sm text-gray-600">
              Temperature: 28°F | Light snow expected this evening. Allow extra travel time and dress warmly while waiting for your ride.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
