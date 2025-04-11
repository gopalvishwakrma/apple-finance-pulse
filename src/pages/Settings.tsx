
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Moon, 
  Sun, 
  Globe, 
  BellRing, 
  Shield, 
  Layout, 
  PieChart, 
  Gift, 
  Wrench
} from "lucide-react";
import { toast } from "sonner";

const Settings = () => {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");
  const [fontSize, setFontSize] = useState(16);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [marketNotifications, setMarketNotifications] = useState(true);
  const [priceAlerts, setPriceAlerts] = useState(true);
  const [newsDigest, setNewsDigest] = useState(true);
  const [currency, setCurrency] = useState("USD");
  const [tradingEnabled, setTradingEnabled] = useState(true);
  
  const handleSavePreferences = () => {
    toast.success("Settings saved successfully!");
  };
  
  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <h1 className="text-3xl font-bold">Settings</h1>
      
      <Tabs defaultValue="appearance">
        <TabsList className="grid grid-cols-4 w-full md:w-auto">
          <TabsTrigger value="appearance">
            <Layout className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Appearance</span>
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <BellRing className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="preferences">
            <PieChart className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Preferences</span>
          </TabsTrigger>
          <TabsTrigger value="account">
            <Shield className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Account</span>
          </TabsTrigger>
        </TabsList>
        
        <div className="mt-6">
          <TabsContent value="appearance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>Customize how Finance Pulse looks and feels</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Theme</Label>
                  <div className="grid grid-cols-3 gap-3">
                    <Button 
                      variant={theme === "light" ? "default" : "outline"} 
                      className="flex flex-col items-center justify-center p-4 h-auto" 
                      onClick={() => setTheme("light")}
                    >
                      <Sun className="h-5 w-5 mb-2" />
                      <span>Light</span>
                    </Button>
                    <Button 
                      variant={theme === "dark" ? "default" : "outline"} 
                      className="flex flex-col items-center justify-center p-4 h-auto" 
                      onClick={() => setTheme("dark")}
                    >
                      <Moon className="h-5 w-5 mb-2" />
                      <span>Dark</span>
                    </Button>
                    <Button 
                      variant={theme === "system" ? "default" : "outline"} 
                      className="flex flex-col items-center justify-center p-4 h-auto" 
                      onClick={() => setTheme("system")}
                    >
                      <Globe className="h-5 w-5 mb-2" />
                      <span>System</span>
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <Label>Font Size</Label>
                      <p className="text-sm text-muted-foreground">Adjust the size of text throughout the app</p>
                    </div>
                    <span className="font-medium">{fontSize}px</span>
                  </div>
                  <Slider
                    value={[fontSize]}
                    min={12}
                    max={20}
                    step={1}
                    onValueChange={(value) => setFontSize(value[0])}
                    className="w-full"
                  />
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <Label htmlFor="animations">Animations</Label>
                    <p className="text-sm text-muted-foreground">Enable or disable animations throughout the app</p>
                  </div>
                  <Switch
                    id="animations"
                    checked={animationsEnabled}
                    onCheckedChange={setAnimationsEnabled}
                  />
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <Label htmlFor="auto-refresh">Auto Refresh Data</Label>
                    <p className="text-sm text-muted-foreground">Automatically refresh market data</p>
                  </div>
                  <Switch
                    id="auto-refresh"
                    checked={autoRefresh}
                    onCheckedChange={setAutoRefresh}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>Configure what notifications you receive</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <Label htmlFor="market-notifications">Market Updates</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications about major market movements</p>
                  </div>
                  <Switch
                    id="market-notifications"
                    checked={marketNotifications}
                    onCheckedChange={setMarketNotifications}
                  />
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <Label htmlFor="price-alerts">Price Alerts</Label>
                    <p className="text-sm text-muted-foreground">Receive alerts when stock prices hit your targets</p>
                  </div>
                  <Switch
                    id="price-alerts"
                    checked={priceAlerts}
                    onCheckedChange={setPriceAlerts}
                  />
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <Label htmlFor="news-digest">News Digest</Label>
                    <p className="text-sm text-muted-foreground">Receive a daily digest of news related to your portfolio</p>
                  </div>
                  <Switch
                    id="news-digest"
                    checked={newsDigest}
                    onCheckedChange={setNewsDigest}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="preferences" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Preferences</CardTitle>
                <CardDescription>Configure your trading preferences</CardDescription>
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
                
                <div className="flex justify-between items-center">
                  <div>
                    <Label htmlFor="trading-enabled">Trading</Label>
                    <p className="text-sm text-muted-foreground">Enable or disable trading functionality</p>
                  </div>
                  <Switch
                    id="trading-enabled"
                    checked={tradingEnabled}
                    onCheckedChange={setTradingEnabled}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="default-shares">Default Shares For Trading</Label>
                  <Input 
                    id="default-shares" 
                    type="number" 
                    placeholder="5" 
                    min={1}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="account" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Account</CardTitle>
                <CardDescription>Manage your account settings and security</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="janedoe@example.com" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Change Password</Label>
                  <Input id="password" type="password" placeholder="••••••••" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" placeholder="••••••••" />
                </div>
                
                <div className="pt-4">
                  <Button className="w-full" onClick={handleSavePreferences}>
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-destructive/20">
              <CardHeader>
                <CardTitle className="text-destructive">Danger Zone</CardTitle>
                <CardDescription>Irreversible actions for your account</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full border-destructive/50 text-destructive hover:bg-destructive/10">
                  Delete All Data
                </Button>
                <Button variant="outline" className="w-full border-destructive/50 text-destructive hover:bg-destructive/10">
                  Deactivate Account
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default Settings;
