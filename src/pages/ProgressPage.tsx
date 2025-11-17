import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import DashboardLayout from "@/components/DashboardLayout";
import { LineChart, Line, BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { TrendingUp, Award, Clock, Target } from "lucide-react";

const ProgressPage = () => {
  const [skillEvolution, setSkillEvolution] = useState<any[]>([]);
  const [moduleCompletion, setModuleCompletion] = useState<any[]>([]);
  const [skillRadar, setSkillRadar] = useState<any[]>([]);

  // TODO: integrate backend using fetch() here
  useEffect(() => {
    async function loadProgressData() {
      // TODO: replace with real backend endpoint
      // const response = await fetch("http://localhost:8080/progress");
      // const data = await response.json();
      // setSkillEvolution(data.skillEvolution);
      // setModuleCompletion(data.moduleCompletion);
      // setSkillRadar(data.skillRadar);
      
      // Mock data
      setSkillEvolution([
        { month: "Jan", React: 30, Python: 40, SQL: 50 },
        { month: "Feb", React: 45, Python: 55, SQL: 60 },
        { month: "Mar", React: 60, Python: 65, SQL: 70 },
        { month: "Apr", React: 70, Python: 75, SQL: 75 },
        { month: "May", React: 80, Python: 80, SQL: 85 },
        { month: "Jun", React: 85, Python: 85, SQL: 90 },
      ]);

      setModuleCompletion([
        { week: "Week 1", completed: 3, total: 5 },
        { week: "Week 2", completed: 5, total: 5 },
        { week: "Week 3", completed: 4, total: 6 },
        { week: "Week 4", completed: 6, total: 6 },
        { week: "Week 5", completed: 5, total: 7 },
        { week: "Week 6", completed: 7, total: 7 },
      ]);

      setSkillRadar([
        { skill: "React", level: 85 },
        { skill: "Python", level: 80 },
        { skill: "SQL", level: 90 },
        { skill: "Problem Solving", level: 75 },
        { skill: "Communication", level: 70 },
        { skill: "Design", level: 65 },
      ]);
    }
    
    loadProgressData();
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Your Progress</h1>
          <p className="text-muted-foreground">Track your learning journey and skill development</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-6 bg-card border-border">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">Overall Progress</p>
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <p className="text-3xl font-bold text-foreground mb-2">78%</p>
            <Progress value={78} className="h-2" />
          </Card>

          <Card className="p-6 bg-card border-border">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">Modules Done</p>
              <Award className="w-5 h-5 text-primary" />
            </div>
            <p className="text-3xl font-bold text-foreground">24/30</p>
            <Progress value={80} className="h-2" />
          </Card>

          <Card className="p-6 bg-card border-border">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">Total Hours</p>
              <Clock className="w-5 h-5 text-primary" />
            </div>
            <p className="text-3xl font-bold text-foreground">156h</p>
            <p className="text-xs text-muted-foreground mt-2">+12h this week</p>
          </Card>

          <Card className="p-6 bg-card border-border">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">Avg. Score</p>
              <Target className="w-5 h-5 text-primary" />
            </div>
            <p className="text-3xl font-bold text-foreground">87%</p>
            <p className="text-xs text-primary mt-2">+5% from last month</p>
          </Card>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Skill Evolution */}
          <Card className="p-6 bg-card border-border">
            <h3 className="font-bold text-xl text-foreground mb-6">Skill Evolution Over Time</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={skillEvolution}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="month" 
                  stroke="hsl(var(--muted-foreground))"
                  style={{ fontSize: '12px' }}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  style={{ fontSize: '12px' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="React" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--primary))", r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="Python" 
                  stroke="hsl(var(--chart-2))" 
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--chart-2))", r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="SQL" 
                  stroke="hsl(var(--chart-3))" 
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--chart-3))", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Module Completion */}
          <Card className="p-6 bg-card border-border">
            <h3 className="font-bold text-xl text-foreground mb-6">Weekly Module Completion</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={moduleCompletion}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="week" 
                  stroke="hsl(var(--muted-foreground))"
                  style={{ fontSize: '12px' }}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  style={{ fontSize: '12px' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }}
                />
                <Legend />
                <Bar 
                  dataKey="completed" 
                  fill="hsl(var(--primary))" 
                  radius={[8, 8, 0, 0]}
                  name="Completed"
                />
                <Bar 
                  dataKey="total" 
                  fill="hsl(var(--muted))" 
                  radius={[8, 8, 0, 0]}
                  name="Total"
                />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Skill Radar */}
        <Card className="p-6 bg-card border-border">
          <h3 className="font-bold text-xl text-foreground mb-6">Current Skill Levels</h3>
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart data={skillRadar}>
              <PolarGrid stroke="hsl(var(--border))" />
              <PolarAngleAxis 
                dataKey="skill" 
                stroke="hsl(var(--muted-foreground))"
                style={{ fontSize: '14px' }}
              />
              <PolarRadiusAxis 
                angle={90} 
                domain={[0, 100]}
                stroke="hsl(var(--muted-foreground))"
              />
              <Radar 
                name="Skill Level" 
                dataKey="level" 
                stroke="hsl(var(--primary))" 
                fill="hsl(var(--primary))" 
                fillOpacity={0.3}
                strokeWidth={2}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px"
                }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </Card>

        {/* Individual Skills Progress */}
        <Card className="p-6 bg-card border-border">
          <h3 className="font-bold text-xl text-foreground mb-6">Individual Skills</h3>
          <div className="space-y-6">
            {skillRadar.map((skill) => (
              <div key={skill.skill}>
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium text-foreground">{skill.skill}</p>
                  <p className="text-sm font-semibold text-primary">{skill.level}%</p>
                </div>
                <Progress value={skill.level} className="h-3" />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ProgressPage;
