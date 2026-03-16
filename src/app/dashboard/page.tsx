"use client";
import Link from "next/link";
import { BookOpen, HelpCircle, Video, Users, TrendingUp, Plus, ArrowRight, Sparkles } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import PageHeader from "@/components/ui/PageHeader";
import StatCard from "@/components/dashboard/StatCard";
import { Card } from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { MOCK_USER, MOCK_LESSONS, MOCK_QUIZZES, MOCK_ANALYTICS, MOCK_QUIZ_SCORES, MOCK_SUBJECT_DIST } from "@/lib/mock";
import { timeAgo, subjectColor } from "@/lib/utils";

const PIE_COLORS = ["#1e7a42", "#f0b224", "#c12e17", "#1e1d18", "#6faf87", "#f5cc6b", "#ec7160"];

export default function DashboardPage() {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className="p-8">
      <PageHeader
        title={`${greeting}, ${MOCK_USER.name.split(" ")[1]}.`}
        subtitle="Here's what's happening in your classroom today."
        action={
          <Link href="/lessons/new">
            <Button icon={<Plus size={15} />}>New lesson</Button>
          </Link>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8 stagger">
        <StatCard label="Total lessons"     value={MOCK_ANALYTICS.total_lessons}    icon={<BookOpen size={16} />}    accent="ink"   trend="+2 this week" />
        <StatCard label="Quizzes created"   value={MOCK_ANALYTICS.total_quizzes}    icon={<HelpCircle size={16} />}  accent="amber" />
        <StatCard label="Recordings"        value={MOCK_ANALYTICS.total_recordings} icon={<Video size={16} />}       accent="coral" />
        <StatCard label="Active students"   value={MOCK_ANALYTICS.active_students}  icon={<Users size={16} />}       accent="sage"  trend="+4 this week" />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {/* Quiz score trend */}
        <Card className="col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-display text-lg text-ink-800">Quiz performance</h3>
              <p className="text-xs text-ink-400">Average class score over time</p>
            </div>
            <div className="flex items-center gap-1.5 text-sage-600 bg-sage-50 px-2.5 py-1 rounded-full text-xs">
              <TrendingUp size={12} /> +17% this month
            </div>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={MOCK_QUIZ_SCORES} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#1e7a42" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#1e7a42" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="week" tick={{ fontSize: 10, fill: "#88877e" }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "#88877e" }} tickLine={false} axisLine={false} domain={[50, 100]} />
              <Tooltip
                contentStyle={{ background: "#1e1d18", border: "none", borderRadius: 8, fontSize: 12, color: "#f5f2eb" }}
                cursor={{ stroke: "#1e7a42", strokeWidth: 1, strokeDasharray: "4 4" }}
              />
              <Area type="monotone" dataKey="score" stroke="#1e7a42" strokeWidth={2} fill="url(#scoreGrad)" dot={{ r: 3, fill: "#1e7a42", strokeWidth: 0 }} />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Subject distribution */}
        <Card>
          <h3 className="font-display text-lg text-ink-800 mb-1">Subjects</h3>
          <p className="text-xs text-ink-400 mb-4">Lesson distribution</p>
          <ResponsiveContainer width="100%" height={120}>
            <PieChart>
              <Pie data={MOCK_SUBJECT_DIST} dataKey="count" nameKey="subject" cx="50%" cy="50%" outerRadius={50} innerRadius={28} paddingAngle={3}>
                {MOCK_SUBJECT_DIST.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: "#1e1d18", border: "none", borderRadius: 8, fontSize: 11, color: "#f5f2eb" }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-3">
            {MOCK_SUBJECT_DIST.slice(0, 4).map((d, i) => (
              <div key={d.subject} className="flex items-center gap-2 text-xs">
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: PIE_COLORS[i] }} />
                <span className="text-ink-600 flex-1">{d.subject}</span>
                <span className="text-ink-400">{d.count}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recent lessons + AI prompt */}
      <div className="grid grid-cols-3 gap-4">
        {/* Recent lessons */}
        <div className="col-span-2">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-display text-lg text-ink-800">Recent lessons</h3>
            <Link href="/lessons" className="text-xs text-ink-400 hover:text-ink-700 flex items-center gap-1 transition-colors">
              View all <ArrowRight size={12} />
            </Link>
          </div>
          <div className="space-y-2 stagger">
            {MOCK_LESSONS.slice(0, 4).map((lesson) => (
              <Link key={lesson.id} href={`/lessons/${lesson.id}`}>
                <div className="bg-white border border-ink-100 rounded-xl px-4 py-3 flex items-center gap-4 hover:border-ink-300 transition-all card-lift">
                  <div className="w-8 h-8 rounded-lg bg-ink-100 flex items-center justify-center flex-shrink-0">
                    <BookOpen size={14} className="text-ink-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-ink-800 truncate">{lesson.title}</p>
                    <p className="text-xs text-ink-400">{timeAgo(lesson.updated_at)}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className={`tag text-[10px] ${subjectColor(lesson.subject)}`}>{lesson.subject}</span>
                    <Badge variant={lesson.status === "published" ? "success" : "draft"}>
                      {lesson.status}
                    </Badge>
                    {lesson.ai_generated && (
                      <Badge variant="ai"><Sparkles size={9} className="mr-0.5" />AI</Badge>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Quick actions */}
        <div className="space-y-3">
          <h3 className="font-display text-lg text-ink-800 mb-3">Quick actions</h3>

          <Link href="/lessons/new?ai=true">
            <div className="bg-ink-900 rounded-xl p-4 cursor-pointer hover:bg-ink-800 transition-all card-lift">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={14} className="text-amber-300" />
                <span className="text-chalk text-sm font-medium">AI lesson generator</span>
              </div>
              <p className="text-ink-400 text-xs leading-relaxed">Type a topic and get a full lesson with slides in seconds.</p>
            </div>
          </Link>

          <Link href="/quizzes/new">
            <div className="bg-white border border-ink-100 rounded-xl p-4 cursor-pointer hover:border-ink-300 transition-all card-lift">
              <div className="flex items-center gap-2 mb-2">
                <HelpCircle size={14} className="text-ink-500" />
                <span className="text-ink-800 text-sm font-medium">Create a quiz</span>
              </div>
              <p className="text-ink-400 text-xs leading-relaxed">Build a quiz for your next class with live polling.</p>
            </div>
          </Link>

          <Link href="/whiteboard">
            <div className="bg-white border border-ink-100 rounded-xl p-4 cursor-pointer hover:border-ink-300 transition-all card-lift">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm">✏️</span>
                <span className="text-ink-800 text-sm font-medium">Open whiteboard</span>
              </div>
              <p className="text-ink-400 text-xs leading-relaxed">Draw, annotate, and collaborate in real time.</p>
            </div>
          </Link>

          {/* Upcoming quiz */}
          {MOCK_QUIZZES[0] && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <p className="text-amber-700 text-xs font-medium mb-1">Ready to launch</p>
              <p className="text-ink-800 text-sm font-medium">{MOCK_QUIZZES[0].title}</p>
              <p className="text-ink-400 text-xs mb-3">{MOCK_QUIZZES[0].questions.length} questions</p>
              <Link href={`/quizzes/${MOCK_QUIZZES[0].id}`}>
                <Button size="sm" variant="secondary" className="w-full">Start session</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
