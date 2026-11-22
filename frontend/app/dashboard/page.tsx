"use client";

import { useEffect, useState } from "react";
import { getUser, logout } from "@/lib/api";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  ClipboardList,
  Users,
  Send,
  ShoppingCart,
  BarChart3,
  Settings,
  Search,
  Bell,
  ChevronDown,
  Menu,
  Plus,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  CircleAlert,
  MoreHorizontal,
  LogOut,
} from "lucide-react";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const procurementData = [
  { month: "Jan", pr: 20, po: 12 },
  { month: "Feb", pr: 35, po: 18 },
  { month: "Mar", pr: 28, po: 22 },
  { month: "Apr", pr: 45, po: 30 },
  { month: "Mei", pr: 38, po: 27 },
  { month: "Jun", pr: 55, po: 42 },
  { month: "Jul", pr: 48, po: 36 },
  { month: "Agu", pr: 65, po: 50 },
];

const activities = [
  {
    id: "PR-2026-00128",
    title: "Pengadaan Laptop",
    vendor: "PT Digital Teknologi",
    date: "20 Nov 2026",
    amount: "Rp 85.000.000",
    status: "Pending Approval",
  },
  {
    id: "PR-2026-00127",
    title: "Pengadaan Peralatan Kantor",
    vendor: "CV Sumber Makmur",
    date: "19 Nov 2026",
    amount: "Rp 12.500.000",
    status: "Approved",
  },
  {
    id: "PR-2026-00126",
    title: "Pengadaan Server",
    vendor: "PT Data Solusi",
    date: "18 Nov 2026",
    amount: "Rp 120.000.000",
    status: "In Review",
  },
  {
    id: "PR-2026-00125",
    title: "Pengadaan Jaringan",
    vendor: "PT Network Indonesia",
    date: "17 Nov 2026",
    amount: "Rp 45.000.000",
    status: "Approved",
  },
];

const menuGroups = [
  {
    label: "MAIN MENU",
    items: [
      { name: "Dashboard", icon: LayoutDashboard },
      { name: "Purchase Request", icon: FileText },
      { name: "Material Planning", icon: ClipboardList },
      { name: "Vendor Management", icon: Users },
    ],
  },
  {
    label: "PROCUREMENT",
    items: [
      { name: "RFQ Management", icon: Send },
      { name: "Quotation", icon: FileText },
      { name: "Evaluation", icon: BarChart3 },
      { name: "Purchase Order", icon: ShoppingCart },
    ],
  },
  {
    label: "SYSTEM",
    items: [{ name: "Settings", icon: Settings }],
  },
];

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    "Pending Approval": "bg-amber-50 text-amber-700",
    Approved: "bg-emerald-50 text-emerald-700",
    "In Review": "bg-blue-50 text-blue-700",
  };

  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${styles[status] || "bg-gray-100 text-gray-600"}`}>
      {status}
    </span>
  );
}

export default function DashboardPage() {
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    getUser().then(setUser).catch(() => router.replace("/login"))
  }, [router]);

  async function handleLogout() {
    try {
      await logout();
      router.replace("/login");
    } catch (error) {
      console.error(error);
    }
  }

  const stats = [
    {
      title: "Total Purchase Request",
      value: "128",
      change: "+12.5%",
      icon: FileText,
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "Active RFQ",
      value: "24",
      change: "+8.2%",
      icon: Send,
      color: "bg-violet-50 text-violet-600",
    },
    {
      title: "Purchase Order",
      value: "56",
      change: "+15.3%",
      icon: ShoppingCart,
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      title: "Pending Approval",
      value: "09",
      change: "Perlu tindakan",
      icon: Clock,
      color: "bg-amber-50 text-amber-600",
    },
  ];


  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f6f8fc]">
        <div className="flex flex-col items-center">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-2xl font-bold text-white shadow-lg shadow-blue-600/30">
            P
          </div>
          <div className="relative h-12 w-12">
            <div className="absolute inset-0 rounded-full border-4 border-blue-100"></div>
            <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-blue-600 border-r-blue-600"></div>
          </div>
          <h2 className="mt-5 text-lg font-bold tracking-wide text-slate-800">
            PROCURA
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            Loading Dashboard...
          </p>
          <div className="mt-3 flex gap-1">
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-blue-600"></span>
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-blue-600 [animation-delay:150ms]"></span>
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-blue-600 [animation-delay:300ms]"></span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f8fc] text-slate-800">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}


      <aside className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-[#17243a] text-white transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>
        <div className="flex h-20 items-center gap-3 border-b border-white/10 px-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold">
            P
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-wide">PROCURA</h1>
            <p className="text-[10px] tracking-[2px] text-slate-400">
              PROCUREMENT SYSTEM
            </p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-6">
          {menuGroups.map((group) => (
            <div key={group.label} className="mb-7">
              <p className="mb-3 px-3 text-[10px] font-semibold tracking-[1.5px] text-slate-500">
                {group.label}
              </p>

              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const active = activeMenu === item.name;

                  return (
                    <button
                      key={item.name}
                      onClick={() => {
                        setActiveMenu(item.name);
                        setSidebarOpen(false);
                      }}
                      className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm transition ${active
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20"
                        : "text-slate-400 hover:bg-white/5 hover:text-white"
                        }`}
                    >
                      <Icon size={18} />
                      <span>{item.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 p-4">
          <div className="flex items-center gap-3 rounded-xl bg-white/5 p-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-500 font-semibold">
              A
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">Administrator</p>
              <p className="text-xs text-slate-400">Super Admin</p>
            </div>
            <MoreHorizontal size={18} className="text-slate-400" />
          </div>
        </div>
      </aside>

      <main className="min-h-screen lg:ml-64">
        <header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b border-slate-200 bg-white px-5 md:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="rounded-lg p-2 hover:bg-slate-100 lg:hidden"
            >
              <Menu size={21} />
            </button>
            <div>
              <h2 className="text-lg font-semibold">{activeMenu}</h2>
              <p className="hidden text-xs text-slate-400 sm:block">
                Procurement Management / {activeMenu}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 md:gap-5">
            <button className="relative rounded-lg p-2 hover:bg-slate-100">
              <Bell size={20} className="text-slate-500" />
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
            </button>

            <div className="relative hidden items-center gap-2 sm:flex">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center cursor-pointer gap-2 rounded-lg p-2 transition hover:bg-slate-100"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
                  A
                </div>

                <div className="hidden text-left md:block">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-slate-400">Administrator</p>
                </div>

                <ChevronDown
                  size={15}
                  className={`text-slate-400 transition-transform duration-200 ${profileOpen ? "rotate-180" : ""
                    }`}
                />
              </button>

              {profileOpen && (
                <div className="absolute right-0 top-full z-50 mt-2 w-48 overflow-hidden rounded-xl border border-slate-200 bg-white py-2 shadow-lg">
                  <div className="border-b border-slate-100 px-4 py-2">
                    <p className="text-sm font-semibold text-slate-800">
                      {user.name}
                    </p>
                    <p className="text-xs text-slate-400">
                      Administrator
                    </p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex w-full cursor-pointer items-center gap-3 px-4 py-3 text-sm text-red-600 transition hover:bg-red-50"
                  >
                    <LogOut size={17} />
                    Logout
                  </button>

                </div>
              )}

            </div>

          </div>
        </header>

        <div className="p-5 md:p-8">
          <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                Selamat Datang, {user.name}!
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                Dashboard Procura, Sistem Manajemen Procurement yang membantu anda mengelola pengadaan barang dan jasa dengan efisien.
              </p>
            </div>

            <button className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-md shadow-blue-600/20 transition hover:bg-blue-700">
              <Plus size={17} />
              Create Purchase Request
            </button>
          </div>

          <div className="mb-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <div key={stat.title} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="mb-4 flex items-center justify-between">
                    <p className="text-sm text-slate-500">{stat.title}</p>
                    <div className={`rounded-lg p-2.5 ${stat.color}`}>
                      <Icon size={19} />
                    </div>
                  </div>
                  <div className="flex items-end justify-between">
                    <h3 className="text-3xl font-bold tracking-tight text-slate-900">
                      {stat.value}
                    </h3>
                    <span className="flex items-center gap-1 text-xs font-medium text-emerald-600">
                      <ArrowUpRight size={14} />
                      {stat.change}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mb-7 grid gap-5 xl:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-2">
              <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="font-semibold text-slate-900">
                    Procurement Overview
                  </h3>
                  <p className="mt-1 text-xs text-slate-400">
                    Statistik PR dan PO selama periode berjalan
                  </p>
                </div>
                <select className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-600 outline-none">
                  <option>2026</option>
                  <option>2025</option>
                </select>
              </div>

              <div className="h-[280px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={procurementData}>
                    <defs>
                      <linearGradient id="prColor" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="poColor" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e8edf5" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 12 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 12 }} />
                    <Tooltip />
                    <Area type="monotone" dataKey="pr" name="Purchase Request" stroke="#3b82f6" strokeWidth={2.5} fill="url(#prColor)" />
                    <Area type="monotone" dataKey="po" name="Purchase Order" stroke="#10b981" strokeWidth={2.5} fill="url(#poColor)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-3 flex justify-center gap-6 text-xs text-slate-500">
                <span className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-blue-500" />
                  Purchase Request
                </span>
                <span className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  Purchase Order
                </span>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="font-semibold text-slate-900">Approval Summary</h3>
              <p className="mt-1 text-xs text-slate-400">
                Status pengajuan procurement
              </p>

              <div className="my-7 flex items-center justify-center">
                <div className="relative flex h-40 w-40 items-center justify-center rounded-full border-[14px] border-slate-100">
                  <div className="absolute inset-[-14px] rounded-full border-[14px] border-transparent border-t-blue-500 border-r-blue-500 border-b-emerald-500 rotate-[-25deg]" />
                  <div className="text-center">
                    <p className="text-3xl font-bold text-slate-900">128</p>
                    <p className="text-xs text-slate-400">Total Request</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-slate-500">
                    <CheckCircle2 size={16} className="text-emerald-500" />
                    Approved
                  </span>
                  <span className="font-semibold">86</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-slate-500">
                    <Clock size={16} className="text-amber-500" />
                    Pending
                  </span>
                  <span className="font-semibold">09</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-slate-500">
                    <CircleAlert size={16} className="text-blue-500" />
                    In Review
                  </span>
                  <span className="font-semibold">33</span>
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 p-5">
              <div>
                <h3 className="font-semibold text-slate-900">
                  Recent Purchase Requests
                </h3>
                <p className="mt-1 text-xs text-slate-400">
                  Daftar pengajuan procurement terbaru
                </p>
              </div>
              <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
                View All
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left text-sm">
                <thead className="bg-slate-50 text-xs text-slate-500">
                  <tr>
                    <th className="px-5 py-4 font-medium">PR Number</th>
                    <th className="px-5 py-4 font-medium">Description</th>
                    <th className="px-5 py-4 font-medium">Vendor</th>
                    <th className="px-5 py-4 font-medium">Date</th>
                    <th className="px-5 py-4 font-medium">Amount</th>
                    <th className="px-5 py-4 font-medium">Status</th>
                    <th className="px-5 py-4 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {activities.map((activity) => (
                    <tr key={activity.id} className="transition hover:bg-slate-50/80">
                      <td className="px-5 py-4 font-medium text-blue-600">{activity.id}</td>
                      <td className="px-5 py-4 font-medium text-slate-700">{activity.title}</td>
                      <td className="px-5 py-4 text-slate-500">{activity.vendor}</td>
                      <td className="px-5 py-4 text-slate-500">{activity.date}</td>
                      <td className="px-5 py-4 font-medium text-slate-700">{activity.amount}</td>
                      <td className="px-5 py-4">
                        <StatusBadge status={activity.status} />
                      </td>
                      <td className="px-5 py-4">
                        <button className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700">
                          <MoreHorizontal size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="border-t border-slate-100 px-5 py-4 text-xs text-slate-400">
              Showing 4 of 128 purchase requests
            </div>
          </div>

          <footer className="py-7 text-center text-xs text-slate-400">
            © 2026 PROCURA. Procurement Management System.
          </footer>
        </div>
      </main>
    </div>
  );
}
