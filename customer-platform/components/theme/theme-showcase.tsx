'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function ThemeShowcase() {
  return (
    <div className="space-y-6 p-6">
      <h2 className="text-2xl font-bold">Theme Test Showcase</h2>

      {/* Colors */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Colors</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <div className="h-20 rounded bg-background border" />
            <p className="text-xs mt-1">Background</p>
          </div>
          <div>
            <div className="h-20 rounded bg-card border" />
            <p className="text-xs mt-1">Card</p>
          </div>
          <div>
            <div className="h-20 rounded bg-primary" />
            <p className="text-xs mt-1">Primary</p>
          </div>
          <div>
            <div className="h-20 rounded bg-secondary" />
            <p className="text-xs mt-1">Secondary</p>
          </div>
          <div>
            <div className="h-20 rounded bg-muted" />
            <p className="text-xs mt-1">Muted</p>
          </div>
          <div>
            <div className="h-20 rounded bg-accent" />
            <p className="text-xs mt-1">Accent</p>
          </div>
          <div>
            <div className="h-20 rounded bg-destructive" />
            <p className="text-xs mt-1">Destructive</p>
          </div>
        </div>
      </div>

      {/* Components */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Components</h3>

        <Card>
          <CardHeader>
            <CardTitle>Card Example</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              This is example card content with muted text.
            </p>
          </CardContent>
        </Card>

        <div className="flex flex-wrap gap-2">
          <Button>Primary Button</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="warning">Warning</Badge>
        </div>
      </div>

      {/* Text */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Typography</h3>
        <p className="text-foreground">Foreground text</p>
        <p className="text-muted-foreground">Muted foreground</p>
        <p className="text-primary">Primary text</p>
        <p className="text-destructive">Destructive text</p>
      </div>

      {/* Borders & Shadows */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Borders & Shadows</h3>
        <div className="p-4 border rounded">Border example</div>
        <div className="p-4 border rounded shadow-sm">Shadow example</div>
        <div className="p-4 border rounded shadow-md">Larger shadow</div>
      </div>
    </div>
  );
}
