import { Button } from '@/components/ui/button';

function HomePage() {
  return (
    <div className="max-w-5xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Welcome to your new TRIRIGA React App</h1>
      <p className="text-muted-foreground mb-8">
        This is a template application using React, Vite, TypeScript, and shadcn/ui.
      </p>
      <Button>Example Button</Button>
    </div>
  );
}

export default HomePage;
