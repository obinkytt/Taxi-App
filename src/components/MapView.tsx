import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Car, Navigation } from "lucide-react";
import { Ride } from "@/types";

interface MapViewProps {
  userRole?: "rider" | "driver" | "admin";
  activeRide: Ride | null;
}

export default function MapView({ userRole, activeRide }: MapViewProps) {
  const [nearbyDrivers] = useState([
    { id: 1, lat: 44.9788, lng: -93.2640, name: "John D.", rating: 4.8, eta: "3 min" },
    { id: 2, lat: 44.9768, lng: -93.2660, name: "Sarah M.", rating: 4.9, eta: "5 min" },
    { id: 3, lat: 44.9798, lng: -93.2630, name: "Mike R.", rating: 4.7, eta: "7 min" },
  ]);

  const [rideRequests] = useState([
    { 
      id: 1, 
      pickup: "123 Hennepin Ave", 
      destination: "456 University Ave", 
      distance: "2.3 miles",
      fare: "$12.50",
      rider: "Alex Johnson"
    },
    { 
      id: 2, 
      pickup: "789 Grand Ave", 
      destination: "321 Summit Ave", 
      distance: "1.8 miles",
      fare: "$9.75",
      rider: "Emma Davis"
    },
  ]);

  return (
    <Card className="h-96 lg:h-[500px]">
      <CardContent className="p-0 relative h-full">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Interactive Map</h3>
            <p className="text-gray-600 text-sm mb-4">
              {userRole === "rider" 
                ? "Your location and nearby drivers will appear here"
                : "Ride requests and your location will appear here"
              }
            </p>
            <Badge variant="outline">Map Integration Coming Soon</Badge>
          </div>
        </div>

        {/* Mock location indicators */}
        <div className="absolute top-4 left-4 bg-white rounded-lg shadow-md p-3">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">Your Location</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">Minneapolis, MN</p>
        </div>

        {userRole === "rider" && (
          <div className="absolute top-4 right-4 space-y-2">
            {nearbyDrivers.map((driver) => (
              <div key={driver.id} className="bg-white rounded-lg shadow-md p-2 text-xs">
                <div className="flex items-center space-x-2">
                  <Car className="w-3 h-3 text-green-600" />
                  <span className="font-medium">{driver.name}</span>
                  <Badge variant="secondary" className="text-xs">{driver.eta}</Badge>
                </div>
                <div className="flex items-center space-x-1 mt-1">
                  <span className="text-yellow-500">★</span>
                  <span>{driver.rating}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {userRole === "driver" && (
          <div className="absolute bottom-4 left-4 right-4">
            <div className="bg-white rounded-lg shadow-md p-3">
              <h4 className="font-semibold text-sm mb-2 flex items-center">
                <Navigation className="w-4 h-4 mr-2 text-blue-600" />
                Nearby Ride Requests
              </h4>
              <div className="space-y-2">
                {rideRequests.slice(0, 2).map((request) => (
                  <div key={request.id} className="flex items-center justify-between text-xs">
                    <div>
                      <p className="font-medium">{request.pickup}</p>
                      <p className="text-gray-500">{request.distance}</p>
                    </div>
                    <Badge variant="outline">{request.fare}</Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeRide && (
          <div className="absolute bottom-4 left-4 right-4 bg-green-50 border border-green-200 rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="font-semibold text-green-800">Active Ride</span>
            </div>
            <p className="text-sm text-green-700">
              {userRole === "rider" ? "Your driver is on the way!" : "Ride in progress"}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
