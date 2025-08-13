
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import authService from "@/services/authService";
import { Car, User } from "lucide-react";

export default function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await authService.signIn(email, password);
    if (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  const handleSignUp = async (role: "rider" | "driver") => {
    setLoading(true);
    setError(null);
    setMessage(null);
    const { data, error } = await authService.signUp(email, password, role);
    if (error) {
      setError(error.message);
    } else if (data.user) {
      setMessage("Check your email for the confirmation link!");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Sankofa Ride</h1>
          <p className="text-xl text-gray-600">Minnesota's Premier Ride-Sharing Service</p>
        </div>
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Welcome Back</CardTitle>
                <CardDescription>Enter your credentials to access your account.</CardDescription>
              </CardHeader>
              <form onSubmit={handleLogin}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input id="login-email" type="email" placeholder="m@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Password</Label>
                    <Input id="login-password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col items-stretch">
                  <Button type="submit" disabled={loading} className="w-full">
                    {loading ? "Signing In..." : "Sign In"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
          <TabsContent value="signup">
            <Card>
              <CardHeader>
                <CardTitle>Create an Account</CardTitle>
                <CardDescription>Choose your role and start your journey with us.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input id="signup-email" type="email" placeholder="m@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input id="signup-password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
              </CardContent>
              <CardFooter className="grid grid-cols-2 gap-4">
                <Button variant="outline" onClick={() => handleSignUp("rider")} disabled={loading} className="w-full">
                  <User className="w-4 h-4 mr-2" />
                  Sign Up as Rider
                </Button>
                <Button onClick={() => handleSignUp("driver")} disabled={loading} className="w-full">
                  <Car className="w-4 h-4 mr-2" />
                  Sign Up as Driver
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
        {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}
        {message && <p className="text-green-500 text-sm mt-4 text-center">{message}</p>}
      </div>
    </div>
  );
}
