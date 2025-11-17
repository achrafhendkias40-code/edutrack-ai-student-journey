import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Target, TrendingUp, Play } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { useToast } from "@/hooks/use-toast";

interface Module {
  id: number;
  title: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  estimatedTime: string;
  topics: string[];
  completed: boolean;
}

const RecommendedPath = () => {
  const [modules, setModules] = useState<Module[]>([]);
  const { toast } = useToast();

  // TODO: integrate backend using fetch() here
  useEffect(() => {
    async function fetchRecommendations() {
      // TODO: replace with real backend endpoint
      // const response = await fetch("http://localhost:8080/recommandation");
      // const data = await response.json();
      // setModules(data.modules);
      
      // Mock data for now
      const mockModules: Module[] = [
        {
          id: 1,
          title: "Advanced React Patterns",
          description: "Master advanced React concepts including hooks, context, performance optimization, and modern patterns used in production applications.",
          difficulty: "Advanced",
          estimatedTime: "8 weeks",
          topics: ["Custom Hooks", "Context API", "Performance", "Error Boundaries"],
          completed: false
        },
        {
          id: 2,
          title: "System Design Fundamentals",
          description: "Learn how to design scalable systems, understand distributed architectures, and master the fundamentals of system design interviews.",
          difficulty: "Intermediate",
          estimatedTime: "6 weeks",
          topics: ["Scalability", "Load Balancing", "Caching", "Databases"],
          completed: false
        },
        {
          id: 3,
          title: "Cloud Architecture with AWS",
          description: "Build and deploy cloud-native applications using AWS services. Learn best practices for cloud architecture and infrastructure.",
          difficulty: "Advanced",
          estimatedTime: "10 weeks",
          topics: ["EC2", "S3", "Lambda", "CloudFormation"],
          completed: false
        },
        {
          id: 4,
          title: "Machine Learning Basics",
          description: "Introduction to machine learning algorithms, data preprocessing, and building your first ML models with Python.",
          difficulty: "Intermediate",
          estimatedTime: "12 weeks",
          topics: ["Regression", "Classification", "Neural Networks", "Model Evaluation"],
          completed: false
        },
        {
          id: 5,
          title: "DevOps Essentials",
          description: "Learn CI/CD pipelines, containerization with Docker, and orchestration with Kubernetes for modern software delivery.",
          difficulty: "Intermediate",
          estimatedTime: "7 weeks",
          topics: ["Docker", "Kubernetes", "Jenkins", "GitLab CI"],
          completed: false
        }
      ];
      
      setModules(mockModules);
    }
    
    fetchRecommendations();
  }, []);

  const handleStartModule = (moduleId: number, title: string) => {
    toast({
      title: "Module Started!",
      description: `You've started: ${title}`,
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "Intermediate":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "Advanced":
        return "bg-red-500/10 text-red-500 border-red-500/20";
      default:
        return "";
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Recommended Learning Path</h1>
            <p className="text-muted-foreground">
              Personalized modules based on your profile and career goals
            </p>
          </div>
          <div className="hidden md:flex items-center space-x-2">
            <div className="px-4 py-2 bg-card rounded-lg border border-border">
              <p className="text-sm text-muted-foreground">Total Modules</p>
              <p className="text-2xl font-bold text-foreground">{modules.length}</p>
            </div>
          </div>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {modules.map((module, index) => (
            <Card 
              key={module.id}
              className="p-6 bg-card border-border hover:border-primary/50 transition-all group relative overflow-hidden"
            >
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-all"></div>
              
              <div className="relative">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      <span className="text-xl font-bold text-primary">{index + 1}</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                        {module.title}
                      </h3>
                      <Badge 
                        variant="outline" 
                        className={`mt-1 ${getDifficultyColor(module.difficulty)}`}
                      >
                        {module.difficulty}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {module.description}
                </p>

                {/* Topics */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {module.topics.map((topic) => (
                    <Badge 
                      key={topic}
                      variant="secondary"
                      className="bg-secondary text-secondary-foreground text-xs"
                    >
                      {topic}
                    </Badge>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center text-muted-foreground text-sm">
                    <Clock className="w-4 h-4 mr-2" />
                    {module.estimatedTime}
                  </div>
                  <Button 
                    onClick={() => handleStartModule(module.id, module.title)}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground group/btn"
                  >
                    <Play className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                    Start Module
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {modules.length === 0 && (
          <Card className="p-12 bg-card border-border text-center">
            <Target className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No recommendations yet</h3>
            <p className="text-muted-foreground">
              Complete your profile to get personalized learning recommendations
            </p>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default RecommendedPath;
