
import { useState } from "react";
import { 
  User, 
  Settings, 
  CreditCard, 
  DollarSign, 
  Calendar,
  Gauge,
  BarChart,
  ClipboardList,
  PlusIcon,
  MinusIcon
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockProfile, mockTransactions } from "@/utils/mockData";

const milestoneColors = [
  "bg-primary-gradient",
  "bg-secondary-gradient",
  "bg-purple-400",
  "bg-amber-400",
  "bg-teal-400",
];

const Profile = () => {
  const [currency, setCurrency] = useState("USD");
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  
  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <h1 className="text-3xl font-bold">Profile</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-4 space-y-6">
          <Card className="shadow-md">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={mockProfile.avatar} alt={mockProfile.name} />
                  <AvatarFallback>{mockProfile.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
              </div>
              <CardTitle className="text-2xl">{mockProfile.name}</CardTitle>
              <CardDescription>{mockProfile.email}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Member Since</p>
                  <p className="font-medium">{mockProfile.joinedDate}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Investment Goal</p>
                  <p className="font-medium">{mockProfile.investmentGoal}</p>
                </div>
              </div>
              
              <div className="pt-4 border-t space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium flex items-center gap-1">
                    <Gauge className="h-4 w-4 text-muted-foreground" />
                    Risk Tolerance
                  </span>
                  <Badge variant={
                    mockProfile.riskTolerance === "low" ? "outline" : 
                    mockProfile.riskTolerance === "medium" ? "secondary" : "default"
                  }>
                    {mockProfile.riskTolerance.charAt(0).toUpperCase() + mockProfile.riskTolerance.slice(1)}
                  </Badge>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium flex items-center gap-1">
                    <BarChart className="h-4 w-4 text-muted-foreground" />
                    Investment Style
                  </span>
                  <Badge variant={
                    mockProfile.investmentStyle === "passive" ? "outline" : 
                    mockProfile.investmentStyle === "mixed" ? "secondary" : "default"
                  }>
                    {mockProfile.investmentStyle.charAt(0).toUpperCase() + mockProfile.investmentStyle.slice(1)}
                  </Badge>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <h3 className="font-medium mb-2">Favorite Sectors</h3>
                <div className="flex flex-wrap gap-2">
                  {mockProfile.favoriteSectors.map((sector) => (
                    <Badge key={sector} variant="secondary">
                      {sector}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <Settings className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-xl">Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <Select value={currency} onValueChange={setCurrency}>
                  <SelectTrigger id="currency">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD ($)</SelectItem>
                    <SelectItem value="EUR">EUR (€)</SelectItem>
                    <SelectItem value="GBP">GBP (£)</SelectItem>
                    <SelectItem value="JPY">JPY (¥)</SelectItem>
                    <SelectItem value="CAD">CAD ($)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="dark-mode">Dark Mode</Label>
                  <p className="text-sm text-muted-foreground">Switch between light and dark themes</p>
                </div>
                <Switch
                  id="dark-mode"
                  checked={darkMode}
                  onCheckedChange={setDarkMode}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="notifications">Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive price alerts and portfolio updates</p>
                </div>
                <Switch
                  id="notifications"
                  checked={notifications}
                  onCheckedChange={setNotifications}
                />
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-8 space-y-6">
          <Tabs defaultValue="timeline" className="w-full">
            <TabsList className="w-full mb-4">
              <TabsTrigger value="timeline" className="flex-1">
                <Calendar className="h-4 w-4 mr-2" />
                Investment Journey
              </TabsTrigger>
              <TabsTrigger value="transactions" className="flex-1">
                <CreditCard className="h-4 w-4 mr-2" />
                Transactions
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="timeline" className="space-y-4">
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle className="text-xl">Investment Journey</CardTitle>
                  <CardDescription>Track your progress as an investor</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative pl-6 md:pl-6 border-l-2 border-border space-y-6 md:space-y-8">
                    {mockProfile.milestones.map((milestone, index) => (
                      <div key={index} className="relative">
                        <div className={`absolute -left-[25px] top-0 w-10 h-10 md:w-12 md:h-12 rounded-full ${milestoneColors[index % milestoneColors.length]} flex items-center justify-center shadow-md`}>
                          <div className="text-white font-bold text-base md:text-lg">{index + 1}</div>
                        </div>
                        <div className="ml-4 md:ml-6 pt-1">
                          <h3 className="text-base md:text-lg font-semibold">{milestone.title}</h3>
                          <p className="text-xs md:text-sm text-muted-foreground mb-1">{milestone.date}</p>
                          <p className="text-xs md:text-sm">{milestone.description}</p>
                        </div>
                      </div>
                    ))}
                    
                    <div className="relative">
                      <div className="absolute -left-[25px] top-0 w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-dashed border-muted-foreground flex items-center justify-center">
                        <div className="text-muted-foreground font-bold text-base md:text-lg">?</div>
                      </div>
                      <div className="ml-4 md:ml-6 pt-1">
                        <h3 className="text-base md:text-lg font-semibold">Your Next Milestone</h3>
                        <p className="text-xs md:text-sm text-muted-foreground mb-1">Coming soon...</p>
                        <p className="text-xs md:text-sm">Keep investing to reach your next achievement!</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="transactions" className="space-y-4">
              <Card className="shadow-md">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">Transaction History</CardTitle>
                    <CardDescription>Record of your past investment activities</CardDescription>
                  </div>
                  <ClipboardList className="h-5 w-5 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockTransactions.map((transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-md flex items-center justify-center ${
                            transaction.type === "buy" ? "bg-apple-gain/10 text-apple-gain" : "bg-apple-loss/10 text-apple-loss"
                          }`}>
                            {transaction.type === "buy" ? 
                              <PlusIcon className="h-5 w-5" /> : 
                              <MinusIcon className="h-5 w-5" />
                            }
                          </div>
                          <div>
                            <h3 className="font-medium">
                              {transaction.type === "buy" ? "Bought" : "Sold"} {transaction.symbol}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {transaction.shares} {transaction.shares === 1 ? "share" : "shares"} at ${transaction.price.toFixed(2)}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">${transaction.total.toFixed(2)}</p>
                          <p className="text-sm text-muted-foreground">{transaction.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button variant="outline">
                    Download CSV
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Profile;
