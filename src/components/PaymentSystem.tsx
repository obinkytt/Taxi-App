import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard, DollarSign, Receipt, TrendingUp, Calendar, Download } from "lucide-react";

interface PaymentSystemProps {
  userRole: "rider" | "driver" | "admin";
  onClose: () => void;
}

export default function PaymentSystem({ userRole, onClose }: PaymentSystemProps) {
  const [selectedCard, setSelectedCard] = useState("4532");
  const [paymentHistory] = useState([
    {
      id: 1,
      date: "Dec 27, 2024",
      description: "Ride to MSP Airport",
      amount: userRole === "rider" ? -45.00 : 45.00,
      status: "completed",
      method: "Visa ****4532"
    },
    {
      id: 2,
      date: "Dec 26, 2024",
      description: "Ride to Mall of America",
      amount: userRole === "rider" ? -18.50 : 18.50,
      status: "completed",
      method: "Mastercard ****8901"
    },
    {
      id: 3,
      date: "Dec 25, 2024",
      description: "Downtown Minneapolis",
      amount: userRole === "rider" ? -12.75 : 12.75,
      status: "completed",
      method: "Visa ****4532"
    }
  ]);

  const [driverEarnings] = useState({
    today: 156.75,
    thisWeek: 847.50,
    thisMonth: 3247.80,
    totalEarnings: 12847.65,
    pendingPayout: 423.25,
    nextPayoutDate: "Monday, Jan 1st"
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <DollarSign className="w-5 h-5" />
            <span>{userRole === "rider" ? "Payment & Billing" : "Earnings & Payouts"}</span>
          </CardTitle>
          <Button variant="ghost" onClick={onClose}>×</Button>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={userRole === "rider" ? "payment" : "earnings"} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value={userRole === "rider" ? "payment" : "earnings"}>
                {userRole === "rider" ? "Payment Methods" : "Earnings"}
              </TabsTrigger>
              <TabsTrigger value="history">Transaction History</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            {userRole === "rider" ? (
              <TabsContent value="payment" className="space-y-4">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Payment Methods</h3>
                  
                  <div className="space-y-3">
                    <div className={`border rounded-lg p-4 cursor-pointer transition-colors ${selectedCard === "4532" ? "border-blue-500 bg-blue-50" : "hover:bg-gray-50"}`} onClick={() => setSelectedCard("4532")}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-100 rounded flex items-center justify-center">
                            <CreditCard className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium">Visa •••• 4532</p>
                            <p className="text-sm text-gray-600">Expires 12/26</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="default">Primary</Badge>
                          {selectedCard === "4532" && <div className="w-3 h-3 bg-blue-500 rounded-full"></div>}
                        </div>
                      </div>
                    </div>
                    
                    <div className={`border rounded-lg p-4 cursor-pointer transition-colors ${selectedCard === "8901" ? "border-blue-500 bg-blue-50" : "hover:bg-gray-50"}`} onClick={() => setSelectedCard("8901")}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-red-100 rounded flex items-center justify-center">
                            <CreditCard className="w-5 h-5 text-red-600" />
                          </div>
                          <div>
                            <p className="font-medium">Mastercard •••• 8901</p>
                            <p className="text-sm text-gray-600">Expires 08/27</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">Remove</Button>
                          {selectedCard === "8901" && <div className="w-3 h-3 bg-blue-500 rounded-full"></div>}
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full" variant="outline">
                    <CreditCard className="w-4 h-4 mr-2" />
                    Add New Payment Method
                  </Button>

                  <div className="bg-green-50 rounded-lg p-4">
                    <h4 className="font-semibold text-green-800 mb-2">Ride Credits</h4>
                    <div className="flex items-center justify-between">
                      <span className="text-green-700">Available Balance</span>
                      <span className="font-bold text-green-600 text-lg">$25.00</span>
                    </div>
                    <Button variant="outline" size="sm" className="mt-2">Add Credits</Button>
                  </div>
                </div>
              </TabsContent>
            ) : (
              <TabsContent value="earnings" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-green-600">${driverEarnings.today}</div>
                      <div className="text-sm text-gray-600">Today</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-blue-600">${driverEarnings.thisWeek}</div>
                      <div className="text-sm text-gray-600">This Week</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-purple-600">${driverEarnings.thisMonth}</div>
                      <div className="text-sm text-gray-600">This Month</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-gray-800">${driverEarnings.totalEarnings}</div>
                      <div className="text-sm text-gray-600">Total Earnings</div>
                    </CardContent>
                  </Card>
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    Next Payout
                  </h4>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-700">Pending Amount</p>
                      <p className="font-bold text-blue-600 text-lg">${driverEarnings.pendingPayout}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-blue-700">Payout Date</p>
                      <p className="font-medium">{driverEarnings.nextPayoutDate}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold">Payout Settings</h4>
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Bank Account</p>
                        <p className="text-sm text-gray-600">Wells Fargo •••• 5678</p>
                      </div>
                      <Button variant="outline" size="sm">Change</Button>
                    </div>
                  </div>
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Payout Schedule</p>
                        <p className="text-sm text-gray-600">Weekly (Mondays)</p>
                      </div>
                      <Button variant="outline" size="sm">Change</Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            )}

            <TabsContent value="history" className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Transaction History</h3>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
              
              <div className="space-y-3">
                {paymentHistory.map((transaction) => (
                  <div key={transaction.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${transaction.amount > 0 ? "bg-green-100" : "bg-red-100"}`}>
                          <Receipt className={`w-5 h-5 ${transaction.amount > 0 ? "text-green-600" : "text-red-600"}`} />
                        </div>
                        <div>
                          <p className="font-medium">{transaction.description}</p>
                          <p className="text-sm text-gray-600">{transaction.date}</p>
                          {userRole === "rider" && (
                            <p className="text-xs text-gray-500">{transaction.method}</p>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-semibold ${transaction.amount > 0 ? "text-green-600" : "text-red-600"}`}>
                          {transaction.amount > 0 ? "+" : ""}${Math.abs(transaction.amount).toFixed(2)}
                        </p>
                        <Badge variant={transaction.status === "completed" ? "default" : "secondary"} className="text-xs">
                          {transaction.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                {userRole === "rider" ? "Spending Analytics" : "Earnings Analytics"}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Monthly Trends</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">December 2024</span>
                        <span className="font-semibold">${userRole === "rider" ? "234.50" : "3,247.80"}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">November 2024</span>
                        <span className="font-semibold">${userRole === "rider" ? "189.25" : "2,891.45"}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">October 2024</span>
                        <span className="font-semibold">${userRole === "rider" ? "156.75" : "2,654.20"}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">
                      {userRole === "rider" ? "Ride Categories" : "Peak Hours"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {userRole === "rider" ? (
                        <>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Airport Rides</span>
                            <span className="font-semibold">$89.50</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Daily Commute</span>
                            <span className="font-semibold">$145.00</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Weekend Trips</span>
                            <span className="font-semibold">$67.25</span>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Morning Rush (7-9 AM)</span>
                            <span className="font-semibold">$456.75</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Evening Rush (5-7 PM)</span>
                            <span className="font-semibold">$523.40</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Weekend Nights</span>
                            <span className="font-semibold">$389.20</span>
                          </div>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
