'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, Check, Sparkles, X } from 'lucide-react';

type ProjectType = 'website' | 'app' | 'software' | 'marketing';

const PROJECT_TYPES = [
  { id: 'website', label: 'Website', description: 'Landing pages, corporate sites, portfolios', icon: '🌐' },
  { id: 'app', label: 'Mobile App', description: 'iOS, Android, or cross-platform apps', icon: '📱' },
  { id: 'software', label: 'Software', description: 'Web apps, SaaS products, tools', icon: '💻' },
  { id: 'marketing', label: 'Marketing', description: 'Campaigns, branding, content', icon: '📢' },
];

export default function NewProjectWizardPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [wizardData, setWizardData] = useState({
    type: '' as ProjectType | '',
    name: '',
    customer: '',
    description: '',
    deadline: '',
    budget: '',
    features: '',
    target_audience: '',
    style: '',
    inspiration: '',
  });

  const totalSteps = 10;
  const progress = ((step + 1) / totalSteps) * 100;

  const handleNext = () => {
    if (step < totalSteps - 1) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleComplete = () => {
    // Phase 1: Just redirect to projects with success message
    alert('🎉 Project created! (Phase 1: Mock only)');
    router.push('/projects');
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <div className="flex justify-center">
                <Sparkles className="h-12 w-12 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">Let's create your project!</h2>
              <p className="text-muted-foreground">
                I'll guide you through the process with a few questions
              </p>
            </div>

            <div className="space-y-3">
              <Label>What type of project are you creating?</Label>
              <RadioGroup
                value={wizardData.type}
                onValueChange={(value) => setWizardData({ ...wizardData, type: value as ProjectType })}
              >
                {PROJECT_TYPES.map((type) => (
                  <div
                    key={type.id}
                    className="flex items-center space-x-3 rounded-lg border p-4 hover:bg-muted/50 cursor-pointer"
                    onClick={() => setWizardData({ ...wizardData, type: type.id as ProjectType })}
                  >
                    <RadioGroupItem value={type.id} id={type.id} />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{type.icon}</span>
                        <Label htmlFor={type.id} className="font-semibold cursor-pointer">
                          {type.label}
                        </Label>
                      </div>
                      <p className="text-sm text-muted-foreground">{type.description}</p>
                    </div>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Great choice! 🎯</h2>
              <p className="text-muted-foreground mt-2">
                Now, what should we call this project?
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Project Name</Label>
              <Input
                id="name"
                placeholder="e.g., Corporate Website Redesign"
                value={wizardData.name}
                onChange={(e) => setWizardData({ ...wizardData, name: e.target.value })}
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Who is this for?</h2>
              <p className="text-muted-foreground mt-2">
                Select an existing customer or type a new name
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="customer">Customer Name</Label>
              <Input
                id="customer"
                placeholder="e.g., Müller GmbH"
                value={wizardData.customer}
                onChange={(e) => setWizardData({ ...wizardData, customer: e.target.value })}
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Tell me more about it</h2>
              <p className="text-muted-foreground mt-2">
                What's the main goal of this project?
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                rows={5}
                placeholder="Describe the project goals, requirements, and expectations..."
                value={wizardData.description}
                onChange={(e) => setWizardData({ ...wizardData, description: e.target.value })}
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">When do you need it?</h2>
              <p className="text-muted-foreground mt-2">
                Set a target deadline for completion
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="deadline">Deadline</Label>
              <Input
                id="deadline"
                type="date"
                value={wizardData.deadline}
                onChange={(e) => setWizardData({ ...wizardData, deadline: e.target.value })}
              />
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">What's your budget?</h2>
              <p className="text-muted-foreground mt-2">
                This helps me estimate project scope
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="budget">Budget (Optional)</Label>
              <Input
                id="budget"
                placeholder="e.g., €10,000 - €15,000"
                value={wizardData.budget}
                onChange={(e) => setWizardData({ ...wizardData, budget: e.target.value })}
              />
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Key features?</h2>
              <p className="text-muted-foreground mt-2">
                What main features do you need?
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="features">Features</Label>
              <Textarea
                id="features"
                rows={5}
                placeholder="List the main features, one per line..."
                value={wizardData.features}
                onChange={(e) => setWizardData({ ...wizardData, features: e.target.value })}
              />
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Who's the audience?</h2>
              <p className="text-muted-foreground mt-2">
                Understanding your users helps create better solutions
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="target_audience">Target Audience</Label>
              <Input
                id="target_audience"
                placeholder="e.g., B2B clients, 25-45 years old"
                value={wizardData.target_audience}
                onChange={(e) => setWizardData({ ...wizardData, target_audience: e.target.value })}
              />
            </div>
          </div>
        );

      case 8:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Design preferences?</h2>
              <p className="text-muted-foreground mt-2">
                Any specific style or vibe you're going for?
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="style">Style / Vibe</Label>
              <Input
                id="style"
                placeholder="e.g., Modern, minimalist, professional"
                value={wizardData.style}
                onChange={(e) => setWizardData({ ...wizardData, style: e.target.value })}
              />
            </div>
          </div>
        );

      case 9:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="rounded-full bg-green-100 dark:bg-green-900 p-4">
                  <Check className="h-12 w-12 text-green-600" />
                </div>
              </div>
              <h2 className="text-2xl font-bold">Perfect! 🎉</h2>
              <p className="text-muted-foreground">
                I've gathered all the information. Ready to create your project?
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Project Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="grid grid-cols-2 gap-2">
                  <span className="text-muted-foreground">Type:</span>
                  <span className="font-medium">{wizardData.type}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <span className="text-muted-foreground">Name:</span>
                  <span className="font-medium">{wizardData.name || '-'}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <span className="text-muted-foreground">Customer:</span>
                  <span className="font-medium">{wizardData.customer || '-'}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <span className="text-muted-foreground">Deadline:</span>
                  <span className="font-medium">{wizardData.deadline || '-'}</span>
                </div>
              </CardContent>
            </Card>

            <Button
              className="w-full"
              size="lg"
              onClick={handleComplete}
            >
              <Check className="mr-2 h-5 w-5" />
              Create Project
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <CardTitle>AI Project Wizard</CardTitle>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.push('/projects')}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-2 pt-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  Step {step + 1} of {totalSteps}
                </span>
                <span className="text-muted-foreground">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} />
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="min-h-[300px]">
              {renderStep()}
            </div>

            <div className="flex justify-between mt-8 pt-6 border-t">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={step === 0}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              {step < totalSteps - 1 && (
                <Button onClick={handleNext}>
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
