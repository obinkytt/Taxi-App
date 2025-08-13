
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Navigation, Bell, Settings, Calendar, History, DollarSign, Shield, CreditCard } from "lucide-react";
import Header from "@/components/Header";
import MapView from "@/components/MapView";
import RideRequestForm from "@/components/RideRequestForm";
import DriverDashboard from "@/components/DriverDashboard";
import RideHistory from "@/components/RideHistory";
import UserProfile from "@/components/UserProfile";
import RideScheduler from "@/components/RideScheduler";
import NotificationCenter from "@/components/NotificationCenter";
import RideTracking from "@/components/RideTracking";
import PaymentSystem from "@/components/PaymentSystem";
import EmergencyFeatures from "@/components/EmergencyFeatures";
import MinnesotaLocations from "@/components/MinnesotaLocations";
import DeploymentHelper from "@/components/DeploymentHelper";
import AdminPanel from "@/components/AdminPanel";
import { Ride } from "@/types";
import { useAuth } from "@/contexts/AuthContext";
import authService from "@/services/authService";
import AuthForm from "@/components/AuthForm";

export default function HomePage() {
  const { session, userRole, loading } = useAuth();
  const isAuthenticated = !!session;

  const [activeRide, setActiveRide] = useState<Ride | null>(null);
  const [showProfile, setShowProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showPayments, setShowPayments] = useState(false);
  const [showEmergency, setShowEmergency] = useState(false);
  const [showLocations, setShowLocations] = useState(false);
  const [showDeploymentHelper, setShowDeploymentHelper] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [activeTab, setActiveTab] = useState("ride");

  const handleLogout = () => {
    authService.signOut();
  };

  const handleRideRequest = (ride: Ride) => {
    setActiveRide(ride);
    setActiveTab("tracking");
  };

  const handleScheduleRide = (ride: Ride) => {
    console.log("Ride scheduled:", ride);
  };

  const handleLocationSelect = (location: string) => {
    console.log("Location selected:", location);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AuthForm />;
  }

  const getTitle = () => {
    if (userRole === "admin") return "Admin Dashboard";
    if (userRole === "rider") return "Your Rides";
    return "Driver Hub";
  };

  const getDescription = () => {
    if (userRole === "admin") return "Manage users, monitor rides, and oversee platform operations";
    if (userRole === "rider") return "Request rides, schedule trips, and track your journey";
    return "Manage ride requests and track your earnings";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        onLogout={handleLogout} 
        isAuthenticated={isAuthenticated} 
        userRole={userRole}
        onAdminClick={() => setShowAdminPanel(true)}
      />
      
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {getTitle()}
              </h1>
              <p className="text-gray-600">
                {getDescription()}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowDeploymentHelper(true)}
                className="bg-red-50 border-red-200 text-red-700 hover:bg-red-100"
              >
                🚀 Fix Deployment
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowNotifications(true)}
                className="relative"
              >
                <Bell className="w-4 h-4" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowPayments(true)}
              >
                <CreditCard className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowEmergency(true)}
              >
                <Shield className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowProfile(true)}
              >
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <MapView userRole={userRole} activeRide={activeRide} />
          </div>
          
          <div className="space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="ride" className="text-xs">
                  {userRole === "rider" ? "Request" : "Requests"}
                </TabsTrigger>
                <TabsTrigger value="schedule" className="text-xs">
                  <Calendar className="w-3 h-3 mr-1" />
                  Schedule
                </TabsTrigger>
                <TabsTrigger value="tracking" className="text-xs">
                  <Navigation className="w-3 h-3 mr-1" />
                  Track
                </TabsTrigger>
                <TabsTrigger value="history" className="text-xs">
                  <History className="w-3 h-3 mr-1" />
                  History
                </TabsTrigger>
              </TabsList>

              <TabsContent value="ride" className="space-y-4">
                {userRole === "rider" ? (
                  <>
                    <RideRequestForm onRideRequest={handleRideRequest} />
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => setShowLocations(true)}
                    >
                      <MapPin className="w-4 h-4 mr-2" />
                      Browse Minnesota Destinations
                    </Button>
                  </>
                ) : (
                  <DriverDashboard onAcceptRide={setActiveRide} />
                )}
              </TabsContent>

              <TabsContent value="schedule" className="space-y-4">
                <RideScheduler onScheduleRide={handleScheduleRide} />
              </TabsContent>

              <TabsContent value="tracking" className="space-y-4">
                {activeRide ? (
                  <RideTracking 
                    ride={activeRide} 
                    userRole={userRole} 
                    onCancel={() => setActiveRide(null)}
                    onComplete={() => {
                      setActiveRide(null);
                      setActiveTab("history");
                    }}
                  />
                ) : (
                  <Card>
                    <CardContent className="text-center py-8">
                      <Navigation className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p className="text-gray-500">No active rides to track</p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="history" className="space-y-4">
                <RideHistory userRole={userRole} />
              </TabsContent>
            </Tabs>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => setShowPayments(true)}
                >
                  <DollarSign className="w-4 h-4 mr-2" />
                  {userRole === "rider" ? "Payment & Billing" : "Earnings & Payouts"}
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => setShowEmergency(true)}
                >
                  <Shield className="w-4 h-4 mr-2" />
                  Safety & Emergency
                </Button>
                {userRole === "rider" && (
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => setShowLocations(true)}
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    Minnesota Destinations
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Modal Components */}
      {showProfile && userRole && (
        <UserProfile 
          userRole={userRole} 
          onClose={() => setShowProfile(false)} 
        />
      )}

      {showNotifications && (
        <NotificationCenter onClose={() => setShowNotifications(false)} />
      )}

      {showPayments && userRole && (
        <PaymentSystem 
          userRole={userRole}
          onClose={() => setShowPayments(false)} 
        />
      )}

      {showEmergency && (
        <EmergencyFeatures 
          onClose={() => setShowEmergency(false)}
          activeRide={activeRide}
        />
      )}

      {showDeploymentHelper && (
        <DeploymentHelper onClose={() => setShowDeploymentHelper(false)} />
      )}

      {showAdminPanel && (
        <AdminPanel onClose={() => setShowAdminPanel(false)} />
      )}

      {showLocations && (
        <MinnesotaLocations 
          onLocationSelect={handleLocationSelect}
          onClose={() => setShowLocations(false)}
        />
      )}
    </div>
  );
}
