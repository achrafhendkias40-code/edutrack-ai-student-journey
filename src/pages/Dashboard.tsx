import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  GraduationCap, 
  Target, 
  TrendingUp, 
  Award,
  BookOpen,
  Clock,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const Dashboard = () => {
  const [recommendedPath, setRecommendedPath] = useState<any[]>([]);
  const [studentProgress, setStudentProgress] = useState<any>(null);
  
  // TODO: integrate backend using fetch() here
  useEffect(() => {
    async function fetchRecommendations() {
      // TODO: replace with real backend endpoint
      // const response = await fetch("http://localhost:8080/recommandation");
      // const data = await response.json();
      // setRecommendedPath(data.modules);
      // setStudentProgress(data.progress);
      
      // Mock data for now
      setRecommendedPath([
        { id: 1, title: "Advanced React Patterns", progress: 30, difficulty: "Advanced" },
        { id: 2, title: "System Design", progress: 0, difficulty: "Intermediate" },
        { id: 3, title: "Cloud Architecture", progress: 0, difficulty: "Advanced" },
      ]);
      
      setStudentProgress({
        overallProgress: 45,
        modulesCompleted: 12,
        hoursLearned: 156,
        badgesEarned: 8
      });
    }
    
    fetchRecommendations();
  }, []);

  const skillData = [
    { name: "Jan", value: 30 },
    { name: "Feb", value: 45 },
    { name: "Mar", value: 52 },
    { name: "Apr", value: 68 },
    { name: "May", value: 75 },
    { name: "Jun", value: 85 },
  ];

  const moduleData = [
    { name: "Week 1", completed: 3 },
    { name: "Week 2", completed: 5 },
    { name: "Week 3", completed: 4 },
    { name: "Week 4", completed: 6 },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Welcome back, Student!</h1>
          <p className="text-muted-foreground">Here's your learning progress overview</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6 bg-card border-border hover:border-primary/50 transition-all cursor-pointer group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm mb-1">Overall Progress</p>
                <p className="text-3xl font-bold text-foreground">{studentProgress?.overallProgress || 0}%</p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
            </div>
            <Progress value={studentProgress?.overallProgress || 0} className="mt-4" />
          </Card>

          <Card className="p-6 bg-card border-border hover:border-primary/50 transition-all cursor-pointer group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm mb-1">Modules Completed</p>
                <p className="text-3xl font-bold text-foreground">{studentProgress?.modulesCompleted || 0}</p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-card border-border hover:border-primary/50 transition-all cursor-pointer group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm mb-1">Hours Learned</p>
                <p className="text-3xl font-bold text-foreground">{studentProgress?.hoursLearned || 0}h</p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Clock className="w-6 h-6 text-primary" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-card border-border hover:border-primary/50 transition-all cursor-pointer group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm mb-1">Badges Earned</p>
                <p className="text-3xl font-bold text-foreground">{studentProgress?.badgesEarned || 0}</p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Award className="w-6 h-6 text-primary" />
              </div>
            </div>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recommended Path */}
          <Card className="lg:col-span-2 p-6 bg-card border-border">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground flex items-center">
                <Target className="mr-2 text-primary" />
                Your Learning Path
              </h2>
              <Link to="/path">
                <Button variant="ghost" className="text-primary hover:text-primary/80">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="space-y-4">
              {recommendedPath.map((module) => (
                <div
                  key={module.id}
                  className="p-4 bg-secondary rounded-xl border border-border hover:border-primary/50 transition-all cursor-pointer group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                        {module.title}
                      </h3>
                      <Badge variant="outline" className="text-xs">
                        {module.difficulty}
                      </Badge>
                    </div>
                    <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                      Continue
                    </Button>
                  </div>
                  <Progress value={module.progress} className="h-2" />
                  <p className="text-sm text-muted-foreground mt-2">{module.progress}% complete</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Quick Stats */}
          <div className="space-y-6">
            <Card className="p-6 bg-card border-border">
              <h3 className="font-semibold text-foreground mb-4">Recent Achievements</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-secondary rounded-lg">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Award className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">Fast Learner</p>
                    <p className="text-xs text-muted-foreground">Completed 5 modules</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-secondary rounded-lg">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Award className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">Consistent</p>
                    <p className="text-xs text-muted-foreground">7 day streak</p>
                  </div>
                </div>
              </div>
              <Link to="/badges">
                <Button variant="outline" className="w-full mt-4 border-border hover:bg-secondary">
                  View All Badges
                </Button>
              </Link>
            </Card>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6 bg-card border-border">
            <h3 className="font-semibold text-foreground mb-4">Skill Evolution</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={skillData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--primary))", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6 bg-card border-border">
            <h3 className="font-semibold text-foreground mb-4">Weekly Activity</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={moduleData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }}
                />
                <Bar dataKey="completed" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
