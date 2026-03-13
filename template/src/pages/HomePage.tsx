import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

function HomePage() {
  return (
    <div className="max-w-5xl mx-auto py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Welcome to your new TRIRIGA React App</h1>
          <p className="text-muted-foreground">
            This is a template application using React, Vite, TypeScript, and shadcn/ui.
          </p>
        </div>
        <Badge variant="secondary" className="text-sm">Ready to build</Badge>
      </div>

      <Tabs defaultValue="components" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="components">UI Components</TabsTrigger>
          <TabsTrigger value="forms">Forms & Inputs</TabsTrigger>
        </TabsList>
        
        <TabsContent value="components" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Cards & Buttons</CardTitle>
                <CardDescription>Shadcn UI provides beautiful default styling.</CardDescription>
              </CardHeader>
              <CardContent className="flex gap-4">
                <Button variant="default">Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
              </CardContent>
              <CardFooter>
                <p className="text-sm text-muted-foreground">Try hovering over the buttons.</p>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Typography</CardTitle>
                <CardDescription>Consistent styling across your app.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-lg font-semibold">Heading Example</div>
                <div className="text-sm text-muted-foreground">
                  The IBM Carbon theme is adapted for a seamless experience inside TRIRIGA.
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="forms">
          <Card>
            <CardHeader>
              <CardTitle>Form Elements</CardTitle>
              <CardDescription>Accessible and customizable form controls.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="email">Email</Label>
                <Input type="email" id="email" placeholder="Email" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default HomePage;
