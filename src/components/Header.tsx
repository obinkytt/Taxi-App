import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Car, LogOut, Shield } from "lucide-react";

interface HeaderProps {
  onLogout: () => void;
  isAuthenticated: boolean;
  userRole?: string;
  onAdminClick?: () => void;
}

export default function Header({ onLogout, isAuthenticated, userRole, onAdminClick }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4 max-w-7xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <Car className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Sankofa Ride</h1>
            </div>
            <Badge variant="outline" className="text-xs">
              Minnesota
            </Badge>
          </div>
          
          {isAuthenticated && (
            <div className="flex items-center space-x-3">
              {userRole && (
                <Badge variant="secondary" className="capitalize">
                  {userRole}
                </Badge>
              )}
              
              {/* Admin Panel Button - Always visible and prominent */}
              {onAdminClick && (
                <Button
                  variant="default"
                  size="sm"
                  onClick={onAdminClick}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 flex items-center space-x-2 shadow-md"
                >
                  <Shield className="w-4 h-4" />
                  <span>Admin Panel</span>
                </Button>
              )}
              
              <Button variant="outline" onClick={onLogout} size="sm">
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
