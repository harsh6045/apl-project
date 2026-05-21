import { Users, Clock, Radio, LogOut } from "lucide-react"

const features = [
  {
    icon: Users,
    title: "Crowd Management",
    description: "AI-powered density monitoring with real-time heat maps. Predict and prevent bottlenecks before they form across all stadium zones.",
  },
  {
    icon: Clock,
    title: "Live Queue Optimization",
    description: "Dynamic wait time displays and smart routing at concessions, merchandise, and entry points. Reduce average wait times by 40%.",
  },
  {
    icon: Radio,
    title: "Staff Coordination",
    description: "Unified command center for security, hospitality, and emergency response teams. Instant task assignment and GPS-tracked deployment.",
  },
  {
    icon: LogOut,
    title: "Exit Flow Control",
    description: "Phased egress management with real-time gate capacity monitoring. Ensure safe, efficient dispersal for 50,000+ spectators.",
  },
]

export function Features() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            Operations at Scale
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Enterprise-grade tools designed for the intensity of live sporting events.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group p-8 rounded-2xl border border-border bg-card hover:bg-secondary/50 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
