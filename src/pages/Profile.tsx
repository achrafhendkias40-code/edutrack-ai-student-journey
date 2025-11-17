import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [modulesDone, setModulesDone] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [careerGoal, setCareerGoal] = useState("");
  const [moduleInput, setModuleInput] = useState("");
  const [skillInput, setSkillInput] = useState("");

  const availableModules = [
    "Data Structures",
    "Algorithms",
    "Web Development",
    "Database Systems",
    "Machine Learning",
    "Computer Networks",
    "Operating Systems",
    "Software Engineering"
  ];

  const availableSkills = [
    "Python",
    "Java",
    "JavaScript",
    "React",
    "SQL",
    "Machine Learning",
    "Problem Solving",
    "Communication"
  ];

  const careerGoals = [
    "Software Engineer",
    "Data Scientist",
    "Full Stack Developer",
    "Machine Learning Engineer",
    "DevOps Engineer",
    "Product Manager",
    "UX Designer",
    "Cybersecurity Specialist"
  ];

  const addModule = (module: string) => {
    if (!modulesDone.includes(module)) {
      setModulesDone([...modulesDone, module]);
    }
  };

  const removeModule = (module: string) => {
    setModulesDone(modulesDone.filter(m => m !== module));
  };

  const addSkill = (skill: string) => {
    if (!skills.includes(skill)) {
      setSkills([...skills, skill]);
    }
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter(s => s !== skill));
  };

  // TODO: integrate backend using fetch() here
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // TODO: replace with real backend endpoint
    // const response = await fetch("http://localhost:8080/profil", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ modulesDone, skills, careerGoal })
    // });
    // const data = await response.json();
    
    if (modulesDone.length > 0 && skills.length > 0 && careerGoal) {
      toast({
        title: "Profile saved!",
        description: "Generating your personalized learning path...",
      });
      navigate("/dashboard");
    } else {
      toast({
        title: "Missing information",
        description: "Please complete all fields",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Build Your Profile</h1>
          <p className="text-muted-foreground">Help us personalize your learning experience</p>
        </div>

        <form onSubmit={handleSubmit}>
          <Card className="p-8 bg-card border-border mb-6 shadow-xl">
            <div className="space-y-8">
              {/* Modules Done */}
              <div className="space-y-4">
                <Label className="text-lg font-semibold text-foreground">
                  Modules You've Completed
                </Label>
                <Select onValueChange={addModule}>
                  <SelectTrigger className="bg-input border-border text-foreground">
                    <SelectValue placeholder="Select modules" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableModules.map((module) => (
                      <SelectItem key={module} value={module}>
                        {module}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="flex flex-wrap gap-2 min-h-[40px]">
                  {modulesDone.map((module) => (
                    <Badge
                      key={module}
                      variant="secondary"
                      className="px-3 py-1 bg-secondary text-secondary-foreground hover:bg-secondary/80 cursor-pointer"
                      onClick={() => removeModule(module)}
                    >
                      {module}
                      <X className="ml-2 h-3 w-3" />
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div className="space-y-4">
                <Label className="text-lg font-semibold text-foreground">
                  Your Skills
                </Label>
                <Select onValueChange={addSkill}>
                  <SelectTrigger className="bg-input border-border text-foreground">
                    <SelectValue placeholder="Select skills" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableSkills.map((skill) => (
                      <SelectItem key={skill} value={skill}>
                        {skill}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="flex flex-wrap gap-2 min-h-[40px]">
                  {skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="default"
                      className="px-3 py-1 bg-primary text-primary-foreground hover:bg-primary/80 cursor-pointer"
                      onClick={() => removeSkill(skill)}
                    >
                      {skill}
                      <X className="ml-2 h-3 w-3" />
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Career Goal */}
              <div className="space-y-4">
                <Label className="text-lg font-semibold text-foreground">
                  Career Goal
                </Label>
                <Select onValueChange={setCareerGoal} value={careerGoal}>
                  <SelectTrigger className="bg-input border-border text-foreground">
                    <SelectValue placeholder="Choose your career path" />
                  </SelectTrigger>
                  <SelectContent>
                    {careerGoals.map((goal) => (
                      <SelectItem key={goal} value={goal}>
                        {goal}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>

          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-14 text-lg"
          >
            <Check className="mr-2 h-5 w-5" />
            Save & Continue
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
