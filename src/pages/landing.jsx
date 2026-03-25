import React from "react";
import {
  TypewriterText,
  CyclingText,
  FadeInText,
} from "@/components/AnimatedText";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  BookOpen,
  Bot,
  Trophy,
  MessageCircle,
  Users,
  Zap,
  Star,
  Target,
  Award,
  GraduationCap,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Github,
  BriefcaseBusiness,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();
  const features = [
    {
      icon: MessageCircle,
      title: "Anonymous Q&A",
      description:
        "Ask questions freely without judgment. Get answers from peers and teachers.",
    },
    {
      icon: Bot,
      title: "AI Study Buddy",
      description:
        "Get instant help with summaries, flashcards, and personalized quizzes.",
    },
    {
      icon: Trophy,
      title: "Gamified Leaderboards",
      description:
        "Earn XP points, badges, and compete with classmates in a fun way.",
    },
    {
      icon: BookOpen,
      title: "Daily Recap",
      description:
        "Stay updated with daily summaries of class discussions and activities.",
    },
  ];
  return (
    <div className="min-h-screen  mx-auto ">
      {/* Hero section */}
      <section className=" pt-25 pb-20 overflow-hidden">
        <div className="absolute inset-0 mesh-gradient h-[81.7%]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="container flex items-center justify-between px-20 gap-12  ">
              <div>
                <h1 className="text-5xl lg:text-6xl font-bold mb-6">
                  <span className="inline-block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent ">
                    <TypewriterText
                      text="CampusConnect"
                      delay={500}
                      speed={150}
                    />
                  </span>
                </h1>
                <p className="text-2xl text-muted-foreground mb-8">
                  <CyclingText
                    words={[
                      "Learn. Share. Play.",
                      "Connect. Collaborate. Compete.",
                      "Study. Socialize. Succeed.",
                    ]}
                    delay={3000}
                    duration={3000}
                    className="font-medium"
                  />
                </p>
                <FadeInText
                  delay={4000}
                  className="text-lg text-foreground/80 mb-8 max-w-xl"
                >
                  <p>
                    The ultimate platform combining Discord&apos;s
                    collaboration, StackOverflow&apos;s Q&A format, and
                    Duolingo&apos;s gamified learning experience.
                  </p>
                </FadeInText>
                <div className="flex flex-row gap-4 justify-start animate-fade-slide-up [animation-delay:0.6s]">
                  <Button
                    size="lg"
                    className="primary-gradient text-lg px-8 py-6 cursor-pointer"
                    onClick={() => navigate("/sign-up")}
                    asChild
                  >
                    <div>
                      Get Started Free
                      <Zap className="ml-2 w-5 h-5" />
                    </div>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-lg px-8 py-6 cursor-pointer"
                    onClick={() => navigate("/sign-in")}
                    asChild
                  >
                    <dev>Login</dev>
                  </Button>
                </div>
              </div>
              {/* right side */}
              <div className="flex-1 flex  lg:justify-end">
                <div className="relative w-full max-w-md lg:max-w-lg">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-3xl animate-pulse"></div>
                  <div className="relative bg-card/50 backdrop-blur-sm rounded-3xl p-8 border border-border/50 card-shadow">
                    <div className="text-center space-y-6">
                      <div className="w-32 h-32 mx-auto primary-gradient rounded-full flex items-center justify-center animate-fade-in [animation-delay:0.8s]">
                        <GraduationCap className="w-16 h-16 text-white" />
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-center justify-center space-x-3 animate-fade-in [animation-delay:1.0s]">
                          <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                          <span className="text-lg font-medium">
                            Interactive Learning
                          </span>
                        </div>
                        <div className="flex items-center justify-center space-x-3 animate-fade-in [animation-delay:1.2s]">
                          <div className="w-3 h-3 bg-accent rounded-full animate-pulse [animation-delay:0.5s]"></div>
                          <span className="text-lg font-medium">
                            Peer Collaboration
                          </span>
                        </div>
                        <div className="flex items-center justify-center space-x-3 animate-fade-in [animation-delay:1.4s]">
                          <div className="w-3 h-3 bg-success rounded-full animate-pulse [animation-delay:1s]"></div>
                          <span className="text-lg font-medium">
                            Gamified Progress
                          </span>
                        </div>
                      </div>
                      <div className="pt-4 border-t border-border/50">
                        <div className="text-sm text-muted-foreground animate-fade-in [animation-delay:1.6s]">
                          Join the future of education
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Why Choose CampusConnect?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience the perfect blend of collaboration, knowledge sharing,
              and gamified learning
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="card-shadow hover:glow-shadow transition-smooth hover:scale-105"
              >
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-green-300 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* stats section */}
      <section className="py-20 ">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="animate-fade-slide-up">
              <div className="text-4xl font-bold text-primary mb-2">10k+</div>
              <div className="text-muted-foreground">Active Students</div>
            </div>
            <div className="animate-fade-slide-up [animation-delay:0.2s]">
              <div className="text-4xl font-bold text-accent mb-2">500+</div>
              <div className="text-muted-foreground">Universities</div>
            </div>
            <div className="animate-fade-slide-up [animation-delay:0.4s]">
              <div className="text-4xl font-bold text-success mb-2">1M+</div>
              <div className="text-muted-foreground">Questions Answered</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Transform Your Learning?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of students and teachers already using CampusConnect
            to enhance their educational experience.
          </p>
          <Button
            size="lg"
            className="primary-gradient text-lg px-12 py-6"
            asChild
          >
            <div>
              Start Learning Today
              <Award className="ml-2 w-5 h-5" />
            </div>
          </Button>
        </div>
      </section>
      {/* footer */}
      <footer className=" bg-card border-t border-border">
        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col items-center text-center max-w-md mx-auto">
            {/* Brand Section */}
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 primary-gradient rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold ">CampusConnect</span>
            </div>
            <p className="text-muted-foreground mb-6">
              Transforming education through collaboration, gamification, and
              AI-powered learning.
            </p>
            <div className="flex space-x-3">
              <a
                href="#"
                className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center hover:bg-primary/20 cursor-pointer transition-smooth group"
                aria-label="Facebook"
              >
                <BriefcaseBusiness className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-accent/10 rounded-lg flex items-center justify-center hover:bg-accent/20 cursor-pointer transition-smooth group"
                aria-label="Twitter"
              >
                <Github className="w-4 h-4 text-accent group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-success/10 rounded-lg flex items-center justify-center hover:bg-success/20 cursor-pointer transition-smooth group"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4 text-success group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-destructive/10 rounded-lg flex items-center justify-center hover:bg-destructive/20 cursor-pointer transition-smooth group"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4 text-destructive group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          <div className="border-t border-border mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-muted-foreground text-sm">
                © 2026 CampusConnect. All rights reserved.
              </p>
              <p className="text-muted-foreground text-sm mt-2 md:mt-0">
                Made with ❤️ for students worldwide
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
