import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge as BadgeUI } from "@/components/ui/badge";
import { Award, Lock, Star, Trophy, Target, Zap, Crown, Heart } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

interface Badge {
  id: number;
  name: string;
  description: string;
  icon: any;
  earned: boolean;
  earnedDate?: string;
  rarity: "Common" | "Rare" | "Epic" | "Legendary";
}

const Badges = () => {
  const [badges, setBadges] = useState<Badge[]>([]);

  // TODO: integrate backend using fetch() here
  useEffect(() => {
    async function fetchBadges() {
      // TODO: replace with real backend endpoint
      // const response = await fetch("http://localhost:8080/badges");
      // const data = await response.json();
      // setBadges(data.badges);
      
      // Mock data for now
      const mockBadges: Badge[] = [
        {
          id: 1,
          name: "First Steps",
          description: "Complete your first module",
          icon: Star,
          earned: true,
          earnedDate: "2025-01-15",
          rarity: "Common"
        },
        {
          id: 2,
          name: "Fast Learner",
          description: "Complete 5 modules in one week",
          icon: Zap,
          earned: true,
          earnedDate: "2025-02-01",
          rarity: "Rare"
        },
        {
          id: 3,
          name: "Dedicated Student",
          description: "Maintain a 7-day learning streak",
          icon: Heart,
          earned: true,
          earnedDate: "2025-02-10",
          rarity: "Epic"
        },
        {
          id: 4,
          name: "Perfect Score",
          description: "Get 100% on 3 assessments",
          icon: Trophy,
          earned: false,
          rarity: "Epic"
        },
        {
          id: 5,
          name: "Goal Crusher",
          description: "Complete your learning path",
          icon: Target,
          earned: false,
          rarity: "Legendary"
        },
        {
          id: 6,
          name: "Master",
          description: "Achieve mastery in 3 skills",
          icon: Crown,
          earned: false,
          rarity: "Legendary"
        },
        {
          id: 7,
          name: "Knowledge Seeker",
          description: "Complete 10 modules",
          icon: Award,
          earned: true,
          earnedDate: "2025-03-01",
          rarity: "Rare"
        },
        {
          id: 8,
          name: "Early Bird",
          description: "Complete lessons before 8 AM for 5 days",
          icon: Star,
          earned: false,
          rarity: "Common"
        }
      ];
      
      setBadges(mockBadges);
    }
    
    fetchBadges();
  }, []);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "Common":
        return "bg-gray-500/10 text-gray-400 border-gray-500/20";
      case "Rare":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "Epic":
        return "bg-purple-500/10 text-purple-400 border-purple-500/20";
      case "Legendary":
        return "bg-primary/10 text-primary border-primary/20";
      default:
        return "";
    }
  };

  const earnedBadges = badges.filter(b => b.earned);
  const lockedBadges = badges.filter(b => !b.earned);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Your Achievements</h1>
          <p className="text-muted-foreground">
            {earnedBadges.length} of {badges.length} badges earned
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-4 bg-card border-border text-center">
            <p className="text-3xl font-bold text-primary mb-1">{earnedBadges.length}</p>
            <p className="text-sm text-muted-foreground">Earned</p>
          </Card>
          <Card className="p-4 bg-card border-border text-center">
            <p className="text-3xl font-bold text-foreground mb-1">{lockedBadges.length}</p>
            <p className="text-sm text-muted-foreground">Locked</p>
          </Card>
          <Card className="p-4 bg-card border-border text-center">
            <p className="text-3xl font-bold text-purple-400 mb-1">
              {earnedBadges.filter(b => b.rarity === "Epic" || b.rarity === "Legendary").length}
            </p>
            <p className="text-sm text-muted-foreground">Rare+</p>
          </Card>
          <Card className="p-4 bg-card border-border text-center">
            <p className="text-3xl font-bold text-foreground mb-1">
              {Math.round((earnedBadges.length / badges.length) * 100)}%
            </p>
            <p className="text-sm text-muted-foreground">Complete</p>
          </Card>
        </div>

        {/* Earned Badges */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-4">Earned Badges</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {earnedBadges.map((badge) => {
              const IconComponent = badge.icon;
              return (
                <Card 
                  key={badge.id}
                  className="p-6 bg-card border-border hover:border-primary/50 transition-all cursor-pointer group relative overflow-hidden"
                >
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  <div className="relative">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${getRarityColor(badge.rarity)} group-hover:scale-110 transition-transform`}>
                        <IconComponent className="w-8 h-8" />
                      </div>
                      <BadgeUI 
                        variant="outline"
                        className={`${getRarityColor(badge.rarity)} text-xs`}
                      >
                        {badge.rarity}
                      </BadgeUI>
                    </div>
                    
                    <h3 className="font-bold text-lg text-foreground mb-2">
                      {badge.name}
                    </h3>
                    
                    <p className="text-sm text-muted-foreground mb-3">
                      {badge.description}
                    </p>
                    
                    {badge.earnedDate && (
                      <p className="text-xs text-primary">
                        Earned on {new Date(badge.earnedDate).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Locked Badges */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-4">Locked Badges</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lockedBadges.map((badge) => {
              const IconComponent = badge.icon;
              return (
                <Card 
                  key={badge.id}
                  className="p-6 bg-card border-border hover:border-border transition-all relative overflow-hidden opacity-60"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center">
                      <Lock className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <BadgeUI 
                      variant="outline"
                      className={`${getRarityColor(badge.rarity)} text-xs`}
                    >
                      {badge.rarity}
                    </BadgeUI>
                  </div>
                  
                  <h3 className="font-bold text-lg text-muted-foreground mb-2">
                    {badge.name}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground">
                    {badge.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Badges;
