import { useEffect } from "react";
import { useLocation } from "wouter";
import { isAuthenticated, logout } from "@/lib/auth";
import { 
  useListLeads, 
  useGetLeadsSummary, 
  useUpdateLead,
  getGetLeadsSummaryQueryKey,
  getListLeadsQueryKey
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { 
  Users, UserPlus, PhoneForwarded, CheckCircle, LogOut 
} from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminDashboard() {
  const [location, setLocation] = useLocation();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!isAuthenticated()) {
      setLocation("/admin/login");
    }
  }, [location, setLocation]);

  const { data: leads, isLoading: isLeadsLoading } = useListLeads();
  const { data: summary, isLoading: isSummaryLoading } = useGetLeadsSummary();
  const updateLead = useUpdateLead();

  const handleStatusChange = (leadId: number, newStatus: string) => {
    updateLead.mutate(
      { id: leadId, data: { status: newStatus as any } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getListLeadsQueryKey() });
          queryClient.invalidateQueries({ queryKey: getGetLeadsSummaryQueryKey() });
        }
      }
    );
  };

  const handleLogout = () => {
    logout();
    setLocation("/admin/login");
  };

  if (!isAuthenticated()) return null;

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-border/50">
          <div>
            <h1 className="text-2xl font-bold font-serif text-foreground">Siyaram Leads CRM</h1>
            <p className="text-muted-foreground text-sm">Manage and track your customer inquiries</p>
          </div>
          <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <StatCard 
            title="Total Leads" 
            value={summary?.total} 
            loading={isSummaryLoading} 
            icon={Users} 
            color="text-primary"
            bgColor="bg-primary/10"
          />
          <StatCard 
            title="New" 
            value={summary?.new} 
            loading={isSummaryLoading} 
            icon={UserPlus} 
            color="text-blue-600"
            bgColor="bg-blue-100"
          />
          <StatCard 
            title="Contacted" 
            value={summary?.contacted} 
            loading={isSummaryLoading} 
            icon={PhoneForwarded} 
            color="text-amber-600"
            bgColor="bg-amber-100"
          />
          <StatCard 
            title="Approved" 
            value={summary?.approved} 
            loading={isSummaryLoading} 
            icon={CheckCircle} 
            color="text-emerald-600"
            bgColor="bg-emerald-100"
          />
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-border/50 overflow-hidden flex flex-col">
          <div className="p-6 border-b border-border/50">
            <h2 className="text-lg font-bold text-foreground">Recent Inquiries</h2>
          </div>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Contact Info</TableHead>
                  <TableHead>Interest</TableHead>
                  <TableHead>Message</TableHead>
                  <TableHead className="w-[150px]">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLeadsLoading ? (
                  [...Array(5)].map((_, i) => (
                    <TableRow key={i}>
                      <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                      <TableCell><Skeleton className="h-8 w-40" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-48" /></TableCell>
                      <TableCell><Skeleton className="h-10 w-full" /></TableCell>
                    </TableRow>
                  ))
                ) : leads?.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No leads found.
                    </TableCell>
                  </TableRow>
                ) : (
                  leads?.map((lead) => (
                    <TableRow key={lead.id}>
                      <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                        {format(new Date(lead.createdAt), "MMM d, yyyy")}
                      </TableCell>
                      <TableCell className="font-medium text-foreground">
                        {lead.name}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col text-sm">
                          <a href={`tel:${lead.phone}`} className="text-primary hover:underline">{lead.phone}</a>
                          <a href={`mailto:${lead.email}`} className="text-muted-foreground hover:underline">{lead.email}</a>
                        </div>
                      </TableCell>
                      <TableCell>
                        {lead.interest ? (
                          <Badge variant="secondary" className="bg-slate-100 text-slate-800 font-normal">
                            {lead.interest}
                          </Badge>
                        ) : (
                          <span className="text-muted-foreground text-sm">-</span>
                        )}
                      </TableCell>
                      <TableCell className="max-w-[200px] truncate text-sm text-muted-foreground">
                        {lead.message || "-"}
                      </TableCell>
                      <TableCell>
                        <Select 
                          value={lead.status} 
                          onValueChange={(val) => handleStatusChange(lead.id, val)}
                        >
                          <SelectTrigger className={`h-8 text-xs font-medium border-0 ${
                            lead.status === 'new' ? 'bg-blue-50 text-blue-700' :
                            lead.status === 'contacted' ? 'bg-amber-50 text-amber-700' :
                            'bg-emerald-50 text-emerald-700'
                          }`}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="new">New</SelectItem>
                            <SelectItem value="contacted">Contacted</SelectItem>
                            <SelectItem value="approved">Approved</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>

      </div>
    </div>
  );
}

function StatCard({ title, value, loading, icon: Icon, color, bgColor }: any) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-border/50 flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${bgColor}`}>
        <Icon className={`w-6 h-6 ${color}`} />
      </div>
      <div>
        <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
        {loading ? (
          <Skeleton className="h-8 w-16" />
        ) : (
          <p className="text-2xl font-bold text-foreground">{value || 0}</p>
        )}
      </div>
    </div>
  );
}
